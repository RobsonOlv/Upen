import {Funcionario} from '../common/funcionario';

export class CadastroFuncionario {
    funcionarios: Funcionario[] = []

    cadastrarFuncionario(func: Funcionario): Funcionario {
          var result = null;
          if (this.cpfNaoCadastrado(func.cpf)) {
          result = new Funcionario();
          result.copyFrom(func);
          this.funcionarios.push(result)
          }
          return result;    }

    cpfNaoCadastrado(cpf: String): Boolean {
          return !this.funcionarios.find(a=> a.cpf == cpf);

    }

    deletarFuncionario(cpf: String): Boolean {
         throw 'not implemented yet'
    }

    getFuncionarios(): Funcionario[] {
          return this.funcionarios;
    }

}