import { Injectable }    from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';

import { Funcionario } from '../../../../../common/funcionario';

@Injectable()
export class FuncionarioService {

    private headers = new HttpHeaders({'Content-Type': 'application/json'});
    private taURL = 'http://localhost:3000';

    constructor(private http: HttpClient) {}

}
