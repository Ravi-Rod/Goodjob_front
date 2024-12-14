import {Component, effect, EventEmitter, inject, input, Output} from '@angular/core';
import {CardJob} from "../../ajout-job/model/Job.model";
import {CandidatureJob} from "../../candidature/model/candidature.model";
import {CategoryService} from "../../layout/navbar/category/category.service";
import {CountryService} from "../../ajout-job/properties-create/step/location-step/country.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-card-job',
  standalone: true,
  imports: [],
  templateUrl: './card-job.component.html',
  styleUrl: './card-job.component.scss'
})
export class CardJobComponent {

  job = input.required<CardJob | CandidatureJob>();
  cardMode = input<"user" | "candidature">();

  @Output()
  deleteJob = new EventEmitter<CardJob>();
  @Output()
  cancelCandidature = new EventEmitter<CandidatureJob>();

  candidatureJob: CandidatureJob | undefined;
  cardJob: CardJob | undefined;

  router = inject(Router);
  categoryService = inject(CategoryService);
  countryService = inject(CountryService);


  constructor() {
    this.listenToJob();
    this.listenToCardMode();
  }

  private listenToJob() {
    effect(() => {
      const job = this.job();
      this.countryService.getCountryByCode(job.location)
        .subscribe({
          next: country => {
            if (job) {
              this.job().location = country.region + ", " + country.name.common
            }
          }
        })
    });
  }

  private listenToCardMode() {
    effect(() => {
      const cardMode = this.cardMode();
      if (cardMode && cardMode === "candidature") {
        this.candidatureJob = this.job() as CandidatureJob
      } else {
        this.cardJob = this.job() as CardJob;
      }
    });
  }

  onDeleteJob(displayCardJobDTO: CardJob) {
    this.deleteJob.emit(displayCardJobDTO);
  }

  onCancelCandidature(candidatureJob: CandidatureJob) {
    this.cancelCandidature.emit(candidatureJob);
  }

  onClickCard(publicId: string) {
    this.router.navigate(['job'],
      {queryParams: {id: publicId}}).then(r =>
      {
      // Navigation réussie
       console.log('Navigation réussie'); },
      (error) => {
        // Navigation échouée
        console.error('Navigation échouée', error);
      });
  }

}
