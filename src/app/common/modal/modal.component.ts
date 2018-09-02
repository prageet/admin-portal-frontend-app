import { Component, TemplateRef, Input } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Order } from '../../models/order.model';
import { Subject } from 'rxjs/Subject';

@Component({
 	selector: 'modal-component',
 	templateUrl: './modal.component.html'
})

export class ModalComponent {
  
  	public onClose: Subject<boolean>;
  	modalRef: BsModalRef;
  	@Input() order: Order = new Order();
  	@Input() showViewOrderModal: boolean;
  	@Input() showUpdateOrderModal: boolean;
  	@Input() showAddCategoryModal: boolean;
  	@Input() showAddDishModal: boolean;
  	@Input() title: string;
  	
  	constructor(private modalService: BsModalService, private _bsModalRef: BsModalRef) {
  
  	}
  	
  	//select 2 event
  	changed(data: {value: string}) {
  		console.log(data.value);
  		this.dish.categoryId = data.value;
  	}
  
	public ngOnInit(): void {
    	this.onClose = new Subject();
  	}
	
	public onConfirm(): void {
	    this.onClose.next(this.order);
	    this._bsModalRef.hide();
	}
	
	public onCategoryConfirm(): void {
	    this.onClose.next(this.category);
	    this._bsModalRef.hide();
	}
	
	public onDishConfirm(): void {
	    this.onClose.next(this.dish);
	    this._bsModalRef.hide();
	}
	
	public onCancel(): void {
	    this.onClose.next(false);
	    this._bsModalRef.hide();
	}
 
  
}