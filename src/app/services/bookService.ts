import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http'
import { Injectable, OnInit } from '@angular/core'
import {Observable, throwError} from 'rxjs'
import {map,catchError} from 'rxjs/operators'
import { AuthService } from './auth.service'
//const request = require('request')
/*class Book {
    constructor(

    )
}*/
export class Book /*(id, authors,title,year, pictureUrl,category, price, rating)*/ {
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
           //public id: number,
           public bookId:string,
           public author:string,
           public rating:number,
           public reviewText:string,
           public createdOn:Date){}
    }

    export class BookFromFile {
        constructor(
            public books:Book[],
            public reviews:Review[]
        ){}
    }
@Injectable({
    providedIn:"root"
})
 export class BookService /*implements OnInit*/{
    private handleError(error: HttpErrorResponse){
        if(error.status === 0){
            console.error("An error occurred")
        } else {
            console.error(`Backend returned code:${error.status}, body was:`,error.error)}
            return throwError(()=> new Error('So,ething had happened'))
        }            //books:any//[]=[]
    //reviews:any[]=[]
    //getProducts//:Observable<any>
    //getReviews
    /*getReviewById(bookId:string){
        return this.reviews.filter(r=>r.bookId === bookId)}*/
        constructor( private http:HttpClient, private authService:AuthService) {}
            /*getProducts(){
                return this.http.get<Book[]>('http://localhost:8000', {responseType:'json'}).pipe(
                map(res=>res)) 
            }*/
            getProductById(bookId:string):Observable<any>{
                return this.http.get(`http://localhost:8000/products/${bookId}`, {responseType:'json'}).pipe(
                map(res=>res))
            }                    
            getReviewsForBook(bookId:string):Observable<any[]>{ 
                return this.http.get<Review[]>(`http://localhost:8000/products/${bookId}/reviews`, {responseType:'json'}).pipe(
                map(res=>res)/*,
                map(reviews=>reviews/*.map(r=>r/*new Review(r.id, r.bookId,r.timestamp,r.user, r.rating, r.comment)*//*))*/
            )
            }
            getBooksFromFile(){
                return this.http.get</*Book[]*/BookFromFile>('http://localhost:8000/booksfile', {responseType:'json'}).pipe(
                    map(book=>book),
                    
                )
            }

            getBooksFromDb():Observable<any>{
                return this.http.get<BookFromFile>('http://localhost:8000', {responseType:'json'}).pipe(
                    map(res=>res))
            }

            getBooksFomDb1(){
                fetch('http:/localhost:8000/m')
                .then(response=>response.json)
                /*.then(data=>dataa*/.catch(error=>console.log(error))
                
            }
            
            addBookToDb(value:Book)/*:Observable<Book>*/{
                console.log(value)
                /*return this.http.get*/fetch('http://localhost:8000/booksFromDb1', {
                method:"POST",
                headers:{"Content-type":"application/json"},
                body:JSON.stringify(value)
            }/*, {responseType:'json'}*/)/* JSON.stringify(value))/*.pipe(
                        catchError(Error)*///.then(response=>response.json()).
                        .then(result=>console.log(result)/*;console.log(response)*/)
                //)
            }        
            addBookToDb1(value:Book){
                return this.http.post('http://localhost:8000/booksFromDb1',value,{responseType:'json'})/*.pipe(
                    catchError(this.handleError('addBookToDb1',value));
                    )*/
                }
               getBooksFromDb2(){
                return this.http.get('http://localhost:8000/m').pipe(map(res=>res))
                }
                
                addReviewsToDb(bookId:string,value:Review){
                    const tok = this.authService.getToken()
                    const headerd = {
                        'Authorization':`Bearer ${tok}`/*eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE1ZGMwYWUyZmExYWZjYjdkZjEwYTYiLCJlbWFpbCI6ImFsZXhleTExQGNvbSIsIm5hbWUiOiJBbGV4ZXkxMSIsImV4cCI6MTY3OTc1OTQ3OSwiaWF0IjoxNjc5MTU0Njc5fQ.Jpszvl2J5jHssMAOIvDQoDijXCswzDnpRMgyt6j_MnU'*/,
                        'Access-Control-Allow-Headers':'Content-Type',
                        'Content-Type':'application/json'
                    }
                    const requestOption = {headers: new HttpHeaders(headerd)
                    }
                    
                    return this.http.post(`http://localhost:8000/products/${bookId}/addReview`, value, requestOption/*,{responseType:'json'}*/)
                }

                updateRating(bookId:string, rating:number){
                    //return this.http.put(`http://localhost:/8000/products/${bookId}/addReview/updateRating`, {rating:rating}/*, {responseType:'json'}*/)
                    fetch(`http://localhost:8000/products/${bookId}/addReview/updateRating`,{
                        method:"PUT",
                        headers:{
                            "Content-Type":"application/json"},
                        body:JSON.stringify({rating:rating})
                    }).then(result=>console.log(result))
                }
                
            }
            
    //}P
    
                
            //}
        /*ngOnInit(){
            this.getProducts.subscribe((data:Observable<any>[])=>this.books=data)
            console.log(this.books)
        }
       /* getProducts():Book[]{
             return books.map

        } */
  //}
  

 /* "paths":{
    "crypto":["./node_modules/crypto-browserify"],
     "util":["./node_modules/util-browserify"],
     "url" :["./node_modules/url"],
     "http":["./node_modules/stream-http"],
     "https":["./node_modules/https-browserify"],
     "assert":["./node_modules/assert"],
     "querystring":["./node_modules/querystring-es3"],
     "path":["./node_modules/path-browserify"],
     "stream":["./node_modules/stream-browserify"],
     "zlib":["./node_modules/browserify-zlib"],
     "fs":["./node_modules/browserify-fs"],
     "net":["./node_modules/net-browserify"],
     "tls":["./node_modules/tls-browserify"],
     "timers":["./node_modules/timers-browserify"]
   }*/