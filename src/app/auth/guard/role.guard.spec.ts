import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';

import { RoleGuard } from './role.guard';

describe('RoleGuardGuard', () => {
  let guard: RoleGuard;
  let mockAuthService: any = {
    idTokenClaims$: of({ "tesis-api/roles": ["admin"] })
  };


  beforeEach(() => {
    guard = new RoleGuard(mockAuthService);
  });

  it("should initialize a RoleGuard object successfully", () => {
    expect(guard).toBeTruthy();
  });

  it("should return 'true' when the current role is allowed", () => {
    const route: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    route["data"] = {
      role: "admin"
    }

    const state: RouterStateSnapshot = {} as RouterStateSnapshot;

    guard.canActivate(route, state).subscribe({
      next: (value) => {
        expect(value).toBeTrue();
      }
    });
  });

  it("should return 'false' when the current role is not allowed", () => {
    const route: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    route["data"] = {
      role: "operator"
    }

    const state: RouterStateSnapshot = {} as RouterStateSnapshot;

    guard.canActivate(route, state).subscribe({
      next: (value) => {
        expect(value).toBeFalse();
      }
    });
  });
});
