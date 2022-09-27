import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductService } from './product.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Product } from '../../models/product';
@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private productService: ProductService,
    private authService: AuthService
  ) {}

  storeProduct() {
    const films = this.productService.getAllProducts$();
    this.http
      .put(
        'https://ecommerce-5bb3a-default-rtdb.firebaseio.com/films.json',
        films
      )
      .subscribe((response) => {
        console.log(response);
      });
  }
  fetchData() {
    //invio la richiesta
    this.http
      .get<Product[]>(
        'https://ecommerce-5bb3a-default-rtdb.firebaseio.com/films.json'
      )
      .subscribe((products) => {
        console.log(products);
      });
  }
}
