import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-nuovo-product',
  templateUrl: './nuovo-product.component.html',
  styleUrls: ['./nuovo-product.component.css'],
})
export class NuovoProductComponent implements OnInit {
  nomiRegistrati = [
    {
      nome: '',
      cognome: '',
    },
  ];
  filmForm: FormGroup;

  constructor(private productService: ProductService, private router: Router) {
    this.filmForm = new FormGroup({
      albumId: new FormControl(0, Validators.required),
      id: new FormControl(0, Validators.required),
      title: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
      thumbnailUrl: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    let film = {
      albumId: this.filmForm.controls.albumId.value,
      id: this.filmForm.controls.id.value,
      title: this.filmForm.controls.title.value,
      url: this.filmForm.controls.url.value,
      thumbnailUrl: this.filmForm.controls.thumbnailUrl.value,
      idCarrello: 0,
    };

    this.productService.addProduct$(film).subscribe(
      (risposta) => console.log(risposta),
      (errore) => console.log('errore!' + errore),
      () => console.log('Dati dei post caricati con successo')
    );

    alert('Post inserito correttamente');
    this.router.navigateByUrl('catalog');
  }

  // nomeAggiunto(datiUte: { nameUte: string; surnUte: string }) {
  //   this.nomiRegistrati.push({
  //     nome: datiUte.nameUte,
  //     cognome: datiUte.surnUte,
  //   });
  // }
}
