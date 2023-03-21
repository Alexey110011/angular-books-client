import {Component, Input} from '@angular/core';
//import {Product} from '../services/product-service';
//import StarsComponent from '../stars/stars'
import { BookService } from '../../services/bookService';
@Component({
  selector: 'auction-product-item',
  styleUrls:['product-item.css'],
  templateUrl: 'product-item.html',
  /*providers:[BookService]*/
})
export default class ProductItemComponent {
  
  @Input() book: any//Product;
  /*books:any[]=[]
  constructor(private bookService:BookService){
  this.books = bookService.books
}*/
}