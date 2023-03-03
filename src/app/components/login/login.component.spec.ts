import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '@auth0/auth0-angular';

import { LoginComponent } from './login.component';

import { Observable, of } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';

export class MockAuthService {
  isAuthenticated$: Observable<boolean> = of(true);
  public loginWithRedirect(args: any): void {
    return;
  }
}

export class MockRouter {
  public navigate(commands: any[], extras?: NavigationExtras | undefined): void {
    return;
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [{
        provide: AuthService,
        useValue: new MockAuthService()
      },
        {
          provide: Router,
          useValue: new MockRouter()
        }
      ]
    })
        .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize the login component successfully', () => {
    expect(component).toBeDefined();
    const domElement: HTMLElement = fixture.nativeElement as HTMLElement;
    expect(domElement.querySelectorAll('button').length).toEqual(1)
    expect(domElement.querySelectorAll('div').length).toEqual(1)
  });

  it("should execute the 'loginWithRedirect' method without errors", () => {
    component.loginWithRedirect();
    expect(component).toBeDefined();
  })
});
