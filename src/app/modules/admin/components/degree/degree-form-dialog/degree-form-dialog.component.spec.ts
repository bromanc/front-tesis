import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DegreeFormDialogComponent } from './degree-form-dialog.component';

describe('CreateFormDialogComponent', () => {
  let component: DegreeFormDialogComponent;
  let fixture: ComponentFixture<DegreeFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DegreeFormDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DegreeFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
