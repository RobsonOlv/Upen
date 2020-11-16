import {CadastroFuncionario} from '../cadastroFuncionario'
import {Funcionario} from '../../common/funcionario'
import {Veiculo} from '../../common/veiculo'

describe("O cadastro de funcionario", () => {
    var cdFuncionario: CadastroFuncionario;
    
    function cadastrarFunc(nome: string,cpf:string,funcao:string,telefone:number) {
        var func: Funcionario = new Funcionario();
        func.nome = nome;
        func.cpf = cpf;
        func.funcao = funcao;
        func.telefone = telefone
        cdFuncionario.cadastrarFuncionario(func)
    }

    beforeEach(() => cdFuncionario = new CadastroFuncionario())

    it("é inicialmente vazio", () => {
        expect(cdFuncionario.getFuncionarios().length).toBe(0)
    })

    it("cadastra funcionario corretamente", () => {
        cadastrarFunc("Jonas","12345678911", "Recepcionista", 81995252535)

        expect(cdFuncionario.getFuncionarios().length).toBe(1);
        var func = cdFuncionario.getFuncionarios()[0];
        expect(func.nome).toBe("Jonas")
        expect(func.cpf).toBe("12345678911")
        expect(func.funcao).toBe("Recepcionista")
        expect(func.telefone).toBe(81995252535);
        expect(func.veiculos.length).toBe(0);
    })

    it("não cadastra funcionario com cpf duplicado", () => {
        cadastrarFunc("Joao","12345677911","Recepcionista",81995252535)
        cadastrarFunc("Marcos","12345677911","Recepcionista",81973252535)

        expect(cdFuncionario.getFuncionarios().length).toBe(1);
    })

    it("deletar um funcionario existente", () => {
        cadastrarFunc("Jonas","12345678910","Recepcionista",81995252535)
        var func = cdFuncionario.getFuncionarios()[0];

        expect(cdFuncionario.getFuncionarios().length).toBe(1);
        cdFuncionario.deletarFuncionario(func.cpf);
        expect(cdFuncionario.getFuncionarios().length).toBe(0);
    })

    it ("deletar um funcionario não existente", () => {
        expect(cdFuncionario.deletarFuncionario("12345555555")).toBe(false);
    })

    it("atribuir veículo a um funcionário", () => {
        cadastrarFunc("Gustavo","55555555555","Recepcionista",81995252535)
        var func = cdFuncionario.getFuncionarios()[0];
        expect(func.veiculos.length).toBe(0)
        var veic: Veiculo = new Veiculo;
        cdFuncionario.atribuirVeiculo("55555555555", veic);
        expect(func.veiculos.length).toBe(1)
        
    })

    it("desatribuir veículo de um funcionário", () => {
        cadastrarFunc("Julia", "99999999999", "Recepcionista",81995252535)
        var func = cdFuncionario.getFuncionarios()[0];
        var veic: Veiculo = new Veiculo;
        cdFuncionario.atribuirVeiculo("99999999999", veic);
        expect(func.veiculos.length).toBe(1)
        cdFuncionario.desatribuirVeiculo("99999999999",veic);
        expect(func.veiculos.length).toBe(0)

    })

})