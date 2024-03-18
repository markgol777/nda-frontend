import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cookie-page',
  templateUrl: './cookie-page.component.html',
  styleUrls: ['./cookie-page.component.scss']
})
export class CookiePageComponent implements OnInit {

  public products = [
    {
    id: 1,
    name: 'GINGER SNAP',
    weight: '100G',
    price: '$15,00',
    oldPrice: '$25,00',
    backgroundColor: '#8B84D4',
    imageLink: '/assets/images/purple-tastes-best.png',
    laneBackgroundColor: '#942C1E',
    laneColor: '#fff',
    degrees: '90deg',
    laneWidth: '45px',
    laneHeight: '100%'
  },

  {
    id: 2,
    name: 'ALMOND',
    weight: '100G',
    price: '$15,00',
    oldPrice: '',
    backgroundColor: '#8AC6DA',
    imageLink: '/assets/images/product2-blue.png',
    laneBackgroundColor: '#942C1E',
    laneColor: '#fff',
    degrees: '90deg',
    laneWidth: '45px',
    laneHeight: '100%'
  },

  {
    id: 3,
    name: 'ALMOND',
    weight: '100G',
    price: '$15,00',
    oldPrice: '',
    backgroundColor: '#8AC6DA',
    imageLink: '/assets/images/product2-blue.png',
    laneBackgroundColor: '#942C1E',
    laneColor: '#fff',
    degrees: '90deg',
    laneWidth: '45px',
    laneHeight: '100%'
  },
]

  public currentProduct!:any;

  constructor() { }

  ngOnInit(): void {
  }

  buy(e:any) {
    this.currentProduct = this.products[e.target.id-1];
    // this.id = e.target.id;
    // console.log(this.id);
  }
}
