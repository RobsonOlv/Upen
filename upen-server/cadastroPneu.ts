import { Pneu } from '../common/pneu'

import e = require('express');

export class CadastroDePneu {
    pneus : Pneu[] = [];
    lixeiraPneus : Pneu[] = [];

    cadastrar(pneu: Pneu): String{
          var result = null;
          if(this.idNaoCadastrado(pneu.id) && this.checkTypes(pneu)){
            result = new Pneu();
            result.copyFrom(pneu);
            this.pneus.push(result);
            return "success";
        }
        return "failed";
    }

    checkTypes(pneu: Pneu): boolean {
        if(pneu.id != undefined && pneu.kms != undefined && pneu.custo != undefined 
            && pneu.marca != undefined && pneu.largura != undefined && pneu.aro != undefined
            && pneu.capacidade != undefined && pneu.treadwear != undefined && pneu.data != undefined) {
            return true;
        }
        return false;
    }

    idNaoCadastrado(id: string): boolean{
        return !this.pneus.find(a => a.id == id);
    }

    pneuNaoCadastrado(id: string, listaPneus: Pneu []): boolean {
         return !listaPneus.find(elem => elem.id == id);
    }	     

    atualizar(pneu: Pneu): Pneu{
        var result: Pneu = this.pneus.find(a => a.id == pneu.id);
        if(result) result.copyFrom(pneu);
        return result;
    }

    remover(id: string): string{
        for(let i = 0; i < this.pneus.length; i++){
            if(this.pneus[i].id == id){
                this.moverParaLixeira(this.pneus[i]);
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

    listarLixeira(): Pneu[] {
        return this.lixeiraPneus;
    }

    moverParaLixeira(pneu: Pneu): void{
        if(this.pneuNaoCadastrado(pneu.id, this.lixeiraPneus)){
             this.lixeiraPneus.push(pneu);
        }
    }

    removerPermanente(id :string): string{
    for(let i = 0; i < this.lixeiraPneus.length; i++){
        if(this.lixeiraPneus[i].id == id){
            this.lixeiraPneus.splice(i, 1);
            return "success";
        }
    }
    return "failed";
    }

   restaurarPneu(pneu: Pneu): string{
        if(!this.pneuNaoCadastrado(pneu.id, this.lixeiraPneus)){
             if(this.cadastrar(pneu)){
                    return this.removerPermanente(pneu.id);
                } else { 
                    this.removerPermanente(pneu.id);
                }
        }
        return "failed";
    }
}
