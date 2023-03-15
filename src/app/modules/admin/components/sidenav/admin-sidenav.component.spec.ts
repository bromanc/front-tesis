import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, of } from 'rxjs';

import { AdminSidenavComponent } from './admin-sidenav.component';

export class MockAuthService {
  user$: Observable<object> = of({})

  logout(): void {
    return;
  }
}

describe('SidenavComponent', () => {
  let component: AdminSidenavComponent;
  let fixture: ComponentFixture<AdminSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminSidenavComponent],
      providers: [{
        provide: AuthService,
        useValue: new MockAuthService()
      },],
      imports: [MatMenuModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize the AdminSidenavComponent successfully', () => {
    expect(component).toBeDefined();
    const domElement: HTMLElement = fixture.nativeElement as HTMLElement;
    expect(domElement.querySelectorAll('button').length).toEqual(1);
    expect(domElement.querySelectorAll('mat-toolbar').length).toEqual(1);
  });

  it("should logout successfully", () => {
    component.logout();
    expect(component).toBeDefined();
  });
});
