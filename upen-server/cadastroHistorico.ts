import { Historico } from '../common/historico'

export class CadastroHistorico {
    historicos : Historico[] = [];

    cadastrar(id: String, op: String, element: String): Historico{
        throw 'not implemented yet'
   }

   timeStampNaoCadastrado(timeStamp: Number): boolean{
        throw 'not implemented yet'
   }

   getHistoricos(): Historico[]{
       throw 'not implemented yet'
   }
}