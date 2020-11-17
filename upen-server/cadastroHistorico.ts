import { Historico } from '../common/historico'

export class CadastroHistorico {
    historicos : Historico[] = [];

    cadastrar(historico: string, a : string, b : string): Historico{
        var result = new Historico();
        return result;
    }

    checkInfo(historico : Historico, a : string, b : string): boolean {
        if (historico.id == undefined || historico.operacao == undefined 
            || historico.qualElemento == undefined || historico.timeStamp == undefined) {
                return false
            }
        return true;
    }

    timeStampNaoCadastrado(timeStamp: Number): boolean{
        return !this.historicos.find(a => a.timeStamp == timeStamp);
    }

    getHistoricos(): Historico[]{
        return this.historicos;
    }
}