import { Component,OnInit} from "@angular/core";
import {AuthService} from '../../services/auth.service'
import { FormControl, FormGroup, Validators } from "@angular/forms"
@Component({
    selector:'app-login',
    templateUrl:'login.html'
})

export class LoginComponent implements OnInit {
    isAuthenticated:boolean = false;
    notAuthenticated:null | boolean = null
    formModel:FormGroup;
    constructor(private authService:AuthService) {
        this.formModel = new FormGroup({
            'email':new FormControl('', Validators.required),
            'password':new FormControl('', Validators.required)
        })        
    }

    ngOnInit(): void {
        this.authService.notAuthenticatedEmitter.subscribe(value=>{console.log(value);this.notAuthenticated= value})
        }

    onSubmit(){
        console.log(this.formModel.value)
            this.authService.login(this.formModel.value)
    }
       
    checkLocal(){
        console.log(localStorage)
    }
}
