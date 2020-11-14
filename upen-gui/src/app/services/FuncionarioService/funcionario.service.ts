import { Injectable }    from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment'

import { Funcionario } from '../../../../../common/funcionario';
import { Veiculo } from '../../../../../common/veiculo';

@Injectable()
export class FuncionarioService {

    private headers = new HttpHeaders({'Content-Type': 'application/json'});
    private servURL = 'http://localhost:3000';

    constructor(private http: HttpClient) {}

    criarFuncionario(func: Funcionario): Observable<Funcionario> {
        return this.http.post<any>(this.servURL + "/funcionarios", func, {headers: this.headers})
                    .pipe(
                        retry(2),
                        map( res => {if (res.success) {return func;} else {return null;}} )
                    )

    }

    deletarFuncionario(func: Funcionario): Observable<any> {
        return this.http.delete<any>(this.servURL + "/funcionarios/" + func.cpf, {headers: this.headers}).pipe(
          retry(2)
        );
      }

    getFuncionarios(): Observable<Funcionario[]> {
        return this.http.get<Funcionario[]>(this.servURL + "/funcionarios")
                  .pipe(
                     retry(2)
                   );
    
        }
    
    atribuirVeiculo(func: Funcionario, veic: Veiculo): Observable<Funcionario> {
        return this.http.put<any>(this.servURL + "/funcionarios/" + func.cpf, JSON.stringify(veic), {headers: this.headers})
                .pipe (
                  retry(2)
                )
  } 

    desatribuirVeiculo(func: Funcionario, veic: Veiculo): Observable<Funcionario> {
        return this.http.put<any>(this.servURL + "/funcionarios/" + func.cpf+"/"+veic.placa, JSON.stringify(veic), {headers: this.headers})
                  .pipe (
                    retry(2)
                  )
    }

    listarVeiculos(): Observable<Veiculo[]> {
        return this.http.get<Veiculo[]>(environment.routeURLVeiculos)
                  .pipe(
                     retry(2)
                   );
        }

}