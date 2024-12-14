import {Component, effect, inject, OnDestroy} from '@angular/core';
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {JobService} from "../service/job.service";
import {ToastService} from "../../layout/toast.service";
import {AuthService} from "../../core/auth/auth.service";
import {Router} from "@angular/router";
import {CreatedJob, Description, NewJob} from "../model/Job.model";
import {NewJobPicture} from "../model/picture.model";
import {State} from "../../core/model/state.model";
import {CategoryName} from "../../layout/navbar/category/category.model";
import {RemunerationVO} from "../model/Job-vo.model";
import {Step} from "./step.model";
import {CategoryStepComponent} from "./step/category-step/category-step.component";
import {LocationStepComponent} from "./step/location-step/location-step.component";
import {PictureStepComponent} from "./step/picture-step/picture-step.component";
import {DescriptionStepComponent} from "./step/description-step/description-step.component";
import {RemunerationStepComponent} from "./step/remuneration-step/remuneration-step.component";
import {FooterStepComponent} from "../../shared/footer-step/footer-step.component";


@Component({
  selector: 'app-properties-create',
  standalone: true,
  imports: [
    CategoryStepComponent,
    FooterStepComponent,
    LocationStepComponent,
    PictureStepComponent,
    DescriptionStepComponent,
    RemunerationStepComponent
  ],
  templateUrl: './properties-create.component.html',
  styleUrl: './properties-create.component.scss'
})
export class PropertiesCreateComponent implements OnDestroy {

  CATEGORY = "category";
  LOCATION = "location";
  PHOTOS = "photos";
  DESCRIPTION = "description";
  REMUNERATION = "remuneration";

  dialogDynamicRef = inject(DynamicDialogRef);
  jobService = inject(JobService);
  toastService = inject(ToastService);
  userService = inject(AuthService);
  router = inject(Router);

  steps: Step[] = [
    {
      id: this.CATEGORY,
      idNext: this.LOCATION,
      idPrevious: null,
      isValid: false
    },
    {
      id: this.LOCATION,
      idNext: this.PHOTOS,
      idPrevious: this.CATEGORY,
      isValid: false
    },
    {
      id: this.PHOTOS,
      idNext: this.DESCRIPTION,
      idPrevious: this.LOCATION,
      isValid: false
    },
    {
      id: this.DESCRIPTION,
      idNext: this.REMUNERATION,
      idPrevious: this.PHOTOS,
      isValid: false
    },
    {
      id: this.REMUNERATION,
      idNext: null,
      idPrevious: this.DESCRIPTION,
      isValid: false
    }
  ];

  currentStep = this.steps[0];

  newJob: NewJob = {
    category: "TRANSPORT",
    location: "",
    pictures: new Array<NewJobPicture>(),
    description: {
      title: {value: ""},
      description: {value: ""}
    },
    remuneration: {value: 0}
  };

  loadingCreation = false;


  constructor() {
    this.listenFetchUser();
    this.listenJobCreation();
  }

  createJob(): void {
    this.loadingCreation = true;
    this.jobService.create(this.newJob);
  }

  ngOnDestroy(): void {
    this.jobService.resetJobCreation();
  }

  listenFetchUser() {
    effect(() => {
      if (this.userService.fetchUser().status === "OK"
        && this.jobService.createSig().status === "OK") {
        this.router.navigate(["ajout-job", "offres"]);
      }
    });
  }

  listenJobCreation() {
    effect(() => {
      let createdJobState = this.jobService.createSig();
      if (createdJobState.status === "OK") {
        this.onCreateOk(createdJobState);
      } else if (createdJobState.status === "ERROR") {
        this.onCreateError();
      }
    });
  }

  onCreateOk(createdJobState: State<CreatedJob>) {
    this.loadingCreation = false;
    this.toastService.send({
      severity: "success", summary: "Success", detail: "Job crée avec succès.",
    });
    this.dialogDynamicRef.close(createdJobState.value?.publicId);
    this.userService.fetch(true);
  }

  private onCreateError() {
    this.loadingCreation = false;
    this.toastService.send({
      severity: "error", summary: "Error", detail: "Impossible de créer un Job, veuillez réessayer.",
    });
  }

  nextStep(): void {
    if (this.currentStep.idNext !== null) {
      this.currentStep = this.steps.filter((step: Step) => step.id === this.currentStep.idNext)[0];
    }
  }

  previousStep(): void {
    if (this.currentStep.idPrevious !== null) {
      this.currentStep = this.steps.filter((step: Step) => step.id === this.currentStep.idPrevious)[0];
    }
  }

  isAllStepsValid(): boolean {
    return this.steps.filter(step => step.isValid).length === this.steps.length;
  }

  onCategoryChange(newCategory: CategoryName): void {
    this.newJob.category = newCategory;
  }

  onValidityChange(validity: boolean) {
    this.currentStep.isValid = validity;
  }

  onLocationChange(newLocation: string) {
    this.newJob.location = newLocation;
  }

  onPictureChange(newPictures: NewJobPicture[]) {
    this.newJob.pictures = newPictures;
  }

  onDescriptionChange(newDescription: Description) {
    this.newJob.description = newDescription;
  }

  onRemunerationChange(newRemuneration: RemunerationVO) {
    this.newJob.remuneration = newRemuneration;
  }
}
