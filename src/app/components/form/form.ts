import {Component} from "@angular/core"
import { FormControl, FormGroup, Validators } from "@angular/forms"
import { BookService } from "src/app/services/bookService";

@Component({
    selector:'newform',
    templateUrl:"form.html", 
    styleUrls:['form.css']
})

export default class FormComponent{

categories = ['frontend', 'backend', 'fullstack']
formModel:FormGroup;
formNotCompleted:boolean= true 
rest:number=500
//mayClose:boolean= true
constructor(private bookService:BookService){
    this.formModel = new FormGroup({
        'authors':new FormControl('', [Validators.required, Validators.maxLength(30)]),
        'title':new FormControl('', [Validators.required, Validators.maxLength(75)]),
        'description':new FormControl('',[Validators.maxLength(500), Validators.maxLength(500)]),
        'year':new FormControl(),
        'pictureUrl':new FormControl(),
        'category':new FormControl(''),
        'price':new FormControl('',[Validators.required, Validators.maxLength(7)])/*,
        /*'shops':new FormControl('', Validators.required)*/
    })
}
showLength(){
    console.log(this.formModel.controls['authors'].errors)
}

onSubmit(){
    if(this.formModel.status==='VALID'){
       this.formNotCompleted = true
        console.log(this.formModel.value)
        this.bookService.addBookToDb(this.formModel.value).subscribe(
        value=>console.log(value))
        this.rest = 500
        } else {
    this.formNotCompleted = false;
    }
}

/*checkLocal(){
    console.log(localStorage)
}
clearLocal(){
    localStorage.clear()
}*/
calculateLength(){
    this.rest = 500-this.formModel.value.description.length
    console.log(this.rest)
}
}
