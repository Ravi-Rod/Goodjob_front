import {RemunerationVO} from "../../ajout-job/model/Job-vo.model";

export interface CandidatureJob {
  location: string,
  postule: boolean,
  candidaturePublicId: string,
  jobPublicId: string,
  loading: boolean
}

export interface CreateCandidature {
  postule: boolean,
  jobPublicId: string,
}
