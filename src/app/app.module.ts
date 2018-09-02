import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Select2Module } from 'ng2-select2';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { AppRoutingModule } from './app.routing.module';
import { UserService } from './user/user.service';
import { CategoryService } from './category/category.service';
import { DishService } from './dish/dish.service';
import { OrderService } from './order/order.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { RegisterUserComponent } from './user/register-user.component';
import { CategoryComponent } from './category/category.component';
import { AddCategoryComponent } from './category/add-category.component';
import { DishComponent } from './dish/dish.component';
import { AddDishComponent } from './dish/add-dish.component';
import { OrderComponent } from './order/order.component';
import { AddOrderComponent } from './order/add-order.component';

import { TokenStorage } from './user/token.storage';
import { Interceptor } from './app.interceptor';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ModalComponent } from './common/modal/modal.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RegisterUserComponent,
    CategoryComponent,
    AddCategoryComponent,
    DishComponent,
    AddDishComponent,
    OrderComponent,
    AddOrderComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    Select2Module,
    ModalModule.forRoot(),
    AgGridModule.withComponents([])
  ],
  providers: [UserService, CategoryService, DishService, OrderService, TokenStorage, {
        provide: HTTP_INTERCEPTORS,
        useClass: Interceptor,
        multi: true,
    }, BsModalService],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent]
})
export class AppModule { }
