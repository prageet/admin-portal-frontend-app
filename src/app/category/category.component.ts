import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Category } from '../models/category.model';
import { CategoryService } from './category.service';

import { Dish } from '../models/dish.model';
import { DishService } from '../dish/dish.service';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ModalComponent } from '../common/modal/modal.component';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: Category[];
  category: Category = new Category();
  newCategory: Category = new Category();
  categoryId: string;
  title: string;
  dishes: Dish[];
  dish: Dish = new Dish();
  
  showAddCategoryModal: boolean = false;
  showAddDishModal: boolean = false;

  constructor(
  	private router: Router,
    private categoryService: CategoryService,
    private dishService: DishService,
    private modalService: BsModalService
  ){}

  //select 2 event
  changed(data: {value: string}) {
  	console.log(data.value);
    this.categoryId = data.value;
    this.getCategoryDetails(this.categoryId);
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

  deleteCategory(category: Category): void {
    this.categoryService.deleteCategory(category)
      .subscribe( data => {
        this.categories = this.categories.filter(c => c !== category);
      })
  };
  
  getCategoryDetails(categoryId: String): void {
	  this.categoryService.getSpecificCategoryDetails(categoryId)
	      .subscribe( data => {
	        this.category = data;
	        console.log("category details =" + this.category);
	      });
  }
  
  addNewCategory(newCategory: Category): void {
  	this.showAddCategoryModal = true;
  	this.newCategory = {};
	const initialState = { category: this.newCategory, showAddCategoryModal: this.showAddCategoryModal, title: "Add New Category"};
    this.modalRef = this.modalService.show(ModalComponent, {initialState })
    this.modalRef.content.onClose.subscribe(result => {
        console.log('results', result);
        this.categoryService.createCategory(result)
        .subscribe( data => {
        	this.categoryService.getCategories()
      .subscribe( data => {
        this.categories = data.map(function(item) {
			return {
	                  id: item.id,
	                  text: item.name
		           };
          });
      });
        });
    })
  };
  
  addNewDish(newDish: Dish): void {
  	this.showAddDishModal = true;
  	this.newDish = {};
	const initialState = { dish: this.newDish, showAddDishModal: this.showAddDishModal, categories: this.categories, title: "Add New Dish"};
    this.modalRef = this.modalService.show(ModalComponent, {initialState })
    this.modalRef.content.onClose.subscribe(result => {
        console.log('results', result);
        this.dishService.createDish(result)
        .subscribe( data => {
        	this.getCategoryDetails(data.categoryId);
        });
    })
  };
  
  editDish(dish: Dish): void {
  	this.showAddDishModal = true;
	const initialState = { dish: dish, showAddDishModal: this.showAddDishModal, categories: this.categories, title: "Edit Dish"};
    this.modalRef = this.modalService.show(ModalComponent, {initialState })
    this.modalRef.content.onClose.subscribe(result => {
        console.log('results', result);
        this.dishService.updateDish(result)
        .subscribe( data => {
        	this.getCategoryDetails(data.categoryId);
        });
    })
  };
  
  deleteDish(dish: Dish): void {
    this.dishService.deleteDish(dish)
      .subscribe( data => {
        this.getCategoryDetails(data.categoryId);
      })
  };
}


