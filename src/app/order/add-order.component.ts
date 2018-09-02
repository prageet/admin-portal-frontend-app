import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Order } from '../models/order.model';
import { OrderService } from './order.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ModalComponent } from '../common/modal/modal.component';


@Component({
  templateUrl: './add-order.component.html'
})
export class AddOrderComponent {

  order: Order = new Order();

  constructor(private router: Router, private orderService: OrderService, private modalService: BsModalService) {

  }
  
  

 /* createOrder(): void {
    this.orderService.createOrder(this.order)
        .subscribe( data => {
          alert("Order created successfully.");
        });

  };*/

  createOrder() {
  		console.log("create order");
  		const initialState = { email: 'prageet'};
       let bsModalRef = this.modalService.show(ModalComponent, {initialState })
       console.log("bsModalRef: "+ bsModalRef);
       bsModalRef.hide();
  }  
}
