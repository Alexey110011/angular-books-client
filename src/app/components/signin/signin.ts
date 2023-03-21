import { Component,OnInit } from "@angular/core";
import {AuthService} from '../../services/auth.service'
import { Router ,ActivatedRoute} from "@angular/router";
import { response } from "express";
import { FormControl, FormGroup, Validators,ValidatorFn, ValidationErrors, AbstractControl,FormBuilder } from "@angular/forms";
import { NgSwitchDefault } from "@angular/common";

/*function forbiddenNameValidation(control:FormControl, forbidden:string){
    const value = control.value ||''
    const valid = (value===forbidden)?false:true
    return valid?null:{forbiddenName:true}
}*/

@Component({
    selector:'app-signin',
    templateUrl:'signin.html',
    //providers:[AuthService]
})

export class SigninComponent implements OnInit {
    userEmail:string='';
    userPassword:string=''
    formModel:FormGroup;
    formModel1:FormControl = new FormControl('');
    targetName:string=''
    targetEmail:string = ''
    target:string='';
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

    shouldBeEqualTo = 'a'
    reactiveForm:FormGroup;
    getCustomValidator(){
        return(c:AbstractControl):{[key:string]:any}|null=>{
            if(c.value!==this.shouldBeEqualTo){
                return {valid:false};
            } return null
            }
        }
    changeToB(){
        this.shouldBeEqualTo = 'b'
        console.log(this.reactiveForm/*.get('input')*/)
    }


    forbiddenNameValidator()/*:ValidatorFn*/{
        return (control:AbstractControl):{[key:string]:any}|null/*ValidationErrors | null*/=>{
            //const value = control.value;
            if(control.value == this.forbiddenName){
                return {valid:false}
            }return null
        }
            //onsole.log(this.forbidden, control.value,valid)
            //return valid?null:{forbiddenName:true}
        }
    //}
       /* forbiddenNameValidator1(){
        return (control:AbstractControl):ValidationErrors|null=>{
        const value = control.value ||''
        const valid =(value!==this.forbidden)?true:false
        return valid?null:{forbiddenName:true}
    }
}*/checkInput(value:string)
    {console.log(value)
    this.authService.checkRegExp(value).subscribe(value=>value)
}

    constructor(private authService:AuthService, private router:Router, private route:ActivatedRoute,private fb:FormBuilder) {
        this.formModel = this.fb.group({
            'name':['', [Validators.required/*, this.forbiddenNameValidator()*/]],
            'email':['', Validators.required],
            'password':['', Validators.required]
        }/*, {validator:this.forbiddenNameValidator()}*/)

        this.reactiveForm = this.fb.group
        ({input:'a'}, {validator:this.getCustomValidator()})

         this.formModel1.valueChanges
         .subscribe(value=>this.checkInput(value))
    }
        
        
        /*this.formModel = new FormGroup({
            'name':new FormControl('', [Validators.required]),
            'email':new FormControl('', [Validators.required, Validators.email]),
            'password':new FormControl('', Validators.required)
        })*/
        
    //}
    onSubmit(){
        //this.checkUserByName()
        console.log(this.forbiddenName,this.forbiddenEmail,this.formModel.status)
        if(this.forbiddenName ==''&&this.forbiddenEmail==''&&this.formModel.status==="VALID"/*this.formModel.valid*/){
        console.log(this.formModel.value)
        this.authService.register(this.formModel.value)
        if(this.authService.isAuthenticated()){
            this.router.navigate([this.returnUrl]) }
    } else{
        alert("something wrong!")
    }
        //this.checkUser(this.formModel.value.name)
    }
    checkLocal(){
        console.log(localStorage)
    }
    checkUserByName(){
        /*this.authService.checkUserByName(this.formModel.value.name).subscribe(
            {next:value=>{if(Array.isArray(value)&&value.length>0){console.log(`User array already exists!`, value.length);
            this.nameAlreadyExists = true
            this.forbiddenName=value[0].name;
            console.log(this.nameAlreadyExists, this.forbiddenName)
            }else{console.log('Okay');
            this.nameAlreadyExists = false;
            this.forbiddenName =''}},
            error: error=> console.log(error)}
        )*/if(!this.regexpName){this.isTargetName=false}
    }
    
    checkUserByEmail(){
        /*this.authService.checkUserByEmail(this.formModel.value.email).subscribe(
            {next:value=>{if(Array.isArray(value)&&value.length>0){console.log(`This email is already used!`, value.length);
            this.emailAlreadyExists = true//this.alreadyExists
            this.forbiddenEmail=value[0].email;
            console.log(this.emailAlreadyExists, this.forbiddenEmail)
            //this.forbiddenNameValidator()
            }else{console.log('Okay');
            this.emailAlreadyExists = false;
            this.forbiddenEmail =''}},
            error: error=> console.log(error)}
        )*/if(!this.regexpEmail){this.isTargetEmail =false}
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
        error:error=>console.log(error)
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
        error:error=>console.log(error)
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
        error:error=>console.log(error)
    })
}

    ngOnInit(): void {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] ||[ '/']
        console.log(this.returnUrl)
    }
       
        login(){
            
            this.authService./*register(this.formModel.value)//*/validate(this.userEmail, this.userPassword)
            .subscribe(
                {next:(response)=>{
                    this.authService.setUserInfo(response);console.log(this.formModel.value)
                    this.router.navigate(['forms'])
                    },
                error:error=>console.log(error)
         })
          }
}