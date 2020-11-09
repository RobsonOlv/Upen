export class Pneu {
    id: string;
    marca: string;
    data: string;
    aro: number;
    largura: number;
    capacidade: number;
    altura: number;
    kmh: number;
    treadwear: number;
    atribuicao: [string, string, string, boolean];
    //Placa, Posicao(Dianteira/Traseira), Lado(Direita,Esquerda)
    eventos: [string,string,string][];

    constructor(){
        this.clean();
    }

    clean(): void {
        this.id = "";
        this.marca = "";
        this.data = "";
        this.aro;
        this.largura;
        this.capacidade;
        this.altura;
        this.kmh;
        this.treadwear;
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
        this.altura = from.altura;
        this.kmh = from.kmh;
        this.treadwear = from.treadwear;
        this.atribuicao = from.atribuicao;
        this.copyEventosFrom(from.eventos);
    }

    copyEventosFrom(from: [string,string,string][]): void {
        this.eventos = [];
        for(let key in from){
            this.eventos[key] = from[key];
        }
    }
}