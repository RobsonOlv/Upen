import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';

import { Pneu } from '../../../../../common/pneu';

@Injectable({
  providedIn: 'root'
})
export class ListaPneusService {

    private headers = new HttpHeaders({'Content-Type': 'application/json'});
    private servURL = 'http://localhost:3000';

    constructor(private http: HttpClient) {}
    
    criar(pneu: Pneu): Observable<any> {
      return this.http.post<any>(this.servURL + "/pneu", pneu, {headers: this.headers})
        .pipe(
          retry(2),
          map(res => {if (res.success) {return pneu;} else {return null;}})
        );
    }

    deletar(id: String): Observable<any> {
      return this.http.delete<any>(this.servURL + "/pneu/" + id)
      .pipe( 
          retry(2),
          map( res => {if (res.success) {return id } else {return null;}} )
          ); 
    }

    getPneu(id: string): Observable<Pneu> {
      return this.http.get<Pneu>(this.servURL + "/pneus/" + id)
        .pipe(
          retry(2)
        );
    }
    
    getPneus(): Observable<Pneu[]> {
      return this.http.get<Pneu[]>(this.servURL + "/pneus/")
        .pipe(
          retry(2)
        );
    }

    getLixeira(): Observable<Pneu[]> {
      return this.http.get<Pneu[]>(this.servURL + "/lixeirapneus")
        .pipe(
          retry(2)
        );
    }

    deletarPneuPermanentemente(id: string): Observable<any>{
      return this.http.delete<any>(this.servURL + "/lixeirapneus/"+ id)
        .pipe(
          retry(2),
          map( res => {if(res.success) {return id} else {return null}})
        );
    }
  
    restaurarPneu(pneu: Pneu): Observable<any>{
      return this.http.post<any>(this.servURL + "/lixeirapneus", pneu, {headers: this.headers})
        .pipe(
          retry(2),
          map( res => {if (res.success) {return pneu;} else {return null}} )
        );
    }  
}