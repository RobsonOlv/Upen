import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

import { Observable } from 'rxjs'
import { Pneu } from '../../../../../common/pneu'
import { ListaPneusService } from 'src/app/services/ListaPneuService/lista-pneus.service'


@Component({
  selector: 'app-lista-pneus',
  templateUrl: './lista-pneus.component.html',
  styleUrls: ['./lista-pneus.component.css']
})
export class ListaPneusComponent implements OnInit {

  pneu: Pneu = new Pneu();
  pneus: Pneu[] = [];
  atribuicao: [string, string, string, boolean] = ["", "", "", false];
  id: string;
  marca: string;
  data: string;
  clickModal = -1;
  idduplicado: boolean = false;
  popupCadastro: boolean = false;
  botaoCadastrarPressionado: boolean;

  modal = document.getElementById("myModal");
  btn = document.getElementById("myBtn");
  span = document.getElementById("mySpan");

  constructor(private route: ActivatedRoute, private ListaPneusService: ListaPneusService) {}

  public toggleField() {
    this.clickModal = this.clickModal * (-1);
  }

  adicionarPneu(pneu: Pneu): void {
    this.botaoCadastrarPressionado = true;

    if(!this.checkAllFilled()){
      return;
    }

    this.ListaPneusService.criar(pneu)
      .subscribe(
        ar => {
          if (ar) {
            this.pneus.push(ar);
            this.pneu = new Pneu();
            alert("Pneu cadastrado");
            this.botaoCadastrarPressionado = false;
            this.fecharPopup();
          } else {
            this.idduplicado =  true;
          }
        },
        msg => { alert (msg.message); }
      );
  }

  checkAllFilled(): boolean{
    return (!this.checkStringNotFilled(this.pneu.id) && !this.checkStringNotFilled(this.pneu.marca) &&
      !this.checkNumberNotFilled(this.pneu.aro) && !this.checkNumberNotFilled(this.pneu.largura)
      && !this.checkNumberNotFilled(this.pneu.altura)) && !this.checkNumberNotFilled(this.pneu.capacidade) && 
      !this.checkNumberNotFilled(this.pneu.kmh) && !this.checkNumberNotFilled(this.pneu.treadwear) && !this.checkStringNotFilled(this.pneu.data);
  }

  checkStringNotFilled( s: string): boolean{
    return (s.trim() == "")
  }

  checkNumberNotFilled(n: number) : boolean {
    return(n == 0);
  }

  resetidDuplicado() {
    this.idduplicado = false;
  }

  abrirPopup(): void{
    this.popupCadastro = true;
  }

  fecharPopup(): void{
    this.popupCadastro = false;
  }

  onMove(): void {
    this.idduplicado = false;
  }

  ngOnInit() :void {
    this.popupCadastro = false;
    this.botaoCadastrarPressionado = false;
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.ListaPneusService.getPneus()
      .subscribe(
        as => { this.pneus = as; },
        msg => { alert(msg.message); }
      )
  }
}