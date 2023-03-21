import {Component} from "@angular/core"
import { FormControl, FormGroup, FormArray } from "@angular/forms"
import { BookService } from "src/app/services/bookService";

@Component({
    selector:'newform',
    templateUrl:"form.html"
})

export default class FormComponent{
formModel:FormGroup;
constructor(private bookService:BookService){
    this.formModel = new FormGroup({
        'authors':new FormControl(),
        'title':new FormControl(),
        'description':new FormControl(),
        'year':new FormControl(),
        'pictureUrl':new FormControl(),
        'category':new FormControl(),
        'rating':new FormControl(),
        'price':new FormControl(),
        'shops':new FormControl()/*,*/
        //'sampleFile':new FormControl()
    })
}
onSubmit(){
    console.log(this.formModel.value)
    this.bookService.addBookToDb1(this.formModel.value).subscribe(
        value=>console.log(value))
}
checkLocal(){
    console.log(localStorage)
}
clearLocal(){
    localStorage.clear()
}
}