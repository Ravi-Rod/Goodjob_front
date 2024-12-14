import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category, CategoryName } from './category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  private categories: Category[] = [
    {
      icon: "eye",
      displayName: "ALL",
      technicalName: "ALL",
      activated: false
    },
    {
      icon: "champagne-glasses",
      displayName: "LUXE",
      technicalName: "LUXE",
      activated: false
    },
    {
      icon: "kitchen-set",
      displayName: "NETTOYAGE",
      technicalName: "NETTOYAGE",
      activated: false
    },
    {
      icon: "mug-saucer",
      displayName: "COURSES",
      technicalName: "COURSES",
      activated: false
    },
    {
      icon: "tent",
      displayName: "DEMENAGEMENT",
      technicalName: "DEMENAGEMENT",
      activated: false
    },
    {
      icon: "eye",
      displayName: "PETSITTING",
      technicalName: "PETSITTING",
      activated: false
    },

  ]

  private changeCategory$ : BehaviorSubject<Category> = new BehaviorSubject<Category>(this.getCategoryByDefault())
  changeCategoryObs : Observable<Category> = this.changeCategory$.asObservable();

  changeCategory(category: Category): void {
    this.changeCategory$.next(category);
  }

  getCategories(): Category[] {
    return this.categories;
  }

  getCategoryByDefault() : Category {
    return this.categories[0];
  }

  getCategoryByTechnicalName(technicalName: CategoryName): Category | undefined {
    return this.categories.find(category => category.technicalName === technicalName);
  }

  constructor() { }
}
