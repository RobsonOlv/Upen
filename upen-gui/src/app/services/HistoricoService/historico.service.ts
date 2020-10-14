import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';

import { Historico } from '../../../../../common/historico';
import { Pneu } from '../../../../../common/pneu';
import { Veiculo } from '../../../../../common/veiculo';

@Injectable({
  providedIn: 'root'
})
export class HistoricoService {

    private headers = new HttpHeaders({'Content-Type': 'application/json'});
    private servURL = 'http://localhost:3000';

    constructor(private http: HttpClient) {}

}
