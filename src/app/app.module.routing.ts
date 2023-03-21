import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import HomeComponent from './components/home/home';
import NavbarComponent from './components/navbar/navbar';
import ProductItemComponent from './components/product-item/product-item';
import StarsComponent from './components/stars/stars';
import BookDetailComponent from './components/product-detail/product-detail'
import FormComponent from './components/form/form'
import {LoginComponent} from './components/login/login'
import { BookService } from './services/bookService';
import { AuthGuardService as AuthGuard} from './services/auth.guard.service';
import { HashLocationStrategy } from '@angular/common';
import {FormsModule,ReactiveFormsModule} from "@angular/forms"
import { FilterPipe } from './components/filter-pipe/filter';
import { compileClassMetadata } from '@angular/compiler';

const routes:Routes =[
    {path:'', component:HomeComponent},
    {path:'/products/:bookId', component:BookDetailComponent},
    {path:'/forms', component:FormComponent, canActivate:[AuthGuard]},
    {path:'login',component:LoginComponent}
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports:[
    RouterModule]
})
export class AppRoutingModule { }
