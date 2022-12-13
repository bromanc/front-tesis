import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountantComponent } from './accountant.component';

describe('StudentsComponent', () => {
  let component: AccountantComponent;
  let fixture: ComponentFixture<AccountantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
