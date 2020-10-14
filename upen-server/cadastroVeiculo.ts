import { Veiculo } from '../common/veiculo';

export class CadastroVeiculo {
    
    veiculos: Veiculo[] = [];
   
    cadastrarVeiculo(veiculo: Veiculo): any {
         throw 'not implemented yet';
    }

    veiculoNaoCadastrado(placa: string): boolean {
         throw 'not implemented yet';
    }

    listarVeiculos(): Veiculo[] {
         throw 'not implemented yet';
    }

    empty(): boolean{
         throw 'not implemented yet'
    }

    removerVeiculo(placa: string): number{
         throw 'not implemented yet';
    }

    retornarVeiculo(placa: string): any {
        throw 'not implemented yet'
    }

    atualizarveiculo(veiculo: Veiculo): Veiculo {
        throw 'not implemented yet'
    }

}