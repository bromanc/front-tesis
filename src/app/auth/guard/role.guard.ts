import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {map, Observable} from 'rxjs';
import {AuthService} from "@auth0/auth0-angular";
import * as _ from "lodash";

@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate {

    constructor(private authService: AuthService) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> {
        return this.authService.idTokenClaims$.pipe(
            map((tokenData) => {
                const role: string[] = _.get(tokenData, "tesis-api/roles", [])
                const allowedRole = _.get(route.data, "role", "")


                return role.includes(allowedRole);
            })
        );
    }
}
