import { Routes } from '@angular/router';
import {OffresComponent} from "./ajout-job/offres/offres.component";
import {authorityRouteAccess} from "./core/auth/authority-route-access";
import {HomeComponent} from "./home/home.component";

export const routes: Routes = [
  {
    path: 'ajout-job/offres',
    component: OffresComponent
  },
  {
    path: 'ajout-stage/offres',
    component: OffresComponent,
    canActivate: [authorityRouteAccess],
    data: {
      authorities: ["ROLE_ENTREPRISE"]
    }
  },
  {
    path: '',
    component: HomeComponent
  }
];
