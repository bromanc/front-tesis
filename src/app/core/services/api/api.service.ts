import {Injectable} from '@angular/core';
import {throwError, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {IProcess, ISubprocess} from '../../schema/process.schema';
import config from '../../../../../auth_config.json';
import {IAccountant} from "../../schema/accountant.schema";
import {IDegree} from "../../schema/degree.schema";
import {IUser} from "../../schema/user.schema";

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient) {
    }

    /*
    * Degree API
    * */
    getDegrees$(): Observable<IDegree[]> {
        return this.http
            .get<IDegree[]>(`${config.apiUri}/degree/`)
            .pipe(
                catchError(err => throwError(err))
            )
    }

    getDegree$(id: string): Observable<IDegree> {
        return this.http
            .get<IDegree>(`${config.apiUri}/degree/${id}`)
            .pipe(
                catchError(err => throwError(err))
            )
    }

    createDegree$(body: any): Observable<IDegree> {
        return this.http
            .post<IDegree>(`${config.apiUri}/degree`, body)
            .pipe(
                catchError(err => throwError(err))
            );
    }

    updateDegree$(id: string, body: any): Observable<IDegree> {
        return this.http
            .patch<IDegree>(`${config.apiUri}/degree/${id}`, body)
            .pipe(
                catchError(err => throwError(err))
            )
    }

    deleteDegree$(id: string): Observable<any> {
        return this.http
            .delete(`${config.apiUri}/degree/${id}`)
            .pipe(
                catchError(err => throwError(err))
            );
    }

    /*
    * Process API
    * */
    getProcesses$(): Observable<IProcess[]> {
        return this.http
            .get<IProcess[]>(`${config.apiUri}/process/`)
            .pipe(
                catchError(err => throwError(err))
            )
    }

    getProcessById$(id: string): Observable<IProcess> {
        return this.http
            .get<IProcess>(`${config.apiUri}/process/${id}`)
            .pipe(
                catchError(err => throwError(err))
            );
    }

    createProcess$(body: any): Observable<IProcess> {
        return this.http
            .post<IProcess>(`${config.apiUri}/process/`, body)
            .pipe(
                catchError(err => throwError(err))
            )
    }

    updateProcess$(id: string, body: any): Observable<IProcess> {
        return this.http
            .patch<IProcess>(`${config.apiUri}/process/${id}`, body)
            .pipe(
                catchError(err => throwError(err))
            )
    }

    deleteProcess$(id: string): Observable<any> {
        return this.http
            .delete(`${config.apiUri}/process/${id}`)
            .pipe(
                catchError(err => throwError(err))
            );
    }

    /*
    * Subprocess API
    * */
    getSubprocessesByProcessId$(id: string): Observable<ISubprocess[]> {
        return this.http
            .get<ISubprocess[]>(`${config.apiUri}/subprocess/${id}`)
            .pipe(
                catchError(err => throwError(err))
            )
    }

    createSubprocess$(processId: string, body: any): Observable<ISubprocess> {
        return this.http
            .post<ISubprocess>(`${config.apiUri}/subprocess/${processId}`, body)
            .pipe(
                catchError(err => throwError(err))
            );
    }

    updateSubprocess$(subprocessId: string, body: any): Observable<ISubprocess> {
        return this.http
            .patch<ISubprocess>(`${config.apiUri}/subprocess/${subprocessId}`, body)
            .pipe(
                catchError(err => throwError(err))
            );
    }

    deleteSubprocess$(subprocessId: string): Observable<any> {
        return this.http
            .delete(`${config.apiUri}/subprocess/${subprocessId}`)
            .pipe(
                catchError(err => throwError(err))
            );
    }

    /*
    * Accountant API
    * */
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
            );
    }

    /*
    * Management API
    * */

    getUsers$(): Observable<IUser[]> {
        return this.http
            .get<any>(`${config.apiUri}/management/`)
            .pipe(
                catchError(err => throwError(err))
            );
    }

    getUser$(id: string): Observable<IUser> {
        return this.http
            .get<IUser>(`${config.apiUri}/management/${id}`)
            .pipe(
                catchError(err => throwError(err))
            );
    }

    assignDegreeToUser$(userId: string, degreeId: string, processId: string): Observable<any> {
        return this.http
            .post(`${config.apiUri}/management/${userId}`,
                {degreeId: degreeId, processId: processId}
            )
            .pipe(
                catchError(err => throwError(err))
            );
    }

    createUser$(body: any): Observable<any> {
        return this.http
            .post(`${config.apiUri}/management`, body)
            .pipe(
                catchError(err => throwError(err))
            );
    }

    deleteUser$(id: string): Observable<any> {
        return this.http
            .delete(`${config.apiUri}/management/${id}`)
            .pipe(
                catchError(err => throwError(err))
            );
    }
}
