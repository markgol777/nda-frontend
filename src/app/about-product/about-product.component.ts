import { Component, OnInit } from '@angular/core';
import { CookiePageComponent } from '../cookie-page/cookie-page.component';

@Component({
  selector: 'app-about-product',
  templateUrl: './about-product.component.html',
  styleUrls: ['./about-product.component.scss']
})
export class AboutProductComponent implements OnInit {
  // private cookiePage: CookiePageComponent
  constructor(private cookiePage: CookiePageComponent) { }

  public products = this.cookiePage.products;
  public currentProduct!:Array<Object>;

  ngOnInit(): void {
    // console.log(this.currentProduct);
    // this.currentProduct = this.cookiePage.currentProduct
    console.log(this.cookiePage.currentProduct)
    // console.log(this.products[this.cookiePage.id-1]);
  }

}
