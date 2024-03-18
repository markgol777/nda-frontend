import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  mouseOver() {
    document.querySelector<any>('.buy-btn').style.animation = 'animationTest1 0.4s 1';
    setTimeout(() => {
      document.querySelector<any>('.buy-btn').style.opacity = 1;
    }, 400);
  }

  mouseLeave() {
    document.querySelector<any>('.buy-btn').style.animation = 'animationTest2 0.4s 1';
    setTimeout(() => {
      document.querySelector<any>('.buy-btn').style.opacity = 0;
    }, 400);
  }


  mouseEnter(e: any) {
    document.querySelector<any>('.cursor').style.left = e.pageX + 'px';
    document.querySelector<any>('.cursor').style.top = e.pageY + 'px';
  }

  
}
