import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './user/user.component';
import { RegisterUserComponent } from './user/register-user.component';
import { CategoryComponent } from './category/category.component';
import { AddCategoryComponent } from './category/add-category.component';
import { DishComponent } from './dish/dish.component';
import { AddDishComponent } from './dish/add-dish.component';
import { OrderComponent } from './order/order.component';
import { AddOrderComponent } from './order/add-order.component';

const routes: Routes = [
  { path: 'login', component: UserComponent },
  { path: 'register', component: RegisterUserComponent },
  { path: 'categories', component: CategoryComponent },
  { path: 'categories/add', component: AddCategoryComponent },
  { path: 'dishes', component: DishComponent },
  { path: 'dishes/add', component: AddDishComponent },
  { path: 'orders', component: OrderComponent },
  { path: 'orders/add', component: AddOrderComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
