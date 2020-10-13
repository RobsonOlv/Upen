import { Pneu } from '../common/pneu'

export class CadastroDePneu {
    pneus : Pneu[] = [];

    cadastrar(pneu: Pneu): String{
         throw 'not implemented yet'
    }

    idNaoCadastrado(id: string): boolean{
         throw 'not implemented yet' 
    }

    atualizar(pneu: Pneu): Pneu{
         throw 'not implemented yet'
    }

    remover(id: String): String{
         throw 'not implemented yet'
    }

    getPneus(): Pneu[]{
         throw 'not implemented yet'
    }
    
    getPneu(id: string): Pneu{
         throw 'not implemented yet'
    }
}

