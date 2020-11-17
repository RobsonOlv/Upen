import request = require("request-promise");
import { closeServer } from '../upen-server';
import {Pneu} from '../../common/pneu';


var base_url = "http://localhost:3000/";

describe("O servidor", () => {
    var server:any;

    beforeAll(() => {server = require('../upen-server')});

    afterAll(() => {server.closeServer()});

    it("inicialmente retorna uma lista de pneus vazia", () => {
    return request.get(base_url + "pneus")
            .then(body => 
               expect(body).toBe("[]")
            )
            .catch(e => 
               expect(e).toEqual(null)
            );
    });

    it("só cadastra pneus", () => {
    var options:any = {method: 'POST', uri: (base_url + "pneu"), body:{id: "0003", marca: "Pirelli"}, json: true};
    return request(options)
            .then(body =>
                expect(body).toEqual({failed: "cadastro de pneu falhou"})
            ).catch(e =>
                expect(e).toEqual(null)
            )
    });

    it("não cadastra pneus com id duplicado", () => {
    var pneu1 = {"json":{"id": "0002", "marca" : "Pirelli", "aro":"15", "largura":"23", "capacidade":"200", "custo":"0", "kms":"0", "treadwear":"120", "data":"08/02/2019"}};
    var pneu2 = {"json":{"id": "0002", "marca" : "Goodyear", "aro":"18", "largura":"27", "capacidade":"220", "custo":"0", "kms":"0", "treadwear":"140", "data":"10/02/2019"}};
    var resposta1 = '{"id":"0002","marca":"Pirelli","data":"08/02/2019","aro":"15","largura":"23","capacidade":"200","custo":"0","kms":"0","treadwear":"120","eventos":[],"atribuicao":["","","",false]}';
    var resposta2 = '{"id":"0002","marca":"Goodyear","data":"10/02/2019","aro":"18","largura":"27","capacidade":"220","custo":"0","kms":"0","treadwear":"140","eventos":[],"atribuicao":["","","",false]}';

    return request.post(base_url + "pneu", pneu1)
            .then(body => {
                expect(body).toEqual({success: "cadastro de pneu com sucesso"});
                return request.post(base_url + "pneu", pneu2)
                        .then(body => {
                            expect(body).toEqual({failed: "cadastro de pneu falhou"});
                            return request.get(base_url + "pneus")
                                    .then(body => {
                                        expect(body).toContain(resposta1);
                                        expect(body).not.toContain(resposta2);
                                    });
                        });
                })
                .catch(err => {
                expect(err).toEqual(null)
            });
    });

    it("deleta pneu da lista e o move para a lixeira corretamente", () => {
        var pneu1 = {"json":{"id":"0001","marca":"Pirelli","aro":"18","largura":"25","capacidade":"200","custo":"0","kms":"0","treadwear":"70", "data":"08/02/2020"}};
        var resposta1 = '{"id":"0001","marca":"Pirelli","data":"08/02/2020","aro":"18","largura":"25","capacidade":"200","custo":"0","kms":"0","treadwear":"70","eventos":[],"atribuicao":["","","",false]}';
  
        return request.post(base_url + "pneu", pneu1)
            .then(body => {
                expect(body).toEqual({success: "cadastro de pneu com sucesso"});
                    return request.delete(base_url + "pneu/0001")
                        .then(body =>{
                            return request.get(base_url + "pneus").then( body => {
                                expect(body).not.toContain(resposta1);
                                return request.get(base_url + "lixeirapneus").then( body => {
                                expect(body).toContain(resposta1);
                            })
                        })
                    })                            
                })
           .catch(err => {
              expect(err).toEqual(null)
           });
    });

    it("deleta pneus da lixeira permanentemente", () => {
        var pneu1 = {"json":{"id":"0001","marca":"Pirelli","aro":"18","largura":"25","capacidade":"200","custo":"0","kms":"0","treadwear":"70", "data":"08/02/2020"}};
        var resposta1 = '{"id":"0001","marca":"Pirelli","data":"08/02/2020","aro":"18","largura":"25","capacidade":"200","custo":"0","kms":"0","treadwear":"70","eventos":[],"atribuicao":["","","",false]}';

        return request.post(base_url + "pneu", pneu1)
           .then(body => {
              expect(body).toEqual({success: "cadastro de pneu com sucesso"});
                    return request.delete(base_url + "pneu/0001")
                       .then(body =>{
                          return request.get(base_url + "pneus").then( body => {
                             expect(body).not.toContain(resposta1);
                             return request.get(base_url + "lixeirapneus").then( body => {
                                expect(body).toContain(resposta1);
                                return request.delete(base_url+ "lixeirapneus/0001").then(body =>{
                                   return request.get(base_url + "lixeirapneus").then( body => {
                                      expect(body).not.toContain(resposta1);
                                    })
                                })
                            })
                        })
                    })                            
                }) 
           .catch(err => {
              expect(err).toEqual(null)
           });
    });
    
    it("restaura pneus da lixeira para a lista de pneus corretamente", () => {
        var pneu1 = {"json":{"id":"0001","marca":"Pirelli","aro":"18","largura":"25","capacidade":"200","custo":"0","kms":"0","treadwear":"70", "data":"08/02/2020"}};
        var resposta1 = '{"id":"0001","marca":"Pirelli","data":"08/02/2020","aro":"18","largura":"25","capacidade":"200","custo":"0","kms":"0","treadwear":"70","eventos":[],"atribuicao":["","","",false]}';

        return request.post(base_url + "pneu", pneu1)
           .then(body => {
              expect(body).toEqual({success: "cadastro de pneu com sucesso"});
                    return request.delete(base_url + "pneu/0001")
                       .then(body =>{
                          return request.get(base_url + "pneus").then( body => {
                             expect(body).not.toContain(resposta1);
                             return request.get(base_url + "lixeirapneus").then( body => {
                                expect(body).toContain(resposta1);
                                return request.post(base_url + "lixeirapneus",pneu1).then( body => {
                                   return request.get(base_url + "lixeirapneus").then( body =>{
                                      expect(body).not.toContain(resposta1);
                                      return request.get(base_url + "pneus").then( body =>{
                                         expect(body).toContain(resposta1);
                                        })
                                    })
                                })
                            })
                        })
                    })                            
                })
           .catch(err => {
              expect(err).toEqual(null)
           });
    });

    it("atualiza um pneu da lista", () => {
        var pneu1 = {"json":{"id":"0003","marca":"Pirelli","aro":"18","largura":"25","capacidade":"200","custo":"0","kms":"0","treadwear":"70", "data":"08/02/2020"}};
        var pneuA = {"json":{"id":"0003","marca":"Michelin","aro":"17","largura":"14","capacidade":"200","custo":"50","kms":"15","treadwear":"70", "data":"08/02/2020"}};
        var resposta1 = '{"id":"0003","marca":"Michelin","data":"08/02/2020","aro":"17","largura":"14","capacidade":"200","custo":"50","kms":"15","treadwear":"70","eventos":[],"atribuicao":["","","",false]}';

        return request.post(base_url + "pneu", pneu1)
           .then(body => {
              expect(body).toEqual({success: "cadastro de pneu com sucesso"});
                    return request.put(base_url + "pneu", pneuA)
                       .then(body => {
                           expect(body).toEqual({success: "O pneu foi atualizado com sucesso"});
                                return request.get(base_url + "pneus/" + pneu1.json.id).then( body => {
                                    expect(body).toContain(resposta1);
                                })
                        })                            
                    }) 
           .catch(err => {
              expect(err).toEqual(null)
           });
    });
})