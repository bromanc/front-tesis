import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubprocessDegreeFormComponent } from './subprocess-degree-form.component';

describe('SubprocessDegreeFormComponent', () => {
  let component: SubprocessDegreeFormComponent;
  let fixture: ComponentFixture<SubprocessDegreeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubprocessDegreeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubprocessDegreeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
