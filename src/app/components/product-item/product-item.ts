import {Component, Input} from '@angular/core';
//import { BookService } from '../../services/bookService';
@Component({
  selector: 'auction-product-item',
  styleUrls:['product-item.css'],
  templateUrl: 'product-item.html',
  })
export default class ProductItemComponent {
  
  @Input() book: any//Product;
 
}