import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IParticulierComponent } from './i-particulier.component';

describe('IParticulierComponent', () => {
  let component: IParticulierComponent;
  let fixture: ComponentFixture<IParticulierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IParticulierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IParticulierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
