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
      var num = this.funcionarios.findIndex(a=> a.cpf == cpf)
      if (num >= 0) {
          this.funcionarios.splice(num,1);
          return true;
      }
      return false;
    }

    getFuncionarios(): Funcionario[] {
          return this.funcionarios;
    }

}