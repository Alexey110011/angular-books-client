import {Injectable} from '@angular/core'
import {Subject} from 'rxjs'

@Injectable()
export class SearchService{
    isSearchVisible:boolean=false
    searchVisibilityChange:Subject<boolean> = new Subject<boolean>()

    constructor(){
        this.searchVisibilityChange.subscribe(value=>{
            this.isSearchVisible = value
            console.log("Service",this.isSearchVisible)
        })
    }
    toggleSearchVisibility(){
        this.searchVisibilityChange.next(!this.isSearchVisible)
    }
}
