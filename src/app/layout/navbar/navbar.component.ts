import {Component, effect, inject, OnInit} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CategoryComponent } from './category/category.component';
import { AvatarComponent } from './avatar/avatar.component';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { MenuModule } from 'primeng/menu';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import { MenuItem } from 'primeng/api/menuitem';
import {ToastService} from "../toast.service";
import {AuthService} from "../../core/auth/auth.service";
import {User} from "../../core/model/user.model";
import {ActivatedRoute} from "@angular/router";
import {PropertiesCreateComponent} from "../../ajout-job/properties-create/properties-create.component";



@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    ButtonModule,
    FontAwesomeModule,
    ToolbarModule,
    MenuModule,
    CategoryComponent,
    AvatarComponent
  ],
  providers: [DialogService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{

  location = "Anywhere";
  dates = "Any week";


  toastService = inject(ToastService);
  authService = inject(AuthService);
  dialogService = inject(DialogService);
  activatedRoute = inject(ActivatedRoute);
  ref: DynamicDialogRef | undefined;

  login = () => this.authService.login();

  logout = () => this.authService.logout();

  currentMenuItems: MenuItem[] | undefined = [];

  connectedUser: User = {email: this.authService.notConnected};

  constructor() {
    effect(() => {
      if (this.authService.fetchUser().status === "OK") {
        this.connectedUser = this.authService.fetchUser().value!;
        this.currentMenuItems = this.fetchMenu();
      }
    });
  }

  ngOnInit(): void {
    this.authService.fetch(false);
  //  this.extractInformationForSearch();
  }

  private fetchMenu(): MenuItem[] {
    if (this.authService.isAuthenticated()) {
      return [
        {
          label: "Mes annonces",
          routerLink: "users/offes",
        },
        {
          label: "Mes candidatures",
          routerLink: "candidatures",
          visible: this.hasToBeParticulier(),
        },
        {
          label: "déconnecter",
          command: this.logout
        },
      ]
    } else {
      return [
        {
          label: "S'inscrire'",
          styleClass: "font-bold",
          command: this.login
        },
        {
          label: "Se connecter",
          command: this.login
        }
      ]
    }
  }

  hasToBeParticulier(): boolean {
    return this.authService.hasAnyAuthority("ROLE_PARTICULIER");
  }


  openNewJob(): void {
    this.ref = this.dialogService.open(PropertiesCreateComponent,
      {
        width: "60%",
        header: "Good Job pour du bon Boulot",
        closable: true,
        focusOnShow: true,
        modal: true,
        showHeader: true
      })
  }

 // openNewSearch(): void {
 //   this.ref = this.dialogService.open(SearchComponent,
  //    {
    //    width: "40%",
      //  header: "Search",
      //  closable: true,
      //  focusOnShow: true,
      //  modal: true,
      //  showHeader: true
   //   });
 // }

 // private extractInformationForSearch(): void {
  //  this.activatedRoute.queryParams.subscribe({
  //    next: params => {
    //    if (params["location"]) {
 //         this.location = params["location"];
       //   this.dates = dayjs(params["startDate"]).format("MMM-DD")
 //           + " to " + dayjs(params["endDate"]).format("MMM-DD");
   //     } else if (this.location !== "Anywhere") {
 //         this.location = "Anywhere";
   //       this.dates = "Any week";
   //     }
  //    }
  //  })
 // }
}
