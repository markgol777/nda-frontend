import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
})
export class AdminPanelComponent implements OnInit {
  public product!: any;
  public showAdd: boolean = false;
  /*
  {
      id: 1,
      name: 'GINGER SNAP',
      weight: '100G',
      price: '$15,00',
      oldPrice: '$25,00',
      bcColorTop: '#5952A2',
      bcColorBottom: '#8B84D4',
      bgColor: '#8B84D4',
      image: 'no image for now',
      laneSale: true,
      laneNew: false,
      added: '10th feb',
      description: `some description i honestly don't know`
  }
  */
  public products: any = [];

  private api: string = environment.api;

  public headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private dialog: MatDialog, private http: HttpClient) {}

  openDialog() {
    this.showAdd = !this.showAdd;
    // this.dialog.open(AddProductComponent);
  }

  ngOnInit() {
    this.get();
  }

  get() {
    this.http
      .get(`${this.api}products`, { headers: this.headers })
      .subscribe((products: any) => {
        this.products = products;
        console.log(products);
      });
  }

  addProduct() {
    const product = {
      title: document.querySelector<any>('.name-input').value,
      weight: document.querySelector<any>('.weight-input').value,
      price: document.querySelector<any>('.price-input').value,
      oldPrice: document.querySelector<any>('.oldPrice-input').value,
      bgTop: document.querySelector<any>('.bgColor1-input').value,
      bgBottom: document.querySelector<any>('.bgColor2-input').value,
      bg: document.querySelector<any>('.bgColor-input').value,
      imageUrl: document.querySelector<any>('.image-input').value,
      saleLane: document.querySelector<any>('.laneSale-checkbox').checked,
      newLane: document.querySelector<any>('.laneNew-checkbox').checked,
      description: document.querySelector<any>('.description-input').value,
      category: 'candies',
    };

    console.log(product);

    this.http
      .post(`${this.api}products/create`, product, { headers: this.headers })
      .subscribe((products: any) => {
        console.log(products);
        this.get();
      });

    this.clearInputs();
  }

  delete(event: any) {
    const id = event.target.parentElement.parentElement.children[0].textContent;
    this.http
      .delete(`${this.api}products/delete/${id}`, { headers: this.headers })
      .subscribe(() => {
        console.log('succesfully deleted');
        this.get();
      });
  }

  edit(event: any) {
    this.showAdd = !this.showAdd
    document.querySelector<any>('.btn-add').textContent = 'Edit'
    
  }

  clearInputs() {
    document.querySelector<any>('.name-input').value = '';
    document.querySelector<any>('.weight-input').value = '';
    document.querySelector<any>('.price-input').value = '';
    document.querySelector<any>('.oldPrice-input').value = '';
    document.querySelector<any>('.bgColor1-input').value = '';
    document.querySelector<any>('.bgColor2-input').value = '';
    document.querySelector<any>('.laneSale-checkbox').checked = false;
    document.querySelector<any>('.laneNew-checkbox').checked = false;
    document.querySelector<any>('.description-input').value = '';
    document.querySelector<any>('.image-input').value = '';
    this.showAdd = false;
  }
}
