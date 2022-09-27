import { Component } from '@angular/core';
import { GenereFilm } from 'src/app/shared/genereFilm.model';
@Component({
  selector: 'app-genere',
  templateUrl: './genere.component.html',
})
export class GenereComponent {
  generi: GenereFilm[] = [
    new GenereFilm('humor', 'ita'),
    new GenereFilm('giallo', 'ita'),
    new GenereFilm('commedia', 'ita'),
  ];
  constructor() {}
}
