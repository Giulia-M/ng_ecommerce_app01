import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from 'src/app/core/services/movies.service';
import { Movies } from 'src/app/models/movies';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailComponent implements OnInit {
  movie: Movies;
  constructor(
    private moviesService: MoviesService,
    private route: ActivatedRoute
  ) {
    this.movie = {
      id: 0,
      title: '',
      image: '',
      backdrop_path: '',
      overview: '',
    };
  }

  ngOnInit(): void {
    let id: number = Number(this.route.snapshot.paramMap.get('id'));

    this.moviesService.getMovieId$(id).subscribe(
      (m: any) => (this.movie = m),
      (errore) => console.log(`errore ${errore}`),
      () => console.log(`caricato film con id ${id}`)
    );
  }
}
