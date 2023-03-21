import {EventEmitter, Injectable, Output} from'@angular/core'
import {HttpClient} from '@angular/common/http'
//import { Observable } from 'rxjs'
import {Router, Route} from '@angular/router'
import { HttpHeaders } from '@angular/common/http'
/*class User{
    public id:string='';
    public name :string='';
    public email:string='';
    public exp:string=''

}*/
type Token ={
    token:string
}

@Injectable({
    providedIn:'root'
})

export class AuthService{
    token:string=''
    user:any;
    public redirectUrl:string =''
    notAuthenticated:boolean = false
    @Output() notAuthenticatedEmitter:EventEmitter<boolean> = new EventEmitter()

    constructor(private http:HttpClient, private router:Router/*, private route:Route*/){}
    public isAuthenticated():boolean{
        let token = this.getToken()
        if(token){
            let payload = JSON.parse(window.atob(token.split('.')[1]))
            console.log(payload, token);
            return /*true*/ payload.exp>Date.now()/1000
        } else {return false}
    }
       
        public saveToken = function(token:string){
            localStorage['token']=token
        }

        public getToken () {
            return localStorage['token']
        }

        public register(user:any){
            return this.http.post<Token>('http://localhost:8000/register', user).subscribe(
                {next:value=>{this.token = value.token;console.log(this.token);
                this.saveToken(this.token);
                console.log(window.atob(this.token.split('.')[1]));
                
                },              
                error:error=>{console.log(error)}
            });
        }
                
        public login(user:any){
            return this.http.post<Token>('http://localhost:8000/login', user).subscribe(
                {next:value=>{this.token = value.token;console.log(this.token);
                    this.saveToken(this.token);
                    console.log(window.atob(this.token.split('.')[1]));
                    this.notAuthenticated = false
                    this.notAuthenticatedEmitter.emit(this.notAuthenticated);
                    return true},              
                error:error=>{console.log(1,error);
                    this.notAuthenticated = true;
                    this.notAuthenticatedEmitter.emit(this.notAuthenticated);
                    console.log(this.notAuthenticated);
                    return false;}
                }
            ) 
        }
   
    public setUserInfo(user:any){
        let newItem = localStorage.setItem('userInfo',JSON.stringify(user))
        console.log(localStorage)
    }
    public validate (email:string, password:string){
        return this.http.post('/api/authenticate', {'username':email, 'password':password})
    }

    public getUser(){
        return this.http.get('http://localhost:8000/getUser').subscribe(
            {next:value=>console.log(value),
            error: error=> console.log(error)}
        )
    }
    public checkUserByName(name:any){
        return this.http.post('http://localhost:8000/checkUserName', {name:name}/*, {'Content-Type':'application/json'}*/)/*.subscribe(
            {next:value=>{if(Array.isArray(value)&&value.length>0){console.log(`User array already exists!`, value.length)
                          }else{console.log('Okay')}},
                            error: error=> console.log(error)}
        )*/
    }
    public checkUserByEmail(email:any){
        return this.http.post('http://localhost:8000/checkUserEmail', {email:email})
    }

    public checkRegExpName(value:string){
        return this.http.post('http://localhost:8000/checkRegExpName',{reg:value})
    }

    public checkRegExpEmail(value:string){
        return this.http.post('http://localhost:8000/checkRegExpEmail',{reg:value})
    }

    public checkRegExp(value:string){
        return this.http.post('http://localhost:8000/checkRegExp',{reg:value})
    }
    //-------------------------------------------------------------------------------------------
    public getAuthor(){
        const tok = this.getToken()
                    const headerd = {
                        'Authorization':`Bearer ${tok}`/*eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE1ZGMwYWUyZmExYWZjYjdkZjEwYTYiLCJlbWFpbCI6ImFsZXhleTExQGNvbSIsIm5hbWUiOiJBbGV4ZXkxMSIsImV4cCI6MTY3OTc1OTQ3OSwiaWF0IjoxNjc5MTU0Njc5fQ.Jpszvl2J5jHssMAOIvDQoDijXCswzDnpRMgyt6j_MnU'*/,
                        'Access-Control-Allow-Headers':'Content-Type',
                        'Content-Type':'application/json',
                    }
                    const requestOption = {headers: new HttpHeaders(headerd)
                    }
        return this.http.get('http://localhost:8000/getAuthor', requestOption)
    }
}