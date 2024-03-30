import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
// import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  public api = environment.api
  public product!: any;
  public products!: any;
  public id = 0;
  public headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });;

  constructor(public dialog: MatDialog, private http: HttpClient) { }

  ngOnInit(): void {
  }


  get() {
    this.http
      .get(`${this.api}products`, { headers: this.headers })
      .subscribe((products: any) => {
        this.products = products;
      });
  }

  addProduct() {
    this.id++;
    this.product = {
      id: this.id,
      title: document.querySelector<any>('.name-input').value,
      weight: document.querySelector<any>('.weight-input').value,
      price: document.querySelector<any>('.price-input').value,
      oldPrice: document.querySelector<any>('.oldPrice-input').value,
      bgTop: document.querySelector<any>('.bgColor1-input').value,
      bgBottom: document.querySelector<any>('.bgColor2-input').value,
      bg: document.querySelector<any>('.bgColor-input').value,
      imageUrl: document.querySelector<any>('.image-input').value ,
      laneSale: document.querySelector<any>('.laneSale-checkbox').checked,
      laneNew: document.querySelector<any>('.laneNew-checkbox').checked,
      description: document.querySelector<any>('.description-input').value,
      category: 'candies'
    }


    this.http
    .post(`${this.api}products/create`, this.product, { headers: this.headers })
    .subscribe((products: any) => {
    });

    this.dialog.closeAll();
    this.get()

    document.querySelector<any>('.name-input').value = '';
    document.querySelector<any>('.weight-input').value = '';
    document.querySelector<any>('.price-input').value = '';
    document.querySelector<any>('.oldPrice-input').value = '';
    document.querySelector<any>('.bgColor1-input').value = '';
    document.querySelector<any>('.bgColor2-input').value = '';
    document.querySelector<any>('.laneSale-checkbox').checked = false;
    document.querySelector<any>('.laneNew-checkbox').checked = false;
    document.querySelector<any>('.description-input').value = '';

  }
}
