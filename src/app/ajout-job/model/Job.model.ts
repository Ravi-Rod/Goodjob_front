import {CategoryName} from "../../layout/navbar/category/category.model";
import {DescriptionVO, RemunerationVO, TitleVO} from "./Job-vo.model";
import {NewJobPicture} from "./picture.model";

export interface NewJob {
  category: CategoryName,
  location: string,
  pictures: Array<NewJobPicture>,
  description: Description,
  remuneration: RemunerationVO
}

export interface Description {
  title: TitleVO,
  description: DescriptionVO
}

export interface CreatedJob {
  publicId: string
}

export interface DisplayPicture {
  file?: string,
  fileContentType?: string
}

export interface CardJob {
  remuneration: RemunerationVO,
  location: string,
  bookingCategory: CategoryName,
  publicId: string,
  loading: boolean
}

export interface Job {
  description: Description,
  pictures: Array<DisplayPicture>,
  remuneration: RemunerationVO,
  category: CategoryName,
  location: string,
  user: UserJob
}

export interface UserJob {
  firstname: string,
  imageUrl: string,
}
