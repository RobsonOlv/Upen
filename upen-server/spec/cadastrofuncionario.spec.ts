import {CadastroFuncionario} from '../cadastroFuncionario'
import {Funcionario} from '../../common/funcionario'
import {Veiculo} from '../../common/veiculo'

describe("O cadastro de funcionario", () => {
    var cdFuncionario: CadastroFuncionario;
    
    beforeEach(() => cdFuncionario = new CadastroFuncionario())

    it("é inicialmente vazio", () => {
        expect(cdFuncionario.getFuncionarios().length).toBe(0)
    })

    it("cadastra funcionario corretamente", () => {
        var func: Funcionario = new Funcionario();
        func.nome = "Jonas";
        func.cpf = "12345678911";
        func.funcao = "Recepcionista"
        func.telefone = 81995252535;        
        cdFuncionario.cadastrarFuncionario(func)

        expect(cdFuncionario.getFuncionarios().length).toBe(1);
        func = cdFuncionario.getFuncionarios()[0];
        expect(func.nome).toBe("Jonas")
        expect(func.cpf).toBe("12345678911")
        expect(func.funcao).toBe("Recepcionista")
        expect(func.telefone).toBe(81995252535);
        expect(func.veiculos.length).toBe(0);
    })

    it("não cadastra funcionario com cpf duplicado", () => {
        var func: Funcionario = new Funcionario();
        func.nome = "Joao";
        func.cpf = "12345677911";
        func.funcao = "Recepcionista"
        func.telefone = 81995252535;        
        cdFuncionario.cadastrarFuncionario(func)

        func = new Funcionario();
        func.nome = "Marcos";
        func.cpf = "12345677911";
        func.funcao = "Recepcionista"
        func.telefone = 81973252535;

        expect(cdFuncionario.getFuncionarios().length).toBe(1);
    })

    it("deletar um funcionario existente", () => {
        var func: Funcionario = new Funcionario();
        func.nome = "Jonas";
        func.cpf = "12345678911";
        func.funcao = "Recepcionista"
        func.telefone = 81995252535;        
        cdFuncionario.cadastrarFuncionario(func)
        expect(cdFuncionario.getFuncionarios().length).toBe(1);
        cdFuncionario.deletarFuncionario(func.cpf);
        expect(cdFuncionario.getFuncionarios().length).toBe(0);
    })

    it ("deletar um funcionario não existente", () => {
        expect(cdFuncionario.deletarFuncionario("12345555555")).toBe(false);
    })

    it("atribuir veículo a um funcionário", () => {
        var func: Funcionario = new Funcionario();
        func.nome = "Gustavo";
        func.cpf = "55555555555";
        func.funcao = "Recepcionista"
        func.telefone = 81995252535;        
        cdFuncionario.cadastrarFuncionario(func)
        expect(func.veiculos.length).toBe(0)
        var veic: Veiculo = new Veiculo;
        cdFuncionario.atribuirVeiculo("55555555555", veic);
        expect(func.veiculos.length).toBe(1)
        
    })

    it("desatribuir veículo de um funcionário", () => {
        var func: Funcionario = new Funcionario();
        func.nome = "Julia";
        func.cpf = "99999999999";
        func.funcao = "Recepcionista"
        func.telefone = 81995252535;        
        cdFuncionario.cadastrarFuncionario(func)
        var veic: Veiculo = new Veiculo;
        cdFuncionario.atribuirVeiculo("99999999999", veic);
        expect(func.veiculos.length).toBe(1)
        cdFuncionario.desatribuirVeiculo("99999999999",veic);
        expect(func.veiculos.length).toBe(0)

    })













})