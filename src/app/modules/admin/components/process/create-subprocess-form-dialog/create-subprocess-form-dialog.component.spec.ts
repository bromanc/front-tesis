import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubprocessFormDialogComponent } from './create-subprocess-form-dialog.component';

describe('CreateSubprocessFormDialogComponent', () => {
  let component: CreateSubprocessFormDialogComponent;
  let fixture: ComponentFixture<CreateSubprocessFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSubprocessFormDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSubprocessFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
