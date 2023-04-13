import { Component,OnInit } from "@angular/core";
import {AuthService} from '../../services/auth.service'
import { Router ,ActivatedRoute} from "@angular/router";
import { FormControl, FormGroup, Validators,FormBuilder } from "@angular/forms";
@Component({
    selector:'app-signin',
    templateUrl:'signin.html',
    styleUrls :['signin.css']
})

export class SigninComponent implements OnInit {
    /*userEmail:string='';
    userPassword:string=''*/
    formModel:FormGroup;
    formModel1:FormControl = new FormControl('');
    targetName:string=''
    targetEmail:string = ''
    //target:string='';
    isTargetName:boolean = false
    isTargetEmail:boolean = false
    isTarget:boolean=false
    returnUrl:string = ''
    nameAlreadyExists: boolean = false;
    emailAlreadyExists:boolean = false
    forbiddenName:string=''
    forbiddenEmail:string=''
    regexpName:boolean=false
    regexpEmail:boolean=false
    formNotCompleted:boolean= true
    
   checkInput(value:string)
    {console.log(value)
    this.authService.checkRegExp(value).subscribe(value=>value)
}

    constructor(private authService:AuthService, private router:Router, private route:ActivatedRoute,private fb:FormBuilder) {
        this.formModel = this.fb.group({
            'name':['', [Validators.required]],
            'email':['', Validators.required],
            'password':['', Validators.required]
        })

        this.formModel1.valueChanges
         .subscribe(value=>this.checkInput(value))
    }
        
    onSubmit(){
        console.log(this.forbiddenName,this.forbiddenEmail,this.formModel.status)
        if(this.forbiddenName ==''&&this.forbiddenEmail==''&&this.formModel.status==="VALID"){
        console.log(this.formModel.value)
        this.authService.register(this.formModel.value)
        if(this.authService.isAuthenticated()){
            this.router.navigate([this.returnUrl]) }
        } else {
            this.formNotCompleted = false;
        }
    }    

    checkLocal(){
        console.log(localStorage)
    }
    checkUserByName(){
        if(!this.regexpName){this.isTargetName=false}
    }
    
    checkUserByEmail(){
       if(!this.regexpEmail){this.isTargetEmail =false}
    }

    checkingRegExpName(){
        console.log(this.regexpName)
        this.isTargetName = true
        if(this.formModel.value.name===''){this.isTargetName=false}
    this.authService.checkRegExpName(this.formModel.value.name).subscribe(
        {next:value=>{if(Array.isArray(value)&&value.length>0){
            this.forbiddenName = value[0].name
            this.regexpName=true}
            else{this.regexpName = false;
            this.forbiddenName=''}
        },
        error:error=>console.log(error),
        complete:()=>console.log('Done')
    })
}
    checkingRegExpEmail(){
        console.log(this.regexpEmail)
        this.isTargetEmail = true
        if(this.formModel.value.email===''){this.isTargetEmail=false}
    this.authService.checkRegExpEmail(this.formModel.value.email).subscribe(
        {next:value=>{if(Array.isArray(value)&&value.length>0){
            this.regexpEmail=true
            this.forbiddenEmail = value[0].email}
            else{this.regexpEmail = false
            this.forbiddenEmail=''}
        },
        error:error=>console.log(error),
        complete:()=>console.log('Done')
    })
    }

    checkingRegExp(){
        console.log(this.regexpName)
        this.isTarget = true
        if(this.formModel1.value===''){this.isTarget=false}
    this.authService.checkRegExp(this.formModel1.value).subscribe(
        {next:value=>{if(Array.isArray(value)&&value.length>0){
            this.regexpName=true}
            else{this.regexpName = false}
        },
        error:error=>console.log(error),
        complete:()=>console.log('Done')
    })
}

    ngOnInit(): void {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] ||[ '/']
        console.log(this.returnUrl)
    }
}