import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select2OptionData } from 'ng2-select2';

import { Dish } from '../models/dish.model';
import { Category } from '../models/category.model';
import { DishService } from './dish.service';
import { CategoryService } from '../category/category.service';



@Component({
  templateUrl: './add-dish.component.html'
})
export class AddDishComponent implements OnInit {

  dish: Dish = new Dish();
  
  public categories: Array<Select2OptionData>;

  constructor(private router: Router, private dishService: DishService, private categoryService: CategoryService) {

  }
  
  changed(data: {value: string}) {
  	console.log(data.value);
    this.dish.categoryId = data.value;
  }

  ngOnInit() {
    
    this.categoryService.getCategories()
      .subscribe( data => {
        this.categories = data.map(function(item) {
			return {
	                  id: item.id,
	                  text: item.name
		           };
          });
      });
  };
  
  createDish(): void {
    this.dishService.createDish(this.dish)
        .subscribe( data => {
          alert("Dish created successfully.");
        });

  };

}
