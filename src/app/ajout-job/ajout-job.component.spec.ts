import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutJobComponent } from './ajout-job.component';

describe('AjoutJobComponent', () => {
  let component: AjoutJobComponent;
  let fixture: ComponentFixture<AjoutJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutJobComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjoutJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
