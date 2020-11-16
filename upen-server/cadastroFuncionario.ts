import { request } from 'express';
import {Funcionario} from '../common/funcionario';
import { Veiculo } from '../common/veiculo';

export class CadastroFuncionario {
    funcionarios: Funcionario[] = []

    cadastrarFuncionario(func: Funcionario): Funcionario {
          var result = null;
          if (this.cpfNaoCadastrado(func.cpf) && this.ehFuncionario(func) ) {
          result = new Funcionario();
          result.copyFrom(func);
          this.funcionarios.push(result)
          }
          return result;    }

    cpfNaoCadastrado(cpf: String): Boolean {
          return !this.funcionarios.find(a=> a.cpf == cpf);

    }

    ehFuncionario(func:Funcionario): Boolean {
        if (func.nome == undefined) return false
        if (func.cpf == undefined) return false
        if (func.funcao == undefined) return false
        if (func.telefone == undefined) return false
        return true
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
          if (result.veiculos == undefined) {
            result.veiculos = [veic];
            return result;
          } else{
            result.veiculos.push(veic);
            return result;
          }
          
      }
    }

    desatribuirVeiculo (cpf: String, veic: Veiculo): Funcionario {
      var result: Funcionario = this.funcionarios.find(f => f.cpf == cpf);
      if (result) {
        var ind = result.veiculos.findIndex(veicc => veicc.placa == veic.placa)
        if (ind == -1) {
          return null
        } 
        result.veiculos.splice(ind,1)
        return result;
      }

    }

    getFuncionarios(): Funcionario[] {
          return this.funcionarios;
    }

}