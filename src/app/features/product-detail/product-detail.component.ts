import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.product = {
      albumId: 0,
      id: 0,
      title: '',
      url: '',
      thumbnailUrl: '',
      idCarrello: 0,
    };
  }

  ngOnInit(): void {
    let id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById$(id).subscribe(
      (p) => (this.product = p),
      (errore) => console.log(`errore ${errore}`),
      () => console.log(`caricato film con id ${id}`)
    );
  }
}
