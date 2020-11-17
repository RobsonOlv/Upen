import { Veiculo } from '../common/veiculo';
import { CadastroVeiculo } from './cadastroVeiculo';

export class CadastroVeiculoMock extends CadastroVeiculo {
    
    veiculos: Veiculo[] = [];

    constructor() {
        super()
        for (let i = 0; i < 2; i++) {
            let marca = "";
            let placa = "";
            let evt: [string,string,number][] = []
            if (i % 2 == 0) marca = "Ferrari", placa= "ROB2121", evt.push(["","",20])
            else marca = "Volwsvagem", placa = "KKK3021"
            let newVeiculo = <Veiculo> {
                "marca": marca,
                "ano": 2020,
                "placa": placa,
                "modelo": 2020+marca,
                "funcao": "revisao",
                "pneus": [],
                "eventos": evt,
            }
            this.veiculos.push(newVeiculo)
        }
    }

    listarVeiculos(): Veiculo[] {
        return this.veiculos
    }

    idNaoCadastrado(placa: string): boolean{
        return !this.veiculos.find(a => a.placa == placa);
    }

    getVeiculo(placa: string): Veiculo {
        if(!this.idNaoCadastrado(placa)){
            for (let index = 0; index < this.veiculos.length; index++) {
                if(this.veiculos[index].placa == placa){
                    return this.veiculos[index];
                }
                
            }
        }
        return null;
   }

   atualizar(veiculo: Veiculo): Veiculo{
       for (let index = 0; index < this.veiculos.length; index++) {
           if(this.veiculos[index].placa == veiculo.placa){
               this.veiculos[index] = veiculo;
               return veiculo;
           }     
       }
       return null;
    }

}