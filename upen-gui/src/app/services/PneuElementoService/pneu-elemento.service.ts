import { Injectable, ViewChildDecorator } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';

import { Pneu } from '../../../../../common/pneu';
import { Veiculo } from '../../../../../common/veiculo';

@Injectable({
  providedIn: 'root'
})
export class PneuElementoService {

    private headers = new HttpHeaders({'Content-Type': 'application/json'});
    private servURL = 'http://localhost:3000';

    constructor(private http: HttpClient) {}

  deletar(id: String): Observable<any> {
    return this.http.delete<any>(this.servURL + "/pneu/" + id)
             .pipe( 
                retry(2),
                map( res => {if (res.success) {return id } else {null;}} )
              ); 
  }
  
  atualizar(pneu: Pneu): Observable<Pneu> {
    return this.http.put<any>(this.servURL + "/pneu",JSON.stringify(pneu), {headers: this.headers})          .pipe( 
      retry(2),
      map( res => {if (res.success) {return pneu;} else {return null;}} )
    ); 
}

  getPneu(id: string): Observable<Pneu> {
    return this.http.get<Pneu>(this.servURL + "/pneus/" + id)
              .pipe(
                retry(2)
              );
  }

  getVeiculo(placa: string): Observable<Veiculo> {
    return this.http.get<Veiculo>(this.servURL + "/veiculos/" + placa)
              .pipe(
                retry(2)
                );
  }

  atualizarVeiculo(veiculo: Veiculo): Observable<Veiculo> {
    return this.http.put<any>(this.servURL + "/veiculos",JSON.stringify(veiculo), {headers: this.headers})          .pipe( 
      retry(2),
      map( res => {if (res.success) {return veiculo;} else {return null;}} )
    ); 
}

}