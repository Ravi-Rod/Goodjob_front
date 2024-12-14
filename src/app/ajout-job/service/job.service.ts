import {computed, inject, Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {State} from "../../core/model/state.model";
import {CardJob, CreatedJob, NewJob} from "../model/Job.model";
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class JobService {

  http = inject(HttpClient);

  constructor() { }

  private create$: WritableSignal<State<CreatedJob>>
    = signal(State.Builder<CreatedJob>().forInit())
  createSig = computed(() => this.create$());

  private getAll$: WritableSignal<State<Array<CardJob>>> =
    signal(State.Builder<Array<CardJob>>().forInit())
  getAllSig = computed(() => this.getAll$());

  private delete$: WritableSignal<State<string>> =
    signal(State.Builder<string>().forInit())
  deleteSig = computed(() => this.delete$());

  create(newJob: NewJob): void {
    // Vérifiez que remuneration.value est défini
    if (!newJob.remuneration || newJob.remuneration.value == null) {
      console.error('Le champ remuneration ne doit pas être null nft');
      return;
    }

    const formData = new FormData();
    for(let i = 0; i < newJob.pictures.length; ++i) {
      formData.append("picture-" + i, newJob.pictures[i].file);
    }
    const clone = structuredClone(newJob);
    clone.pictures = [];
    formData.append("dto", JSON.stringify(clone));
             console.log("FormData DTO:", JSON.stringify(clone));
    this.http.post<CreatedJob>(`${environment.API_URL}/user-job/create`,
      formData).subscribe({
      next: job => this.create$.set(State.Builder<CreatedJob>().forSuccess(job)),
      error: err =>
      { // Log l'erreur pour débogage
           console.error("Error:", err);
         this.create$.set(State.Builder<CreatedJob>().forError(err)); },
    });
  }

  resetJobCreation(): void {
    this.create$.set(State.Builder<CreatedJob>().forInit())
  }

  getAll(): void {
    this.http.get<Array<CardJob>>(`${environment.API_URL}/user-job/get-all`)
      .subscribe({
        next: jobs => this.getAll$.set(State.Builder<Array<CardJob>>().forSuccess(jobs)),
        error: err => this.create$.set(State.Builder<CreatedJob>().forError(err)),
      });
  }

  delete(publicId: string): void {
    const params = new HttpParams().set("publicId", publicId);
    this.http.delete<string>(`${environment.API_URL}/user-job/delete`, {params})
      .subscribe({
        next: publicId => this.delete$.set(State.Builder<string>().forSuccess(publicId)),
        error: err => this.create$.set(State.Builder<CreatedJob>().forError(err)),
      });
  }

  resetDelete() {
    this.delete$.set(State.Builder<string>().forInit());
  }
}
