import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubprocessFormDialogComponent } from './subprocess-form-dialog.component';

describe('FormSubprocessComponent', () => {
  let component: SubprocessFormDialogComponent;
  let fixture: ComponentFixture<SubprocessFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubprocessFormDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubprocessFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
