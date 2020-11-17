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
    pneu.kms = 10;
    cadastro.cadastrar(pneu);

    expect(cadastro.getPneus().length).toBe(1);
    pneu = cadastro.getPneus()[0];
    expect(pneu.id).toBe("0001");
    expect(pneu.custo).toBe(200);
    expect(pneu.kms).toBe(10);
    expect(pneu.eventos.length).toBe(0);
  })

  it("não aceita pneus com ID's duplicados", () => {
    var pneu: Pneu = new Pneu();
    pneu.id = "0001";
    pneu.custo = 200;
    pneu.kms = 10;
    cadastro.cadastrar(pneu);

    var pneu: Pneu = new Pneu();
    pneu.id = "0001";
    pneu.custo = 150;
    pneu.kms = 60;
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
    cadastro.cadastrar(pneuA)
    cadastro.remover("666");
    expect(cadastro.getPneus().length).toBe(0);
  })

}) 