import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http'
import { Injectable} from '@angular/core'
import {Observable, throwError} from 'rxjs'
import {map,catchError} from 'rxjs/operators'
import { AuthService } from './auth.service'
export class Book {
    constructor(
        public id:string,
        public authors:string,
        public title:string,
        public description:string,
        public year:string,
        public pictureUrl:string,
        public category:string,
        public price: number,
        public rating:number, 
        public shops:string[]) {}
    }

    export class Review {
        constructor(
           public bookId:string,
           public author:string,
           public rating:number,
           public reviewtext:string,
           public createdOn:Date){}
    }
    @Injectable({
    providedIn:"root"
})
 export class BookService{
   
    constructor( private http:HttpClient, private authService:AuthService) {}
        
            getProductById(bookId:string):Observable<any>{
                return this.http.get<Book>(`https://activities-server-db.herokuapp.com/products/${bookId}`, {responseType:'json'}).pipe(
                map(res=>res))
            }        

            getReviewsForBook(bookId:string):Observable<any[]>{ 
                return this.http.get<Review[]>(`https://activities-server-db.herokuapp.com/products/${bookId}/reviews`, {responseType:'json'}).pipe(
                map(res=>res))
            }

            getBooksFromDb():Observable<any>{
                return this.http.get('https://activities-server-db.herokuapp.com/books', {responseType:'json'}).pipe(
                map(res=>res))
            }

            
            addBookToDb(value:Book){
                return this.http.post<Book>('https://activities-server-db.herokuapp.com/booksFromDb1',value,{responseType:'json'})
                }

            addReviewsToDb(bookId:string,value:Review, rating:number):Observable<Review[]>{
                const tok = this.authService.getToken()
                const headerd = {
                    'Authorization':`Bearer ${tok}`,
                    'Access-Control-Allow-Headers':'Content-Type',
                    'Content-Type':'application/json'
                    }
                const requestOption = {headers: new HttpHeaders(headerd)
                    }
                return this.http.post<Review[]>(`https://activities-server-db.herokuapp.com/products/${bookId}/addReview`, /*{*/value/*,rating:rating}*/, requestOption/* ,{responseType:'json'}*/)
            }

                updateRating(bookId:string, rating:number){
                    return this.http.put(`https://activities-server-db.herokuapp.com/products/${bookId}/addReview/updateRating`,{rating:rating}, {responseType:'json'}).subscribe(value=>console.log(value))
            }
    }
                 