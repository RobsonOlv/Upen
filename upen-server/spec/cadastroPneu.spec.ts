import { CadastroDePneu } from '../cadastroPneu';
import { Pneu } from '../../common/pneu';

describe("O cadastro de pneus", () => {
  var cadastro: CadastroDePneu;

  beforeEach(() => cadastro = new CadastroDePneu())

  it("é inicialmente vazio", () => {
    expect(cadastro.getPneus().length).toBe(0);
  })

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
    })

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
  })

  it("deleta um pneu colocado no teste anterior", () => {
    cadastro.remover("0001");
    expect(cadastro.getPneus().length).toBe(0);
  })

  it("deleta um novo pneu", () => {
    let pneuA : Pneu = new Pneu();
    pneuA.id = "666"
    pneuA.custo = 170;
    pneuA.kms = 0;
    pneuA.largura = 22;
    pneuA.capacidade = 210;
    pneuA.aro = 16;
    pneuA.treadwear = 145;
    pneuA.marca = "Continental";
    pneuA.data = "21/05/2018";
    cadastro.cadastrar(pneuA)
    cadastro.remover("666");
    expect(cadastro.getPneus().length).toBe(0);
  })

})