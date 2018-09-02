import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Order } from '../models/order.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class OrderService {

  constructor(private http:HttpClient) {}

  private orderUrl = 'http://localhost:8080/admin-portal/orders';

  public getOrders() {
    return this.http.get<Order[]>(this.orderUrl);
  }
  
  public getSpecificOrderDetails(order) {
    return this.http.get<Order[]>(this.orderUrl + '/' + order.id);
  }
  

  public deleteOrder(order) {
    return this.http.delete(this.orderUrl + "/"+ order.id);
  }

  public createOrder(order) {
    return this.http.post<Order>(this.orderUrl, order);
  }

  public updateOrder(order) {
    return this.http.put<Order>(this.orderUrl + '/' + order.id, order);
  }
}
