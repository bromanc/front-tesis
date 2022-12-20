import {Injectable} from '@angular/core';
import {throwError, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {IProcess} from '../../schema/process.schema';
import config from '../../../../../auth_config.json';
import {IAccountant} from "../../schema/accountant.schema";

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

    getAccountantById$(id: string): Observable<IAccountant> {
        return this.http
            .get<IAccountant>(`${config.apiUri}/accountant/${id}`)
            .pipe(
                catchError(err => throwError(err))
            );
    }
    getAccountants$(): Observable<IAccountant[]> {
        return this.http
            .get<IAccountant[]>(`${config.apiUri}/accountant/`)
            .pipe(
                catchError(err => throwError(err))
            );
    }
    createAccountant$(body: any): Observable<IAccountant> {
        return this.http
            .post<IAccountant>(`${config.apiUri}/accountant/`, body)
            .pipe(
                catchError(err => throwError(err))
            );
    }
    updateAccountant$(id: string, body: any): Observable<IAccountant> {
        return this.http
            .patch<IAccountant>(`${config.apiUri}/accountant/${id}`, body)
            .pipe(
                catchError(err => throwError(err))
            );
    }
    deleteAccountant$(id: string): Observable<any> {
        return this.http
            .delete(`${config.apiUri}/accountant/${id}`)
            .pipe(
                catchError(err => throwError(err))
            )
    }
}
