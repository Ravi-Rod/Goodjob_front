import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RemunerationStepComponent} from './remuneration-step.component';

describe('PriceStepComponent', () => {
  let component: RemunerationStepComponent;
  let fixture: ComponentFixture<RemunerationStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemunerationStepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemunerationStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
