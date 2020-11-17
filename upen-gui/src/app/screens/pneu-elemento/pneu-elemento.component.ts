import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs'
import { Pneu } from '../../../../../common/pneu';
import { PneuElementoService } from '../../services/PneuElementoService/pneu-elemento.service'

@Component({
  selector: 'app-pneu-elemento',
  templateUrl: './pneu-elemento.component.html',
  styleUrls: ['./pneu-elemento.component.css']
})
export class PneuElementoComponent implements OnInit {
  
  pneu: Pneu = new Pneu();
  atribuicao: [string, string, string, boolean] = ["", "", "", false]
  id: string;
  evento: [string, string, number] = ["", "", 0];
  clickModal = -1;
  clickModal2 = -1;

  modal = document.getElementById("myModal");
  btn = document.getElementById("myBtn");
  span = document.getElementsByClassName("close")[0];

  constructor(private activatedRoute: ActivatedRoute, 
    private route: Router, 
    private pneuElementoService: PneuElementoService,
    ) {}

    public toggleField(int: number) {
      if(int == 0){
        this.clickModal = this.clickModal * (-1);
      } else {
        this.clickModal2 = this.clickModal2 * (-1);
      }
    
    }

    adicionarEvento(evento: [string, string, number]){
      if(evento[0] != "" && evento[1] != "" && evento[2] != 0){
        evento[2] = evento[2]
        this.pneu.eventos.unshift(evento);
        this.evento = ["", "", 0];
        this.atualizarPneu(this.pneu);
      } else {
        alert("Preencha todos os campos.")
      }
    }

    deletarEvento(evento: [string, string, number]){
      for (let index = 0; index < this.pneu.eventos.length; index++) {
        if(this.pneu.eventos[index] == evento){
          this.pneu.eventos.splice(index, 1);
          this.atualizarPneu(this.pneu);
        }     
      }
    }

    atribuirVeiculo(atr:[string, string, string, boolean]){
      atr[3] = true;
      this.pneuElementoService.getVeiculo(atr[0])
      .subscribe(
        ar => {
          if(ar == null){
            alert("Veículo não cadastrado");
          } else {
            if(ar.pneus.length < 4) {
              ar.pneus.push(this.pneu);
              this.pneuElementoService.atualizarVeiculo(ar)
                .subscribe(
                  res => {
                    if (res == ar){
                      //itsok
                    }
                  }
                );
              this.pneu.atribuicao = atr;
              this.atualizarPneu(this.pneu);
            } else {
              alert("Não foi possível inserir o pneu ao veículo informado.")
            }
          }
        }
      );
    }

    desatribuirVeiculo(pneu: Pneu):void {
      this.pneuElementoService.getVeiculo(this.pneu.atribuicao[0])
      .subscribe(
        ar => {
          if(ar == null){
            this.pneu.atribuicao = ["", "", "", false];
            this.atualizarPneu(this.pneu);
          } else {
            for (let index = 0; index < ar.pneus.length; index++) {
              if(ar.pneus[index].id == this.pneu.id){
                ar.pneus.splice(index, 1);
              }
            }
            this.pneuElementoService.atualizarVeiculo(ar)
              .subscribe(
                res => {
                  if (res == ar){
                    console.log("plk");
                  }
                }
              );
            this.pneu.atribuicao = ["", "", "", false];
            this.atualizarPneu(this.pneu);
          }
        }
      );
    }

    atualizarPneu(pneu: Pneu): void {
      this.pneuElementoService.atualizar(pneu)
        .subscribe(
          res => {
            if (res == pneu){
              this.pneu = res;
            }
          }
        )
    }

    deletarPneu(id: string): void {
      this.desatribuirVeiculo(this.pneu);
      this.pneuElementoService.deletar(id)
        .subscribe(
          res => {
            if(res == id){
              this.pneu = new Pneu();
              this.route.navigate(['/pneus']);
              alert("O pneu " + id + " foi removido");
            }
          }
        )
    }

    getCost(): number {
      var count : number = 0;
      for (let i = 0; i < this.pneu.eventos.length; i++) {
        count = Number(count) + Number(this.pneu.eventos[i][2]);
      } 
      count = Number(count) + Number(this.pneu.custo);
      return count;
    }

    getCBC(): number {
      var cb = Number(this.pneu.kms) / this.getCost();
      cb += (1.75*cb) + 0.14;
      if(cb > 1){
        return 1;
      }
      return cb;
    }

    
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
    });

    this.pneuElementoService.getPneu(this.id)
      .subscribe(
        ar => {
          if(ar == null){
            this.route.navigate(['/pneus']);
            alert("Pneu não cadastrado.");
          } else {
            this.pneu = ar;
          }
        }
      );
    }
}
