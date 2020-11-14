import { Veiculo } from '../common/veiculo';
import { CadastroVeiculo } from './cadastroVeiculo';

export class CadastroVeiculoMock extends CadastroVeiculo {

    veiculos: Veiculo[] = [];

    constructor() {
        super()
        for (let i = 0; i < 7; i++) {
            let marca = ""
            let evt: [string,string,number][] = []
            if (i % 2 == 0) marca = "Ferrari", evt.push(["","",20])
            else marca = "Volkswagen" 
            let newVeiculo = <Veiculo> {
                "marca": marca,
                "ano": 2020,
                "placa": "MGN-303"+i,
                "modelo": "2020",
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

}