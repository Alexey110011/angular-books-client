import {Component} from "@angular/core"
import { FormControl, FormGroup, FormArray, Validators } from "@angular/forms"
import { BookService } from "src/app/services/bookService";

@Component({
    selector:'newform',
    templateUrl:"form.html"
})

export default class FormComponent{

categories = ['frontend', 'backend', 'fullstack']
formModel:FormGroup;
formNotCompleted:boolean= true 
rest:number=500

constructor(private bookService:BookService){
    this.formModel = new FormGroup({
        'authors':new FormControl('', Validators.required),
        'title':new FormControl('', Validators.required),
        'description':new FormControl('',Validators.maxLength(500)),
        'year':new FormControl(),
        'pictureUrl':new FormControl(),
        'category':new FormControl(''),
        'price':new FormControl('',Validators.required),
        'shops':new FormControl('', Validators.required)
    })
}
onSubmit(){
    if(this.formModel.status==='VALID'){
       this.formNotCompleted = true
        console.log(this.formModel.value)
        this.bookService.addBookToDb(this.formModel.value).subscribe(
        value=>console.log(value))
        } else {
    this.formNotCompleted = false;
    }
}

checkLocal(){
    console.log(localStorage)
}
clearLocal(){
    localStorage.clear()
}
calculateLength(){
    this.rest = 50-this.formModel.value.description.length
    console.log(this.rest)
}
}
