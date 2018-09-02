import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Category } from '../models/category.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CategoryService {

  constructor(private http:HttpClient) {}

  private categoryUrl = 'http://localhost:8080/admin-portal/categories';

  public getCategories() {
    return this.http.get<Category[]>(this.categoryUrl);
  }
  
  public getSpecificCategoryDetails(categoryId) {
    return this.http.get<Category[]>(this.categoryUrl + '/' + categoryId);
  }

  public deleteCategory(category) {
    return this.http.delete(this.categoryUrl + "/"+ category.id);
  }

  public createCategory(category) {
    return this.http.post<Category>(this.categoryUrl, category);
  }

}
