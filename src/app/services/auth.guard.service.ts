import {Injectable} from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot/*, UrlTree*/} from '@angular/router'
import { Observable } from 'rxjs'
import { AuthService } from './auth.service'

@Injectable({
    providedIn:'root'
})

export class AuthGuardService implements CanActivate{

    constructor (private authService:AuthService, private router:Router){}
    canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot) {
        /*let url:string = state.url
        console.log(url)*/
        return this.checkLogin(route, state/*url*/)
        
    }
        checkLogin(route:ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean{
            if(this.authService.isAuthenticated()){
            //this.route.navigate([])
            //this.authService.redirectUrl  = url
            //this.router.navigate([url])
            //this.router.navigate(['/'])
            return true
            }else{
            this.router.navigate(['/login'])/*,{queryParams:{
                return:state.url}
            }*/
            return false
            }
        }    
    }




