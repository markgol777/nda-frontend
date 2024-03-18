import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-candies-page',
  templateUrl: './candies-page.component.html',
  styleUrls: ['./candies-page.component.scss'],
})
export class CandiesPageComponent implements OnInit {
  private api: string = environment.api;

  public products!: any;
  public headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });;
  constructor(private http: HttpClient) {}

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
}
