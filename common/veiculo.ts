export class Veiculo {
    marca: string;
    ano: number;
    placa: string;
    modelo: string;
    funcao: string;
    pneu1: string;
    pneu2: string;
    pneu3: string;
    pneu4: string;
    eventos: [string, string, number][];

    constructor(){
        this.clean();
    }

    clean(): void {
        this.marca = "";
        this.ano = 0;
        this.placa = "";
        this.modelo = "";
        this.funcao = "";
        this.eventos = [];
        this.pneu1 = "";
        this.pneu2 = "";
        this.pneu3 = "";
        this.pneu4 = "";
    }

    clone(vAux: Veiculo): Veiculo{
        let v = new Veiculo();
        v.marca = vAux.marca;
        v.ano = vAux.ano;
        v.placa = vAux.placa;
        v.modelo = vAux.modelo;
        v.funcao = vAux.funcao;
        v.pneu1 = vAux.pneu1;
        v.pneu2 = vAux.pneu2;
        v.pneu3 = vAux.pneu3;
        v.pneu4 = vAux.pneu4;

        v.eventos = vAux.eventos;

        return v;
    }
}
