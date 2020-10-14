export class Historico {
    
    timeStamp: Number;
    operacao: String;
    qualElemento: String;
    id: String;

    constructor(){
        this.clean();
    }

    clean(): void {
        this.timeStamp = Date.now();
        this.operacao = "";
        this.qualElemento = "";
        this.id = "";
    }

    clone(): Historico {
        var historico: Historico = new Historico();
        historico.copyFrom(this);
        return historico;
    }

    copyFrom(from: any): void{
        this.operacao = from.operacao;
        this.qualElemento = from.qualElemento;
        this.id = from.id;
    }
}