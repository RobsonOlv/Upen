import { CadastroDePneu } from '../cadastroPneu';
import { Pneu } from '../../common/pneu';

describe("O cadastro de pneus", () => {
  var cadastro: CadastroDePneu;

  beforeEach(() => cadastro = new CadastroDePneu());

  it("é inicialmente vazio", () => {
    expect(cadastro.getPneus().length).toBe(0);
  });

  it("cadastra pneus corretamente", () => {
    var pneu: Pneu = new Pneu();
    pneu.id = "0001";
    pneu.custo = 200;
    pneu.kms = 0;
    pneu.largura = 25;
    pneu.capacidade = 200;
    pneu.aro = 17;
    pneu.treadwear = 140;
    pneu.marca = "Pirelli";
    pneu.data = "29/12/2019";
    cadastro.cadastrar(pneu);

    expect(cadastro.getPneus().length).toBe(1);
    pneu = cadastro.getPneus()[0];
    expect(pneu.id).toBe("0001");
    expect(pneu.custo).toBe(200);
    expect(pneu.kms).toBe(0);
    expect(pneu.largura).toBe(25);
    expect(pneu.capacidade).toBe(200);
    expect(pneu.aro).toBe(17);
    expect(pneu.treadwear).toBe(140);
    expect(pneu.marca).toBe("Pirelli");
    expect(pneu.data).toBe("29/12/2019");
    expect(pneu.eventos.length).toBe(0);
  });

  it("não aceita pneus com ID's duplicados", () => {
    var pneu: Pneu = new Pneu();
    pneu.id = "0001";
    pneu.custo = 200;
    pneu.kms = 0;
    pneu.largura = 25;
    pneu.capacidade = 200;
    pneu.aro = 17;
    pneu.treadwear = 140;
    pneu.marca = "Pirelli";
    pneu.data = "29/12/2019";
    cadastro.cadastrar(pneu);

    var pneu: Pneu = new Pneu();
    pneu.id = "0001";
    pneu.custo = 150;
    pneu.kms = 0;
    pneu.largura = 25;
    pneu.capacidade = 200;
    pneu.aro = 17;
    pneu.treadwear = 140;
    pneu.marca = "Goodyear";
    pneu.data = "20/10/2020";
    cadastro.cadastrar(pneu);

    expect(cadastro.getPneus().length).toBe(1);
  });

  it("deleta um pneu", () => {
    var pneu: Pneu = new Pneu();
    pneu.id = "0001";
    pneu.custo = 150;
    pneu.kms = 0;
    pneu.largura = 25;
    pneu.capacidade = 200;
    pneu.aro = 17;
    pneu.treadwear = 140;
    pneu.marca = "Goodyear";
    pneu.data = "20/10/2020";
    cadastro.cadastrar(pneu);
    expect(cadastro.getPneus().length).toBe(1);
    cadastro.remover("0001");
    expect(cadastro.getPneus().length).toBe(0);
  });

  it("cadastra um pneu", () => {
    var pneu: Pneu = new Pneu();
    pneu.id = "0004";
    pneu.custo = 50;
    pneu.kms = 1000;
    pneu.largura = 25;
    pneu.capacidade = 200;
    pneu.aro = 17;
    pneu.treadwear = 140;
    pneu.marca = "Michelin";
    pneu.data = "29/12/2019";
    cadastro.cadastrar(pneu);

    expect(cadastro.getPneus().length).toBe(1);
    pneu = cadastro.getPneus()[0];
    expect(pneu.id).toBe("0004");
    expect(pneu.custo).toBe(50);
    expect(pneu.kms).toBe(1000);
    expect(pneu.largura).toBe(25);
    expect(pneu.capacidade).toBe(200);
    expect(pneu.aro).toBe(17);
    expect(pneu.treadwear).toBe(140);
    expect(pneu.marca).toBe("Michelin");
    expect(pneu.data).toBe("29/12/2019");
    expect(pneu.eventos.length).toBe(0);
  });

  it("atualiza um pneu existente", () => {
    var pneu: Pneu = new Pneu();
    pneu.id = "0004";
    pneu.custo = 50;
    pneu.kms = 1000;
    pneu.largura = 25;
    pneu.capacidade = 200;
    pneu.aro = 17;
    pneu.treadwear = 140;
    pneu.marca = "Michelin";
    pneu.data = "29/12/2019";
    cadastro.cadastrar(pneu);

    expect(cadastro.getPneus().length).toBe(1);
    
    let pneuA : Pneu = new Pneu();
    pneuA.id = "0004";
    pneuA.custo = 58;
    pneuA.kms = 777;
    pneuA.largura = 25;
    pneuA.capacidade = 88;
    pneuA.aro = 16;
    pneuA.treadwear = 140;
    pneuA.marca = "Michelin";
    pneuA.data = "29/12/2019";
    cadastro.atualizar(pneuA);
    
    let pneuB = cadastro.getPneus()[0];
    expect(pneuB.id).toBe("0004");
    expect(pneuB.custo).toBe(58);
    expect(pneuB.kms).toBe(777);
    expect(pneuB.largura).toBe(25);
    expect(pneuB.capacidade).toBe(88);
    expect(pneuB.aro).toBe(16);
    expect(pneuB.treadwear).toBe(140);
    expect(pneuB.marca).toBe("Michelin");
    expect(pneuB.data).toBe("29/12/2019");
    expect(pneu.eventos.length).toBe(0);
  });

})