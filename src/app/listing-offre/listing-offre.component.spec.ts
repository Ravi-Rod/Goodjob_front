import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingOffreComponent } from './listing-offre.component';

describe('ListingOffreComponent', () => {
  let component: ListingOffreComponent;
  let fixture: ComponentFixture<ListingOffreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListingOffreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListingOffreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
