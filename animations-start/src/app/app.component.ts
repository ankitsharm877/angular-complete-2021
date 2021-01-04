import { Component } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes, group } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger('divState', [
      state('normal', style({
        'background-color': 'red',
        'transform': 'translateX(0)'
      })),
      state('highlighted', style({
        'background-color': 'blue',
        'transform': 'translateX(100px)'
      })),
      transition('normal <=> highlighted', animate(300)),
      //transition('highlighted => normal', animate(300))
    ]),
    trigger('wildState', [
      state('normal', style({
        'background-color': 'red',
        'transform': 'translateX(0) scale(1)'
      })),
      state('highlighted', style({
        'background-color': 'blue',
        'transform': 'translateX(100px) scale(1)'
      })),
      state('shrunken', style({
        'background-color': 'green',
        'transform': 'translateX(0) scale(0.5)'
      })),
      transition('normal => highlighted', animate(300)),
      transition('highlighted => normal', animate(800)),
      transition('shrunken <=> *', [
        style({
          'background-color': 'orange',
        }),
        animate(1000, style({
          'border-radius': '50px'
        })),
        animate(500)
      ])
    ]),
    trigger('list1', [
      state('in', style({
        opacity: 1,
        'transform': 'translateX(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          'transform': 'translateX(-100px)'
        }),
        animate(300)]),
      transition('* => void', [
        animate(300, style({
          opacity: 0,
          'transform': 'translateX(100px)'
        }))]),
    ]),
    trigger('list2', [
      state('in', style({
        opacity: 1,
        'transform': 'translateX(0)'
      })),
      transition('void => *', 
        animate(300, keyframes([
          style({
            opacity: 0,
          'transform': 'translateX(-100px)'
          }),
          style({
            opacity: 0.5,
          'transform': 'translateX(-50px)'
          }),
          style({
            opacity: 1,
          'transform': 'translateX(-20px)'
          })
        ]))),
      transition('* => void', [
        group([
          animate(300, style({
            color : 'red'
           })),
           animate(800, style({
             opacity: 0,
             'transform': 'translateX(100px)'
           }))
        ])
      ]),
    ])
  ]
})
export class AppComponent {
  list = ['Milk', 'Sugar', 'Bread'];
  state = 'normal';
  wildState = 'normal';

  onAnimate() {
    this.state == 'normal' ? this.state = 'highlighted' : this.state = 'normal';
    this.wildState == 'normal' ? this.wildState = 'highlighted' : this.wildState = 'normal';
  }
  onShrink() {
    this.wildState = 'shrunken';
  }
  onAdd(item) {
    this.list.push(item);
  }
  onDelete(item) {
    this.list.splice(this.list.indexOf(item), 1);
  }

  animationStarted(event) {
    console.log(event);
  }
  animationEnded(event) {
    console.log(event);
  }
}