import { ViewEncapsulation } from '@angular/core';
import { Component } from '@angular/core';
//import NavbarComponent from './components/navbar/navbar'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation:ViewEncapsulation.None
  //declarations:[NavbarComponent]
})
export class AppComponent {
  title = 'client_angular_books';
}
