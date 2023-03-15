import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '@auth0/auth0-angular';
import { LoginComponent } from './login.component';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

export class MockAuthService {
  isAuthenticated$: Observable<boolean> = of(true);
  idTokenClaims$: Observable<object>;

  constructor(roles: object) {
    this.idTokenClaims$ = of(roles)
  }

  public loginWithRedirect(args: any): void {
    return;
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockRouter.navigate.and.returnValue(Promise.resolve(true));

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [{
        provide: AuthService,
        useValue: new MockAuthService({ "tesis-api/roles": ["admin"] })
      },
        {
          provide: Router,
          useValue: mockRouter
        }
      ]
    })
  });

  it('should initialize the login component successfully', () => {
    TestBed.compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeDefined();
    const domElement: HTMLElement = fixture.nativeElement as HTMLElement;
    expect(domElement.querySelectorAll('button').length).toEqual(1)
    expect(domElement.querySelectorAll('div').length).toEqual(1)
  });

  it('should initialize the login component successfully with a student role', () => {
    TestBed.overrideProvider(AuthService, { useValue: new MockAuthService({ "tesis-api/roles": ["student"] }) });
    TestBed.compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeDefined();
    const domElement: HTMLElement = fixture.nativeElement as HTMLElement;
    expect(domElement.querySelectorAll('button').length).toEqual(1)
    expect(domElement.querySelectorAll('div').length).toEqual(1)
  });

  it("should execute the 'loginWithRedirect' method without errors", () => {
    TestBed.compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.loginWithRedirect();
    expect(component).toBeDefined();
  })
});
