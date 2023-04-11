import {Component, Input, OnInit} from '@angular/core'

@Component({
    selector:'fullstack',
    templateUrl:'fullstack.html',
    styleUrls:['../about.css']
})
export default class FullstackComponent implements OnInit{

@Input() fullstack:any[]=[]
currentSlide:number = 0  

constructor(){}

    /*onPreviousClick(){
        const previous = this.currentSlide-1 
        this.currentSlide = previous<0?this.fullstack.length-1:previous

    }*/
    onNextClick(){
        const next = this.currentSlide+1 
        this.currentSlide = next===this.fullstack.length-1?0:next

    }

    ngOnInit(): void {
        
        setInterval(()=>{
            this.onNextClick()},2000
        )
        
    }
    
    /*goToSlide(slideIndex:number){
        this.currentSlide = slideIndex
    }*/
}