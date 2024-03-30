import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  public cart!:any;
  public count:number = 1;
  public totalPrice:number = 0;

  constructor() { }

  ngOnInit(): void {
    const cart = JSON.parse(localStorage.getItem('cart') as string)
    this.cart = cart;
    this.getTotalPrice()
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


  cartShow() {
    document.querySelector<any>('.cart').style.display = 'block';
  }

  closeCart() {
    document.querySelector<any>('.cart').style.display = 'none';
  }

  minus() {
    if (this.count > 1) this.count--
  }

  plus() {
    this.count++
  }

  getTotalPrice() {
    if (this.cart) {
      for (const product of this.cart) {
        this.totalPrice += +product.price.split('$')[1]
      }
    } else {
      this.cart = [];
    }
  }
}
