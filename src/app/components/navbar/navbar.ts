import {Component} from '@angular/core';

@Component({
  selector: 'books-navbar',
  templateUrl: 'navbar.html'
})

export default class NavbarComponent {
  toggleFunc(){
    this.isToggled=!this.isToggled
    console.log(this.isToggled)
}
isToggled:boolean=true
}