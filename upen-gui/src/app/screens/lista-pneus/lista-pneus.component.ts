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

  constructor(private route: ActivatedRoute, private ListaPneusService: ListaPneusService) { }

  ngOnInit(): void {
  }

}