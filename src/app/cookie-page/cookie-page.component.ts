import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cookie-page',
  templateUrl: './cookie-page.component.html',
  styleUrls: ['./cookie-page.component.scss']
})
export class CookiePageComponent implements OnInit {

  public currentProduct!:any;
  private api: string = environment.api;
  public id:string = 'asdf'
  public products!: any;
  public cart!:any;
  public count:number = 1;
  public totalPrice:number = 0;
  public isEmpty:boolean = true;

  public headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });;
  constructor(private http: HttpClient) {}




  ngOnInit(): void {
    const cart = JSON.parse(localStorage.getItem('cart') as string)
    this.cart = cart;
    this.getTotalPrice()
    this.get()
    if (cart) this.isEmpty = false;
    else this.isEmpty = true;
  }

  get() {
    const productsSorted:any = [];

    this.http
      .get(`${this.api}products`, { headers: this.headers })
      .subscribe((products: any) => {
        for (let i = 0; i < products.length; i++) {
          if (products[i].category === 'cookies') {
            productsSorted.push(products[i])
          }
        }
        this.products = productsSorted;
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
