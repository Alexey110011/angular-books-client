import { Component,OnInit} from "@angular/core";
import {AuthService} from '../../services/auth.service'
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";


@Component({
    selector:'app-login',
    templateUrl:'login.html',
    //providers:[AuthService]
})

export class LoginComponent implements OnInit {
    isAuthenticated:boolean = false;
    notAuthenticated:null | boolean = null
    /*userEmail:string='';
    userPassword:string='';*/
    returnUrl:string='';
    formModel:FormGroup;
    constructor(private authService:AuthService, private router:Router, private route:ActivatedRoute, private activatedRoute:ActivatedRoute) {
        this.formModel = new FormGroup({
            'email':new FormControl('', Validators.required),
            'password':new FormControl('', Validators.required)
        })        
    }

    ngOnInit(): void {
        this.authService.notAuthenticatedEmitter.subscribe(value=>{console.log(value);this.notAuthenticated= value})
        /*this.returnUrl = this.route.snapshot.queryParams['returnUrl'] ||[ '/']
        console.log(this.returnUrl)*/
        }
    //}

    onSubmit(){
        console.log(this.formModel.value)
            this.authService.login(this.formModel.value)
           /*if(this.notAuthenticated){
                this.isAuthenticated = true
            }
            console.log(this.isAuthenticated)
            
            /*if(this.notAuthenticated !== null&&this.notAuthenticated!==true){
            this.router.navigate(['/'])
        }*/
    }
       
    checkLocal(){
        console.log(localStorage)
    }
    
        /*login(){
          this.authService.isAuthenticated()
          this.router.navigate([this.returnUrl])
        }*/
    }
//}