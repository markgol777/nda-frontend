import { Component, OnInit } from '@angular/core';
import { CookiePageComponent } from '../cookie-page/cookie-page.component';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-about-product',
  templateUrl: './about-product.component.html',
  styleUrls: ['./about-product.component.scss']
})
export class AboutProductComponent implements OnInit {
  public id: string = this.router.url.split('/')[2];
  public cart:any = JSON.parse(localStorage.getItem('cart') as string) || [];
  public api = environment.api;
  public product:any = {};
  public background!:string;
  public currentProduct!:any;
  public products!: any;
  public count:number = 1;
  public totalPrice:number = 0;

  public headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });;


  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.http
      .get(`${this.api}products/${this.id}`, { headers: this.headers })
      .subscribe((product: any) => {
        this.product = product;
        this.background = `background: linear-gradient(0deg, ${this.product.bgTop} 56%, ${this.product.bgBottom} 36%);`
      });

      const cart = JSON.parse(localStorage.getItem('cart') as string)
      this.cart = cart;
      this.getTotalPrice()
      this.get()
    }

    addToCart() {
      this.cart.push(this.product)
      localStorage.setItem('cart', JSON.stringify(this.cart))
    }

    get() {
      this.http
        .get(`${this.api}products`, { headers: this.headers })
        .subscribe((products: any) => {
          this.products = products;
        });
    }

    cartShow() {
      document.querySelector<any>('.cart').style.display = 'block';
    }

    closeCart() {
      document.querySelector<any>('.cart').style.display = 'none';
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
