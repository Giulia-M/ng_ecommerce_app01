import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Movies } from 'src/app/models/movies';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private http: HttpClient) {}

  // private baseURLfilm =
  //   'https://api.themoviedb.org/3/movie/550?api_key=d74e01c1c95f676efb7328c3ce5b6713';
  private topRatedFilm =
    'https://api.themoviedb.org/3/movie/top_rated?api_key=d74e01c1c95f676efb7328c3ce5b6713';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  getMovies$(): Observable<Movies[]> {
    return this.http
      .get<Movies[]>(this.topRatedFilm, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  getMovieId$(id: number): Observable<Movies> {
    return (
      this.http
        .get<Movies>(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=d74e01c1c95f676efb7328c3ce5b6713`
        )

        // .pipe(tap((movie) => console.log(movie['results'])));
        .pipe(
          map((movie) => {
            return movie['results'].find((item) => {
              return item.id == id;
            });
          })
        )
    );
  }
}
