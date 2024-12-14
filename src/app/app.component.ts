import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fontAwesomeIcons } from './shared/font-awesome-icons';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./layout/footer/footer.component";
import { NavbarComponent } from "./layout/navbar/navbar.component";
import {ToastModule} from "primeng/toast";
import {ListingOffreComponent} from "./listing-offre/listing-offre.component";
import {CategoryComponent} from "./layout/navbar/category/category.component";
import {IEntreprisesComponent} from "./Inscription/i-entreprises/i-entreprises.component";
import {IParticulierComponent} from "./Inscription/i-particulier/i-particulier.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ButtonModule, FontAwesomeModule, FooterComponent, NavbarComponent, ToastModule, ListingOffreComponent, CategoryComponent, IEntreprisesComponent, IParticulierComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {


  faIconiLibrary :FaIconLibrary = inject(FaIconLibrary);

  ngOnInit(): void {
    this.initFontAwesome();
  }

  private initFontAwesome(): void {
    this.faIconiLibrary.addIcons(...fontAwesomeIcons);
  }
}
