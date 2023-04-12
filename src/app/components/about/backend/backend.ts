import {Component, Input, OnInit} from '@angular/core'

@Component({
    selector:'backend',
    templateUrl:'backend.html',
    styleUrls:['../about.css']
})
export default class BackendComponent implements OnInit{

@Input() backend:any[]=[]
currentSlide:number = 0  

constructor(){}
    onNextClick(){
        const next = this.currentSlide+1 
        this.currentSlide = next===this.backend.length-1?0:next

    }

    ngOnInit(): void {
        
        setInterval(()=>{
            this.onNextClick()},2000
        )
        
    }
     
}



