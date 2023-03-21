//import { outputAst } from "@angular/compiler"
import {Component, Input, Output, EventEmitter} from "@angular/core"

@Component({
    selector:"rating-stars",
    templateUrl:"stars.html",
    styles:[`.starrating:{color: #d17581}`]
})

export default class StarsComponent {
//added
    private _rating:number=0
    /*private*/ stars:boolean[]=[]
    private maxStars: number=5
    @Input() readonly:boolean= true
    @Input() get rating():number{
                return this._rating
            }
            set rating (value:number){
                this._rating = value || 0
                this.stars = Array(this.maxStars).fill(true, 0, this.rating)
            }

    @Output() ratingChange:EventEmitter<number> = new EventEmitter() 
    fillStarsWithColor(index:number) {
        if(!this.readonly){
            this.rating = index+1
            this.ratingChange.emit(this.rating)
        }
    }

/* removed( count and number received from ancestor)
    @Input() count:number=5
    @Input() rating:number=0
    stars:boolean[]=[]

    ngOnInit(){
        for( let i=0;i<this.count;i++){
            this.stars.push(i>this.rating)
        }
    }*/
}