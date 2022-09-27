import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Movies } from 'src/app/models/movies';

import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root',
})
export class CarrelloService {
  constructor() {
    //per il refresh della pagina i prodotti rimangono nel carrello
    let existingCartItems = JSON.parse(localStorage.getItem('products'));
    if (!existingCartItems) {
      existingCartItems = [];
    }
    this.itemsSubject.next(existingCartItems);
  }

  private itemsSubject = new BehaviorSubject<Product[]>([]);
  items$ = this.itemsSubject.asObservable();

  addToCart(product: Product) {
    console.log(this.items$);
    this.items$
      .pipe(
        take(1),
        map((products) => {
          products.push(product);

          localStorage.setItem('products', JSON.stringify(products));
        })
      )
      .subscribe();
  }

  remove(data: any) {
    let productArr: any[] = this.itemsSubject.getValue();
    productArr = productArr.filter((item) => item.idCarrello !== data);

    this.itemsSubject.next(productArr);

    //quando refresho la pagina, il carrello ha i prodotti rimasti
    localStorage.setItem('products', JSON.stringify(productArr));
  }
}
