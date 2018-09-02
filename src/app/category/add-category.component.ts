import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Category } from '../models/category.model';
import { CategoryService } from './category.service';

@Component({
  templateUrl: './add-category.component.html'
})
export class AddCategoryComponent {

  category: Category = new Category();

  constructor(private router: Router, private categoryService: CategoryService) {

  }

  createCategory(category: Category): void {
    this.categoryService.createCategory(this.category)
        .subscribe( data => {
          alert("Category created successfully.");
        });

  };

}
