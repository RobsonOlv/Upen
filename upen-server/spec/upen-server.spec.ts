import { json } from "body-parser";
import { del } from "request-promise";
import request = require("request-promise");
import { closeServer } from '../upen-server'

var base_url = "http://localhost:3000/";

describe("O servidor", () => {
    var server:any;

    beforeAll(() => {server = require('../upen-server')});
    
    afterAll(() => {server.closeServer()});

    it("inicialmente retorna uma lista de funcionarios vazia", () => {
        return request.get(base_url+"funcionarios").then(
            body => 
                expect(body).toBe("[]")
        ).catch( 
            e => expect(e).toEqual(null)
        );

            
        })


    it ("só cadastra funcionário", () =>{
        var options: any = {method: 'POST',uri: (base_url+"funcionarios"), body: {name: "João",funcao: "nada"}, json: true};
        return request(options)
            .then(body => 
                expect(body).toEqual({failure: "o funcionario nao pode ser cadastrado"})
                ).catch( e => 
                    expect(e).toEqual(null))

    });

    it("não cadastra funcionario com cpf duplicado", () => {
        var func1 = {"json": {"nome": "Joao", "cpf": "12345666666","funcao": "recepcao", "telefone": 82222222222}};
        var func2 = {"json": {"nome": "Julia", "cpf": "12345666666","funcao": "recepcao", "telefone": 82222222222}};
        var resposta1 = '{"nome":"Joao","cpf":"12345666666","funcao":"recepcao","telefone":82222222222}'
        var resposta2 = '{"nome":"Julia","cpf":"12345666666","funcao":"recepcao","telefone":82222222222}'

        return request.post(base_url+"funcionarios",func1).then(body => {
            expect(body).toEqual({success: "o funcionario foi devidamente cadastrado."});
            return request.post(base_url+"funcionarios",func2)
                        .then(body => {
                            expect(body).toEqual({failure: "o funcionario nao pode ser cadastrado"});
                            return request.get(base_url+"funcionarios")
                                    .then(body => {
                                        expect (body).toContain(resposta1);
                                        expect(body).not.toContain(resposta2);
                                    })
                        })

        })
        .catch(err => {
            expect(err).toEqual(null)
        })

    });

    it("não remove funcionário não existente", () => {
        var func = {"json": {"nome": "Joao", "cpf": "12333666666","funcao": "recepcao", "telefone": 82222222222}};
        return request.delete(base_url+"funcionarios/"+"12333666666",func).then(body => {
            expect(body).toEqual({failure: "o funcionario nao pode ser removido"})
        }).catch(err => {
            expect(err).toEqual(null)
        })

    });


    it("não atribui veículo a um funcionário não existente", () => {
        var func = {"json": {"nome": "Joao", "cpf": "12345666677","funcao": "recepcao", "telefone": 82222222222}};
        var car = {"json": {"marca":"Ferrari","ano":2020,"placa":"MGN-3050","modelo":"2020","funcao":"revisao","eventos":[["","",20]]}}
        return request.put(base_url+"funcionarios/"+"12345666677",car).then(body => {
            expect(body).toEqual({failure: "o veiculo nao pode ser atribuido"})
        }).catch(err => {
            expect(err).toEqual(null)
        })

    });

    it("só atribui veículo", () => {
        var func = {"json": {"nome": "Joao", "cpf": "55345666677","funcao": "recepcao", "telefone": 82222222222}};
        var car = {"json": {"nome":"relampago marquinhos"}}
        
        return request.post(base_url+"funcionarios",func).then(body => {
            expect (body).toEqual({success: "o funcionario foi devidamente cadastrado."});
            return request.put(base_url+"funcionarios/"+"55345667677/",car).then(body => {
                expect (body).toEqual({failure: "o veiculo nao pode ser atribuido"})
            }).catch(err => {
                expect(err).toEqual(null)
            })
        })
        
    });

    it("não desatribui um veículo que não está atribuído ao funcionário", () => {
        var func = {"json": {"nome": "Joao", "cpf": "12345667677","funcao": "recepcao", "telefone": 82222222222, "veiculos": [{"marca":"Ferrari","ano":2020,"placa":"MGN-3030","modelo":"2020","funcao":"revisao","eventos":[["","",20]]}]}};
        var car = {"json": {"marca":"Ferrari","ano":2020,"placa":"MGN-3050","modelo":"2020","funcao":"revisao","eventos":[["","",20]]}}

        return request.post(base_url+"funcionarios",func).then(body => {
            expect (body).toEqual({success: "o funcionario foi devidamente cadastrado."});
            return request.put(base_url+"funcionarios/"+"12345667677/"+"MGN-3050",car).then(body => {
                expect (body).toEqual({failure: "o veiculo nao pode ser desatribuido"})
            })
        }).catch(err => {
            expect(err).toEqual(null)
        })
    });

    it("atribui veículo com sucesso", () => {
        var func = {"json": {"nome": "Joao", "cpf": "12345887677","funcao": "recepcao", "telefone": 82222222222},"veiculos": [{"marca":"Ferrari","ano":2020,"placa":"MGN-3030","modelo":"2020","funcao":"revisao","eventos":[["","",20]]}] };
        var car = {"json": {"marca":"Ferrari","ano":2020,"placa":"MGN-3050","modelo":"2020","funcao":"revisao","eventos":[["","",20]]}}

        return request.post(base_url+"funcionarios",func).then(body => {
            expect (body).toEqual({success: "o funcionario foi devidamente cadastrado."});
            return request.put(base_url+"funcionarios/"+"12345887677",car).then(body => {
                expect (body).toEqual({success: "o veiculo foi devidamente atribuido."})
            }).catch(err => {
                expect(err).toEqual(null)
            })
        })

    });     
    

    }




)