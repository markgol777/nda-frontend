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
  public id!: string;
  public editState: boolean = false;

  public products: any = [];

  private api: string = environment.api;

  public headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private dialog: MatDialog, private http: HttpClient) {}

  openDialog() {
    this.showAdd = !this.showAdd;
  }

  ngOnInit() {
    this.get();
  }

  get() {
    this.http
      .get(`${this.api}products`, { headers: this.headers })
      .subscribe((products: any) => {
        this.products = products;
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
      category: document.querySelector<any>('.category').value,
    };

    this.http
      .post(`${this.api}products/create`, product, { headers: this.headers })
      .subscribe((products: any) => {
        this.get();
      });

    this.clearInputs();
  }

  delete(event: any) {
    const id = event.target.parentElement.parentElement.children[0].textContent;
    this.http
      .delete(`${this.api}products/delete/${id}`, { headers: this.headers })
      .subscribe(() => {
        ('succesfully deleted');
        this.get();
      });
  }

  edit(event: any) {
    const id = event.target.parentElement.parentElement.children[0].textContent;
    this.showAdd = !this.showAdd;
    document.querySelector<any>('.btn-add').textContent = 'Edit';
    this.id = id;
    this.http
      .get(`${this.api}products/${id}`, { headers: this.headers })
      .subscribe((data: any) => {
        document.querySelector<any>('.name-input').value = data.title;
        document.querySelector<any>('.weight-input').value = 'not done yet';
        document.querySelector<any>('.price-input').value = data.price;
        document.querySelector<any>('.oldPrice-input').value = data.oldPrice;
        document.querySelector<any>('.bgColor1-input').value = data.bgTop;
        document.querySelector<any>('.bgColor2-input').value = data.bgBottom;
        document.querySelector<any>('.bgColor-input').value = data.bg;
        document.querySelector<any>('.laneSale-checkbox').checked =
          data.saleLane;
        document.querySelector<any>('.laneNew-checkbox').checked = data.laneNew;
        document.querySelector<any>('.description-input').value =
          data.description;
        document.querySelector<any>('.image-input').value = data.imageUrl;
      });
    this.editState = true;
  }

  clearInputs() {
    document.querySelector<any>('.name-input').value = '';
    document.querySelector<any>('.weight-input').value = '';
    document.querySelector<any>('.price-input').value = '';
    document.querySelector<any>('.oldPrice-input').value = '';
    document.querySelector<any>('.bgColor1-input').value = '';
    document.querySelector<any>('.bgColor2-input').value = '';
    document.querySelector<any>('.bgColor-input').value = '';
    document.querySelector<any>('.laneSale-checkbox').checked = false;
    document.querySelector<any>('.laneNew-checkbox').checked = false;
    document.querySelector<any>('.description-input').value = '';
    document.querySelector<any>('.image-input').value = '';
    document.querySelector<any>('.category').value = '';
    this.showAdd = false;
  }

  saveProduct() {
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
      category: document.querySelector<any>('.category').value,
    };

    this.http
      .put(`${this.api}products/edit/${this.id}`, product, {
        headers: this.headers,
      })
      .subscribe((data: any) => {
        this.get();
      });
    this.clearInputs();
    this.editState = false;
    document.querySelector<any>('.btn-add').textContent = 'Add New';
  }
}
