import { Component, OnInit } from '@angular/core';
import { Pneu } from '../../../../../../common/pneu';
import { ListaPneusService } from '../../../services/ListaPneuService/lista-pneus.service'
import {MatDialog} from '@angular/material/dialog';
import { DialogPermanentRemoval } from "./DialogPermanentRemoval";

@Component({
  selector: 'app-lixeira-pneus',
  templateUrl: './lixeira-pneus.component.html',
  styleUrls: ['./lixeira-pneus.component.css', '../lista-pneus.component.css', './hover.css']
})
export class LixeiraPneusComponent implements OnInit {

    lixeira: Pneu[];

    constructor( private listaPneusService: ListaPneusService , public dialog: MatDialog ) { }

    ngOnInit(): void {
        this.listarLixeira();
    }


    listarLixeira():void{
        this.listaPneusService.getLixeira()
          .subscribe(
            as => {
              this.lixeira = as;
            },
            msg => {alert(msg.message);}
        );
    }

    openDialog(pneu: Pneu) {
      const dialogRef = this.dialog.open(DialogPermanentRemoval, {data: pneu});
      dialogRef.afterClosed().subscribe(id => {
        if(id == "" || id == undefined) return;
        this.listaPneusService.deletarPneuPermanentemente(id).subscribe(
          ar => {
            if(ar != null){
              this.removerPorIndex(ar, pneu.id);
            }
          },
          msg => {
            alert("Não foi possível remover o pneu permanentemente");
          }
        )
      });
    }

    removerPorIndex(index: number, id: string): void{
      if(index >= this.lixeira.length){
        this.removerPorID(id);
      }else if(this.lixeira[index].id == id){
        this.lixeira.splice(index,1);
      }else{ 
        this.removerPorID(id);
      }
    }

    removerPorID(id: string): void{
      let index = this.lixeira.findIndex(v =>  v.id == id);
      if(index != null) this.lixeira.splice(index, 1);
    }

    restaurarPneu(pneu: Pneu): void{
      this.listaPneusService.restaurarPneu(pneu).subscribe(
        ar => {
          if(ar != null){
            alert("Pneu restaurado");
            this.removerPorIndex(ar, pneu.id);
          } else {
            this.listarLixeira();
          }
        },  
        msg => { alert(msg.message);}
      );
    }
}