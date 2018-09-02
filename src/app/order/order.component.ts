import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';

import { Order } from '../models/order.model';
import { OrderService } from './order.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ModalComponent } from '../common/modal/modal.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  
  showViewOrderModal: boolean = false;
  showUpdateOrderModal: boolean = false;
  title: string;
  searchTerm: string;
  
  orders: Order[];
  order: Order = new Order();
  public modalRef: BsModalRef;

  constructor(
  	private router: Router,
  	private orderService: OrderService,
  	private modalService: BsModalService
  ){}
  
  ngOnInit() {
    this.orderService.getOrders()
      .subscribe( data => {
        this.orders = data;
      });
    
  };

  /*deleteOrder(order: Order): void {
    this.orderService.deleteOrder(order)
      .subscribe( data => {
        this.orders = this.orders.filter(d => d !== order);
      })
  };*/
  
  viewOrder(order: Order): void {
  	this.showViewOrderModal = true;
    this.orderService.getSpecificOrderDetails(order)
      .subscribe( data => {
        this.order = data;
        console.log("örder is" );
        console.log("view order"+ data.orderDetails);
  		const initialState = { order: data, showViewOrderModal: this.showViewOrderModal, title: "View Order Details"};
        this.modalRef = this.modalService.show(ModalComponent, {initialState })
        this.modalRef.content.onClose.subscribe(result => {
            console.log('results', result);
        })
    })
  };
  
  searchOrder(order: Order): void {
  	console.log("search term is" + this.searchTerm);
  	this.orders = this.orders.filter(d =>_.includes(d,this.searchTerm));
  }
  
  updateOrder(order: Order): void {
    this.showUpdateOrderModal = true;
    this.orderService.getSpecificOrderDetails(order)
      .subscribe( data => {
        this.order = data;
        console.log("örder is" );
        console.log("view order"+ data.orderDetails);
  		const initialState = { order: data, showUpdateOrderModal: this.showUpdateOrderModal, title: "Edit Order Status"};
        this.modalRef = this.modalService.show(ModalComponent, {initialState })
        this.modalRef.content.onClose.subscribe(result => {
            console.log('update order results before service call', result);
            this.orderService.updateOrder(result)
		      .subscribe( data => {
		        this.order = data;
		        console.log('update order results after service call', data);
		        this.orderService.getOrders()
			      .subscribe( data => {
			        this.orders = data;
			      });        
		      })
        })
    })
  };   
}


