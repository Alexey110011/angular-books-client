import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
//import {NgbModule} from '@ng-bootstrap/ng-bootstrap'

import { AppComponent } from './app.component';
import HomeComponent from './components/home/home';
import NavbarComponent from './components/navbar/navbar';
import ProductItemComponent from './components/product-item/product-item';
import StarsComponent from './components/stars/stars';
import BookDetailComponent from './components/product-detail/product-detail'
import FormComponent from './components/form/form'
import {LoginComponent} from './components/login/login'
import {SigninComponent} from './components/signin/signin'
import { BookService } from './services/bookService';
import {AuthService} from './services/auth.service'
import { RouterModule } from '@angular/router';
import { HashLocationStrategy } from '@angular/common';
import {FormsModule,ReactiveFormsModule} from "@angular/forms"
import { FilterPipe } from './components/filter-pipe/filter';
import { AuthGuardService as AuthGuard} from './services/auth.guard.service';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductItemComponent,
    StarsComponent,
    BookDetailComponent,
    FilterPipe,
    FormComponent,
    LoginComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    //NgbModule,
    /*AppRoutingModule/**/RouterModule.forRoot([
        {path:'', component:HomeComponent},
        {path:'products/:bookId'/*:bookAuthors/:bookDescription/:bookPictureUrl/:bookPrice/:bookTitle/:bookYear/:bookRating'*/,component:BookDetailComponent},
        {path:'forms', component:FormComponent, canActivate:[AuthGuard]},
        {path:'login',component:LoginComponent},
        {path:'signin', component:SigninComponent}
    ]),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [BookService, AuthService,HomeComponent,{provide:Location, useClass:HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
