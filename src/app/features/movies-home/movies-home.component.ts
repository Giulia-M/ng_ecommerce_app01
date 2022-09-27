import { Component, OnInit } from '@angular/core';
import { CarrelloService } from 'src/app/core/services/carrello.service';
import { MoviesService } from 'src/app/core/services/movies.service';
import { Movies } from 'src/app/models/movies';

@Component({
  selector: 'app-movies-home',
  templateUrl: './movies-home.component.html',
  styleUrls: ['./movies-home.component.css'],
})
export class MoviesHomeComponent implements OnInit {
  movies: Movies[] = [];

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.moviesService.getMovies$().subscribe(
      (data) => (this.movies = data['results']),
      (errore) => console.log('errore' + errore),
      () => console.log('film caricati', this.movies)
    );
  }
}
