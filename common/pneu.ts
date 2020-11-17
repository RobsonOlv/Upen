export class Pneu {
    id: string;
    marca: string;
    data: string;
    aro: number;
    largura: number;
    capacidade: number;
    custo: number;
    kms: number;
    treadwear: number;
    atribuicao: [string, string, string, boolean];
    //Placa, Posicao(Dianteira/Traseira), Lado(Direita,Esquerda)
    eventos: [string,string,number][];

    constructor(){
        this.clean();
    }

    clean(): void {
        this.id = "";
        this.marca = "";
        this.data = "";
        this.aro = 0;
        this.largura = 0;
        this.capacidade = 0;
        this.custo = 0;
        this.kms = 0;
        this.treadwear = 0;
        this.eventos = [];
        this.atribuicao = ["", "", "", false]
    }

    clone(): Pneu {
        var pneu: Pneu = new Pneu();
        pneu.copyFrom(this);
        return pneu;
    }

    copyFrom(from: Pneu): void{
        this.id = from.id;
        this.marca = from.marca;
        this.data = from.data;
        this.aro = from.aro;
        this.largura = from.largura;
        this.capacidade = from.capacidade;
        this.custo = from.custo;
        this.kms = from.kms;
        this.treadwear = from.treadwear;
        this.copyAtribuicaoFrom(from.atribuicao);
        this.copyEventosFrom(from.eventos);
    }

    copyEventosFrom(from: [string,string,number][]): void {
        this.eventos = [];
        for(let key in from){
            this.eventos[key] = from[key];
        }
    }

    copyAtribuicaoFrom(from: [string, string, string, boolean]): void {
        this.atribuicao = ["", "", "", false];
        for(let key in from){
            this.atribuicao[key] = from[key];
        }
    }
}