import { Component, OnInit } from '@angular/core';
import { CarrelloService } from 'src/app/core/services/carrello.service';

@Component({
  selector: 'app-carrello',
  templateUrl: './carrello.component.html',
  styleUrls: ['./carrello.component.css'],
})
export class CarrelloComponent implements OnInit {
  // constructor(public cart: CarrelloService) {}

  ngOnInit(): void {}

  //------
  constructor(public cart: CarrelloService) {}

  items$ = this.cart.items$;
  addedProduct: any[] = [];
  product: any;

  addToCart(product) {
    console.log(product);
    this.cart.addToCart(product);
  }

  // removeItem(index:number) {
  //   this.cart.removeItem(index);
  // }

  // delete() {
  //   this.addedProduct.splice(this.addedProduct.indexOf(this.product), 1);
  //   // rerender your array
  //   this.addedProduct = [...this.addedProduct];
  // }
  // removeFromCart(product) {
  //   this.cart.removeFromCart(product);
  // }
}
