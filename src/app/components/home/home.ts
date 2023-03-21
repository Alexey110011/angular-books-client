import {Component} from '@angular/core'
import {BookService} from '../../services/bookService'
import {debounceTime} from 'rxjs/operators'
import { FormControl } from '@angular/forms'
import { FilterPipe } from '../filter-pipe/filter'

@Component({
    selector:"home",
    styleUrls:['/home.css'],
    template:`
        <div class = "row-carousel-holder">
            <div class = "col-md-12">
              
            </div>
            
        </div>
        <div class ="row">
            <div class = "col-xs-6 col-sm-4  col-md-4"> 
                <div class= "form-group">
                    <select type ="text" class = "form-control" #slc>
                        <option name = "search">Search by...</option>
                        <option name = "authors">authors</option>
                        <option name = "title" >title</option>
                        <option name = "category">category</option>
                    </select>
                    <input placeholder ="Search..." type ="text" class = "form-control" [formControl] = "titleFilter">
                </div>  
            </div>
        </div>
            
                        
        <div class = "row">
            <div *ngFor = "let book of books | filter : slc.value:filterCriteria" class = "col-sm-4 col-lg-4 col-md-4" >
                <auction-product-item [book] ="book"></auction-product-item>
            </div><button (click) = "clearLocal()">Clear Local"</button>
        </div>`
          })
    
export default class HomeComponent{
   
books:any
onSubmit(formValue:any) {
    console.log(formValue)
}
clearLocal(){
    localStorage.clear()
}
titleFilter:FormControl = new FormControl()
filterCriteria:string =''
constructor(private bookService:BookService){
    /*this.getProducts = this.http.get<Observable<any[]>>('http://localhost:8000', {responseType:"json"})
    .pipe(map(res=>res))*/
    /*this.bookService.getProducts()
    .subscribe({next:books=>this.books=books, error:error=>console.log(error)})*/
    //console.log(this.books)
    this.titleFilter.valueChanges.pipe(
     debounceTime(100))
    .subscribe(
        {next:value => this.filterCriteria = value,
        error:error=>console.error(error)})
    
    /*this.bookService.getBooksFromFile()
        .subscribe(
            {next:value=>this.books = value.books,
            error:error=>console.log(error)}
        )
        console.log(this.books)
    
*/        this.bookService.getBooksFromDb()
        .subscribe(
            {next:value=>this.books = value,
            error:error=>console.log(error),
            complete:()=>console.log('Done')}
        )
        //console.log(this.books)

        /*this.bookService.getBooksFromDb2()
.subscribe(
    {next:value=>this.books = value,
    error:error=>console.log(error),
    complete:()=>console.log('Done')}
)
console.log(this.books)
    }*/
    }
}
/*ngOnInit(){
    this.bookService.getProducts
    .subscribe(
        {next:(result:Observable<any>)=> {
        this.books=(result)
        },
        error: error=> console.log(error)}
    )
    //console.log(this.books)//this.books = this.bookService.getProducts
}
*/
//books//getProducts.subscribe(data=>this.books = data)
    //console.log(books)
//}
//}
/*<option ngModel name = "authors">Authors</option>
<option ngModel name = "Title" >Title</option>
<option ngModel name = "categories">Category"</option>*/