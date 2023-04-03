import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http'
import { Injectable, OnInit } from '@angular/core'
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

    /*export class BookFromFile {
        constructor(
            public books:Book[],
            public reviews:Review[]
        ){}
    }*/
@Injectable({
    providedIn:"root"
})
 export class BookService /*implements OnInit*/{
    /*private handleError(error: HttpErrorResponse){
        if(error.status === 0){
            console.error("An error occurred")
        } else {
            console.error(`Backend returned code:${error.status}, body was:`,error.error)}
            return throwError(()=> new Error('So,ething had happened'))
        }    */

    constructor( private http:HttpClient, private authService:AuthService) {}
        /*getProducts(){
            return this.http.get<Book[]>('http://localhost:8000', {responseType:'json'}).pipe(
                map(res=>res)) 
        }*/
            getProductById(bookId:string):Observable<any>{
                return this.http.get<Book>(`https://activities-server-db.herokuapp.com/products/${bookId}`, {responseType:'json'}).pipe(
                map(res=>res))
            }        

            getReviewsForBook(bookId:string):Observable<any[]>{ 
                return this.http.get<Review[]>(`https://activities-server-db.herokuapp.com/products/${bookId}/reviews`, {responseType:'json'}).pipe(
                map(res=>res))
            }

            /*getBooksFromFile(){
                return this.http.get('http://localhost:8000/booksfile', {responseType:'json'}).pipe(
                    map(book=>book),
                    
                )
            }*/

            /*getBooksFromDb1():Observable<any>{
                return this.http.get('https://activities-server-db.herokuapp.com', {responseType:'json'}).pipe(
                map(res=>res))
            }*/

            getBooksFromDb(){
                fetch('https://activities-server-db.herokuapp.com/m')
                .then(response=>{response.json();console.log(response.body)})
                .catch(error=>console.log(error))
                
            }
            
            /*addBookToDb1(value:Book){
                console.log(value)
                fetch('http://localhost:8000/booksFromDb1', {
                method:"POST",
                headers:{"Content-type":"application/json"},
                body:JSON.stringify(value)
            }).then(result=>console.log(result))
            }       */

            addBookToDb(value:Book){
                return this.http.post<Book>('https://activities-server-db.herokuapp.com/booksFromDb1',value,{responseType:'json'})/*.pipe(
                    catchError(this.handleError('addBookToDb1',value));
                    )*/
                }

               /*getBooksFromDb2(){
                return this.http.get('http://localhost:8000/m').pipe(map(res=>res))
                }*/
                
                addReviewsToDb(bookId:string,value:Review, rating:number):Observable<Review[]>{
                    const tok = this.authService.getToken()
                    const headerd = {
                        'Authorization':`Bearer ${tok}`/*eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE1ZGMwYWUyZmExYWZjYjdkZjEwYTYiLCJlbWFpbCI6ImFsZXhleTExQGNvbSIsIm5hbWUiOiJBbGV4ZXkxMSIsImV4cCI6MTY3OTc1OTQ3OSwiaWF0IjoxNjc5MTU0Njc5fQ.Jpszvl2J5jHssMAOIvDQoDijXCswzDnpRMgyt6j_MnU'*/,
                        'Access-Control-Allow-Headers':'Content-Type',
                        'Content-Type':'application/json'
                    }
                    const requestOption = {headers: new HttpHeaders(headerd)
                    }
                    return this.http.post<Review[]>(`https://activities-server-db.herokuapp.com/products/${bookId}/addReview`, /*{*/value/*,rating:rating}*/, requestOption/* ,{responseType:'json'}*/)
                }

                updateRating1(bookId:string, rating:number){
                    //return this.http.put(`http://localhost:/8000/products/${bookId}/addReview/updateRating`, {rating:rating}/*, {responseType:'json'}*/)
                    fetch(`http://localhost:8000/products/${bookId}/addReview/updateRating`,{
                        method:"PUT",
                        headers:{
                            "Content-Type":"application/json"},
                        body:JSON.stringify({rating:rating})
                    }).then(result=>console.log(result))
                }

                updateRating(bookId:string, rating:number){
                    //return this.http.put(`http://localhost:/8000/products/${bookId}/addReview/updateRating`, {rating:rating}/*, {responseType:'json'}*/)
                   return this.http.put(`https://activities-server-db.herokuapp.com/products/${bookId}/addReview/updateRating`,{rating:rating}, {responseType:'json'}).subscribe(value=>console.log(value))
            }
    }
            




    
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