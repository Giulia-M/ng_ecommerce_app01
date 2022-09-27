import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MoviesHomeRoutingModule } from './movie-home-routing.module';
import { MoviesHomeComponent } from './movies-home.component';
import { MovieComponent } from './movie/movie.component';
import { FormsModule } from '@angular/forms';
import { MySplitPipe } from 'src/app/pipe/my-split.pipe';

@NgModule({
  declarations: [MoviesHomeComponent, MovieComponent, MySplitPipe],
  imports: [CommonModule, MoviesHomeRoutingModule, FormsModule],
  providers: [],
})
export class MoviesHomeModule {}
