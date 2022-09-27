import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Product } from '../../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiURL = 'https://jsonplaceholder.typicode.com';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
    }),
  };
  constructor(private http: HttpClient) {}

  getAllProducts$(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiURL + '/photos');
  }
  getProductById$(id: number): Observable<Product> {
    return this.http
      .get<Product>(`${this.apiURL}/photos/${id}`)
      .pipe(tap((product) => console.log(product)));
  }

  addProduct$(product: Product): Observable<Product> {
    // invia un post da salvare
    return this.http.post<Product>(
      this.apiURL + '/photos',
      JSON.stringify(product),
      this.httpOptions
    );
  }

  /*
  devices: Product[] = [];

  addNewProduct(data: Product) {
    console.log(data);
    this.devices.push(data);
  }

  getProducts() {
    this.http.get<Product[]>('http://localhost:3000/devices').subscribe({
      next: (devices) => {
        console.log(devices);
        this.devices = devices;
      },
    });
  }
*/

  private products: Product[] = [];
}
