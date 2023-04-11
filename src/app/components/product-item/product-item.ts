import {Component, Input} from '@angular/core';
@Component({
  selector: 'auction-product-item',
  styleUrls:['product-item.css'],
  templateUrl: 'product-item.html',
  })
export default class ProductItemComponent {
  
  @Input() book: any
 
}