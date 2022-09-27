import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MoviesService } from 'src/app/core/services/movies.service';
import { Movies } from 'src/app/models/movies';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent implements OnInit {
  @Input('moviesTopRated') movie: Movies;

  movies: Movies[];

  constructor(private moviesService: MoviesService) {
    this.movies = [];
  }

  ngOnInit(): void {}
}
