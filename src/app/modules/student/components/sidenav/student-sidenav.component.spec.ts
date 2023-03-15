import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, of } from 'rxjs';

import { StudentSidenavComponent } from './student-sidenav.component';

export class MockAuthService {
  user$: Observable<boolean> = of(true);
  logout() {
    return;
  }
}

describe('SidenavComponent', () => {
  let component: StudentSidenavComponent;
  let fixture: ComponentFixture<StudentSidenavComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [StudentSidenavComponent],
      providers: [
        {
          provide: AuthService,
          useValue: new MockAuthService(),
        }
      ],
      imports: [MatMenuModule]
    })
        .compileComponents();

    fixture = TestBed.createComponent(StudentSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should initialize a 'StudentSidenavComponent' component successfully", () => {
    expect(component).toBeDefined();
    const domElement: HTMLElement = fixture.nativeElement as HTMLElement;
    expect(domElement.querySelectorAll('mat-toolbar').length).toEqual(1);
    expect(domElement.querySelectorAll('button').length).toEqual(1);
    expect(domElement.querySelectorAll('mat-sidenav-container').length).toEqual(1);
  });

  it("should lougout successfully", () => {
    component.logout();
    expect(component).toBeDefined();
  });
});
