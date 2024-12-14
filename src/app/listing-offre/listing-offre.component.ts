import { Component } from '@angular/core';
import {DropdownModule} from "primeng/dropdown";

@Component({
  selector: 'app-listing-offre',
  standalone: true,
  imports: [
    DropdownModule
  ],
  templateUrl: './listing-offre.component.html',
  styleUrl: './listing-offre.component.scss'
})
export class ListingOffreComponent {

  sOptions = [
    {label: 'Plus récent', value: 'newest'},
    {label: 'Plus ancien', value: 'oldest'}
  ];

}
