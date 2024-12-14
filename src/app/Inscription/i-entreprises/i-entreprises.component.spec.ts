import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IEntreprisesComponent } from './i-entreprises.component';

describe('IEntreprisesComponent', () => {
  let component: IEntreprisesComponent;
  let fixture: ComponentFixture<IEntreprisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IEntreprisesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IEntreprisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
