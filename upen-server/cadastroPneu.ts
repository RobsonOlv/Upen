import { Pneu } from '../common/pneu'

import e = require('express');

export class CadastroDePneu {
    pneus : Pneu[] = [];

    //TESTE ACEITACAO C/B
    constructor(){
        this.cadastroTeste();
    }
    cadastroTeste() {
        var x = new Pneu();
        var y = new Pneu();
        x.id = "0001";
        x.kms = 50;
        x.custo = 200;
        y.id = "0002";
        y.kms = 55;
        y.custo = 320;
        this.cadastrar(x);
        this.cadastrar(y);
    }
    //

    cadastrar(pneu: Pneu): String{
        var result = null;
        if(this.idNaoCadastrado(pneu.id)){
            result = new Pneu();
            result.copyFrom(pneu);
            this.pneus.push(result);
            return "success";
        }
        return "failed";
    }

    idNaoCadastrado(id: string): boolean{
        return !this.pneus.find(a => a.id == id);
    }

    atualizar(pneu: Pneu): Pneu{
        var result: Pneu = this.pneus.find(a => a.id == pneu.id);
        if(result) result.copyFrom(pneu);
        return result;
    }

    remover(id: String): String{
        for(let i = 0; i < this.pneus.length; i++){
            if(this.pneus[i].id == id){
                this.pneus.splice(i, 1);
                return "success";
            }
        }
        return "failed";
    }

    getPneus(): Pneu[]{
        return this.pneus;
    }
    
    getPneu(id: string): Pneu{
        if(!this.idNaoCadastrado(id)){
            for (let index = 0; index < this.pneus.length; index++) {
                if(this.pneus[index].id == id){
                    return this.pneus[index];
                }
                
            }
        }
        return null;
    }
}