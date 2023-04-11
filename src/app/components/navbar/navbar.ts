import {Component} from '@angular/core';
import { SearchService } from 'src/app/services/searchService';
@Component({
  selector: 'books-navbar',
  templateUrl: 'navbar.html',
  styleUrls:['navbar.css']
})

export default class NavbarComponent {
  isToggled:boolean=true
  
  constructor(private searchService:SearchService){}
    get isSearchBarVisible():boolean{
      return this.searchService.isSearchVisible
    }

  toggleFunc(){
    this.isToggled=!this.isToggled
    console.log(this.isToggled)
}
  toggleSearchVisible(){
    this.searchService.toggleSearchVisibility()
    console.log(this.isSearchBarVisible)
  }
}