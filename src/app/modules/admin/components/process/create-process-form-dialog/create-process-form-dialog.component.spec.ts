import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProcessFormDialogComponent } from './create-process-form-dialog.component';

describe('FormDialogComponent', () => {
  let component: CreateProcessFormDialogComponent;
  let fixture: ComponentFixture<CreateProcessFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateProcessFormDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateProcessFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
