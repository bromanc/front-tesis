import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { IProcess } from './schema/process.schema';
import config from '../../../auth_config.json';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient) {
    }

    getProcess$(id: string): Observable<IProcess> {
        return this.http
            .get<IProcess>(`${config.apiUri}/process/${id}`)
            .pipe(
                catchError(err => throwError(err))
            );
    }
}
