import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/models/product';
@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent implements OnInit {
  @Input('datiProducts') product: Product;
  @Output() addToCart = new EventEmitter();

  products: Product[];
  constructor(private productService: ProductService) {
    this.products = [];
  }

  ngOnInit(): void {}
  add() {
    this.addToCart.emit(this.product);
  }
}
