import {Component, Input, OnInit} from '@angular/core'
import {BookService} from '../../services/bookService'
/*import {trigger, state, style, animate, transition, keyframes, useAnimation} from '@angular/animations'
import { fadeIn, fadeOut, perspect } from '../slider/animations'

const animationSchema = (totalTime:number)=>{
    return trigger('slide',[
        state('initial', style({
            transform:'translate(0px)'
        })),
        state('up', style({
            transform:'translateY(-600px)'
        })),
        state('up', style({
            transform:'translateX(-200px)'
        })),
        state('left',style({
           transform:'translateY(600px)'
        })), 
        state('right', style({
            transform:'translateX(200px)'
        })),
        transition('initial=>up', animate(`(${(totalTime/600)*600}ms`)),
        transition('up=>left', animate(`(${(totalTime/600)*200}ms`)),
        transition('lrft=>down', animate(`(${(totalTime/600)*600}ms`)),
        transition('down=>right', animate(`(${(totalTime/600)*200}ms`))
    ])
}*/


@Component({
    selector:'about',
    //styleUrls:["about.css"],
    templateUrl:'about.html',
    styleUrls:['about.css']/*
    animations: [
        trigger('slide',[
            state('initial', style({
                transform:'translate(0px)'
            })),
            state('up', style({
                transform:'translateY(-600px)'
            })),
            state('left', style({
                transform:'translateX(-200px)'
            })),
            state('down',style({
                transform:'translateY(600px)'
        
            })), 
            state('right', style({
                transform:'translateX(200px)'
            })),
            transition('initial=>up', [animate('{{timing}}ms')]),
            transition('up=>left', [animate('{{timing1}}ms')]),
            transition('left=>down', [animate('{{timing}}ms')]),
            transition('down=>right', [animate('{{timing1}}ms')])
        ])
    ]*//*
    animations:[
        trigger('slidek', [
            transition(':enter',[
            animate("{{totalTime}}s",keyframes([
                style({transform:'translate(0px)',offset:0}),
                style({transform:'translate(0px, -300px)', offset:0.1667}),
                style({transform:'(translate(-220px, -300px)', offset:0.3}),
                style({transform:'translate(-220px, 600px)', offset:0.5}),
                style({transform:'translate(0px, 600px)', offset:0.6222}),
                style({transform:'translate(0px)', offset:1})
                ]))
            ])
        ])
    ],animations:[
            trigger('slidek', [
                transition('void=>*', [useAnimation(fadeIn,{params:{time:'300ms'}})]),
                transition('*=>void', [useAnimation(fadeOut,{params:{time:'300ms'}})])
            ]),
            trigger('perspect',[
                state('open',style({transform:'scale(1)'})),
                state('closed', style({transform:'scale(3)'}))
            ,
                transition('open=>closed',/*[useAnimation(perspect, {params:{time:'5000ms'}}animate('3000ms'/*, keyframes([
                    style({transform:'scale(1)', offset:0}),style({transform:'scale(3)',offset:1}))
                ])//))]) 
            ]*/
        
})

export default class AboutComponent implements OnInit{

@Input() books:any[]=[]
frontend:any
backend:any
fullstack:any
currentSlide:number = 0  
/*shops=['assets/shops/academknyga.jpg',
        'assets/shops/beruta.jpg ',
        'assets/shops/beruta2.jpg',
        'assets/shops/kyibyshava.jpg',
        'assets/shops/bukinist.jpg',
        'assets/shops/centre.jpg',
        'assets/shops/centre2.jpg']
        
gett(){
    console.log(this.books.length,this.frontend, this.backend, this.fullstack)
}*/

constructor(private bookService:BookService){
    this.bookService.getBooksFromDb()
    .subscribe(
        {next:value=>{this.books = value;
            this.frontend = this.books.filter(item=>item.category === "frontend")
            this.backend = this.books.filter(item=>item.category === "backend")
            this.fullstack = this.books.filter(item=>item.category === "fullstack");
            /*console.log(this.frontend,this.backend, this.fullstack)*/},
        error:error=>console.log(error),
        complete:()=>console.log('Done')}
    )
    }
    onPreviousClick(){
        const previous = this.currentSlide-1 
        this.currentSlide = previous<0?this.books.length-1:previous

    }
    onNextClick(){
        const next = this.currentSlide+1 
        this.currentSlide = next===this.books.length-1?0:next

    }

    ngOnInit(): void {
    
        setInterval(()=>{
            this.onNextClick()},2000
        )
        
    }
    
    goToSlide(slideIndex:number){
        this.currentSlide = slideIndex
    }
}



