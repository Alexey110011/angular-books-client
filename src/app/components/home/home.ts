import {Component} from '@angular/core'
import {BookService} from '../../services/bookService'
import {debounceTime} from 'rxjs/operators'
import { FormControl } from '@angular/forms'

@Component({
    selector:'home',
    styleUrls:["home.css"],
    templateUrl:'home.html'
})
    
export default class HomeComponent{
isSearchFormHidden:boolean = false
books:any
titleFilter:FormControl = new FormControl()
filterCriteria:string =''

onSubmit(formValue:any) {
    console.log(formValue)
}
clearLocal(){
    localStorage.clear()
}

constructor(private bookService:BookService){
    this.bookService.getBooksFromDb
    /*.subscribe(
        {next:value=>this.books = value,
        error:error=>console.log(error),
        complete:()=>console.log('Done')}
    )*/

    this.titleFilter.valueChanges.pipe(
        debounceTime(100))
        .subscribe(
            {next:value => {this.filterCriteria = value;console.log(value)},
            error:error=>console.error(error),
            complete:()=>console.log('Done')}
            )
    }
}
