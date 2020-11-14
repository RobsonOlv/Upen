import {Funcionario} from '../common/funcionario';
import { Veiculo } from '../common/veiculo';

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

    atribuirVeiculo (cpf: String, veic: Veiculo): Funcionario {
      var result: Funcionario = this.funcionarios.find(f => f.cpf == cpf);
      if (result) {
          result.veiculos.push(veic);
          return result;
      }
    }

    desatribuirVeiculo (cpf: String, veic: Veiculo): Funcionario {
      var result: Funcionario = this.funcionarios.find(f => f.cpf == cpf);
      if (result) {
        var ind = result.veiculos.findIndex(veicc => veicc.placa == veic.placa)
        result.veiculos.splice(ind,1)
        return result;
      }

    }

    getFuncionarios(): Funcionario[] {
          return this.funcionarios;
    }

}