export class Funcionario {

    nome: String;
    cpf: String;
    funcao: String;
    telefone: Number;
    numVeiculos: Number;

    constructor () {
        this.clean();
    }

    clean(): void {
        this.nome = "";
        this.cpf = "";
        this.funcao = "";
        this.telefone = 0;
        this.numVeiculos = 0;
    }

    clone(): Funcionario {
        var funcionario : Funcionario = new Funcionario;
        funcionario.copyFrom(this);
        return funcionario;


    }

    copyFrom(from: Funcionario): void {
        this.nome = from.nome;
        this.cpf = from.cpf;
        this.funcao = from.funcao;
        this.telefone = from.telefone;
        this.numVeiculos = from.numVeiculos;
    } 
    

    

}