import {Injectable} from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router'
import { AuthService } from './auth.service'

@Injectable({
    providedIn:'root'
})

export class AuthGuardService implements CanActivate{
    
    constructor (private authService:AuthService, private router:Router){}
    canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot) {
        let url:string = state.url
        console.log(url)
        return this.checkLogin(url)
        
    }
        checkLogin(url:string):boolean{
            if(this.authService.isAuthenticated()){
                return true
            }else{
                this.router.navigate(['/login'],{queryParams:{returnUrl:url}})
                return false
            }
        }    
    }




