import { Component, Input, OnInit} from "@angular/core";
import { ActivatedRoute ,Router} from "@angular/router";
import { FormGroup, FormControl, Validators} from "@angular/forms";
import {Book, Review, BookService} from '../../services/bookService'
import HomeComponent from "../home/home";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector:'product-page',
    templateUrl:"product-detail.html", 
    providers:[HomeComponent]
})
export default class BookDetailComponent{
            
bookId:string
book:any
reviews:Review[]=[]
isReviewHidden:boolean = true
formModel: FormGroup;
bookid:any
author:string=''
author1:any
reviewtext:string= ''
createdOn:Date = new Date()
rating:number=0
newRating:number=0
newComment:string=''
isHidden:boolean = true
isAuthenticate:boolean=false
fullLength:number = 500
rest:number=500
ratinChange(event:number){
    this.rating = event
}
calculateLength(){
    this.rest = 500-this.formModel.value.reviewtext.length
    console.log(this.rest)
}
constructor(route:ActivatedRoute, private bookService:BookService, private authService:AuthService, private router:Router ){
    
    this.bookId =  route.snapshot.params['bookId']
    this.formModel = new FormGroup({
        'rating':new FormControl('', Validators.minLength(1)),
        'reviewtext':new FormControl('', [Validators.required, Validators.maxLength(500)])//,
    }) 

    console.log(this.bookId)
        bookService.getProductById(this.bookId)
        .subscribe(
            {next:book=>{this.book = book; console.log(this.book)},
            error:error=>console.log(error),
            complete:()=>console.log('Done')}
        )

        this.bookService.getReviewsForBook(this.bookId)
        .subscribe(
            {next:reviews=>this.reviews = reviews,
             error:error=>console.log(error),
             complete:()=>console.log('Done')}
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
        this.reviewtext= this.formModel.value.reviewtext
        this.createdOn = new Date()
        this.bookService.addReviewsToDb(this.bookid,this.formModel.value, this.rating)
            .subscribe({next:value=>{this.reviews.push(value[0]);console.log(value,this.reviews.length);
                this.book.rating = this.averageRating(this.reviews)
                console.log('This book rating',this.reviews.length,this.book.rating, this.rating)
                this.bookService.updateRating(this.bookid,this.book.rating) 
                    },
                    error:error=>console.error(error),
                    complete:()=>console.log('Done')})

            this.resetForm() 
    }
   
    averageRating(reviews:Review[]){
        let sum  = reviews.reduce((average, review)=>average+Number(review.rating),0)
        console.log(sum)
        console.log(sum/reviews.length)
        return Math.round((sum/reviews.length)*10/10).toFixed(1)
    }

    resetForm(){
        this.newRating = 0;
        this.reviewtext = '';
        this.isReviewHidden = true
    }
}

