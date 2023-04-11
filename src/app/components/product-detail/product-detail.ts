import { Component, Input, OnInit} from "@angular/core";
import { ActivatedRoute ,Router} from "@angular/router";
import { FormGroup, FormControl, Validators} from "@angular/forms";
import {Book, Review, BookService} from '../../services/bookService'
import HomeComponent from "../home/home";
///import {LoginComponent} from"../login/login"
//import { Observable } from "rxjs";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector:'product-page',
    templateUrl:"product-detail.html", 
    providers:[HomeComponent]
})
export default class BookDetailComponent/* implements OnInit*/{
    
        //books:Book[]
/*books = [
    new Book ('0','Fain Yakov, Moiseev Anton', 'Angular2 Development with TypeScript','A very-very','2017','assets/pictures/async.jpg','Full-stack', 24.99,5, ["Landers", "Beruta"]),
    new Book ('1', 'Simpson Kyle', 'this&Object.prototypes Scopes&Closures','A good-good','2019','assets/pictures/jsbasic.jpg', 'Front_end',45.99,2,["Beruta"]),
    new Book ('2', 'Holmes Simon', 'Getting MEAN with Mongo, Express, Angular, and Node','A nice-nice','2017','assets/pictures/mean.jpg', 'Full-stack',26.99,24,["Beruta"]),
    new Book ('3', 'Simpson Kyle', 'this&Object.prototypes Scopes&Closures','A smart -smart','2019','assets/pictures/css_short.jpg', 'Front_end',45.99,2,["Beruta"])
]*/
//books:Book[]=[]
//book:Book|undefined;
bookId:string/*bookAuthors:string
bookDescription:string
bookPictureUrl:string
bookPrice:string
bookTitle:string
bookYear:string
bookRating:number
reviewconc:Review[]=[]
reviews:any[]=[]*/
/*getBookById(bookId:string){
    return this.books.find(p=>p.id===bookId)
}*/book:any
reviews:Review[]/**/=[]//books:any*/
isReviewHidden:boolean = true//true//reviews:Review[]
formModel: FormGroup;
bookid:any
author:string=''
author1:any
reviewtext:string= ''
createdOn:Date = new Date()
rating:number=0
newRating:number=0////
newComment:string=''
isHidden:boolean = true
isAuthenticate:boolean=false//// //getReview:any
fullLength:number = 500
rest:number=500
ratinChange(event:number){
    this.rating = event
}
/*getReviewConc(bookId:string){
    return this.reviews.filter(r=>r.productId === this.bookId)
    console.log(this.bookId)
}*/calculateLength(){
    this.rest = 500-this.formModel.value.reviewtext.length
    console.log(this.rest)
}
constructor(route:ActivatedRoute, private bookService:BookService, private authService:AuthService, private router:Router ){
    //this.books = this.homeService.books
    this.bookId =  route.snapshot.params['bookId']
    this.formModel = new FormGroup({
        //'author':new FormControl('', Validators.required),
        'rating':new FormControl('', Validators.minLength(1)),
        'reviewtext':new FormControl('', [Validators.required, Validators.maxLength(20)])//,
        //'createdOn':new FormControl()
    }) 

    console.log(this.bookId)
        bookService.getProductById(this.bookId)
        .subscribe(
            {next:book=>{this.book = book; console.log(this.book)},
            error:error=>console.log(error)}
        )

        this.bookService.getReviewsForBook(this.bookId)
        .subscribe(
            {next:reviews=>this.reviews = reviews,
             error:error=>console.log(error)}
        )
    }

        leaveAReview(){
            if(this.authService.isAuthenticated()){
                this.isReviewHidden = !this.isReviewHidden
            } else {
                this.router.navigate(['/login'])
            }
            console.log(this.author)
        }
    
    addReview(){
        this.bookid = this.bookId
        //this.rating = this.formModel.value.rating
        this.reviewtext= this.formModel.value.reviewtext
        this.createdOn = new Date()
        this.bookService.addReviewsToDb(this.bookid,this.formModel.value, this.rating)
            .subscribe(value=>{this.reviews.push(value[0]);console.log(value,this.reviews.length);
                this.book.rating = this.averageRating(this.reviews)
                console.log('This book rating',this.reviews.length,this.book.rating, this.rating)
                this.bookService.updateRating(this.bookid,this.book.rating) 
                //this.resetForm()   
        })
            this.resetForm() 
    }
    setRating(){
        this.bookService.updateRating(this.bookid,5/*this.book.rating*/)/*.subscribe(
        {next:value=>console.log(value),
        error:error=> console.error(error)})*/
    }

    /*onSubmit(){
        //this.isReviewHidden=!this.isReviewHidden
        //console.log(this.isAuthenticate)//let review = new Review(0, this.book.id, new Date(), 'Anonymous', this.newRating, this.newComment)
        this.bookService.addReviewsToDb(this.bookid,this.formModel.value).subscribe(value=>{this.reviews.push(value);console.log(value)})
        //this.reviews = [...this.reviews, review]
        console.log(this.formModel.value)
        this.book.rating = this.averageRating(this.reviews)
        this.resetForm() 
    }*/
    averageRating(reviews:Review[]){
        let sum  = reviews.reduce((average, review)=>average+Number(review.rating),0)
        console.log(sum)
        console.log(sum/reviews.length)
        return Math.round((sum/reviews.length)*10/10).toFixed(1)/*Math.floor(sum/reviews.length)*/
    }
    resetForm(){
        this.newRating/*rating*/ = 0;
        this./*newComment*/reviewtext = '';
        this.isReviewHidden = true
    }
    how(){
        this.isAuthenticate = this.authService.isAuthenticated()
        {this.isHidden =this.isAuthenticate}
        console.log(this.isHidden,localStorage)
    }
    }

