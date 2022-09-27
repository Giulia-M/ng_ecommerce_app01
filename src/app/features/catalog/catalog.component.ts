import { Component, OnInit } from '@angular/core';
import { CarrelloService } from 'src/app/core/services/carrello.service';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/models/product';
import { FilterByStatusPipe } from 'src/app/pipe/inputSearch.pipe';
@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent implements OnInit {
  products: Product[];
  allProducts: Product[];

  textToSearch: string = '';

  active!: Product;
  constructor(
    public productService: ProductService,
    private cart: CarrelloService
  ) {
    this.products = [];
  }

  ngOnInit(): void {
    this.productService.getAllProducts$().subscribe(
      (elenco) => (this.products = elenco),
      (errore) => console.log('errore' + errore),
      () => console.log('dati caricati con successo', this.products)
    );
  }
  addToCart(p: Product): void {
    this.cart.addToCart({ idCarrello: Math.random() * 10, ...p });
  }
  setActive(product: Product) {
    this.active = product;
  }

  search(value: string): void {
    this.products = this.allProducts.filter((val) =>
      val.title.toLowerCase().includes(value)
    );
  }
}
