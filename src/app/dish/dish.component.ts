import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Dish } from '../models/dish.model';
import { DishService } from './dish.service';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styles: []
})
export class DishComponent implements OnInit {

  dishes: Dish[];

  constructor(private router: Router, private dishService: DishService) {

  }

  ngOnInit() {
    this.dishService.getDishes()
      .subscribe( data => {
        this.dishes = data;
      });
  };

  deleteDish(dish: Dish): void {
    this.dishService.deleteDish(dish)
      .subscribe( data => {
        this.dishes = this.dishes.filter(d => d !== dish);
      })
  };

}


