import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { ModificaProductComponent } from './features/modifica-product/modifica-product.component';
import { MovieDetailComponent } from './features/movie-detail/movie-detail.component';
import { NuovoProductComponent } from './features/nuovo-product/nuovo-product.component';
import { ProductDetailComponent } from './features/product-detail/product-detail.component';

const routes: Routes = [
  {
    path: 'catalog',
    loadChildren: () =>
      import('./features/catalog/catalog.module').then((m) => m.CatalogModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./features/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'movies',
    loadChildren: () =>
      import('./features/movies-home/movies-home.module').then(
        (m) => m.MoviesHomeModule
      ),
  },
  {
    path: 'movie/:id',
    component: MovieDetailComponent,
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'contacts',
    loadChildren: () =>
      import('./features/contacts/contacts.module').then(
        (m) => m.ContactsModule
      ),
  },
  {
    path: 'product/nuovo',
    component: NuovoProductComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'carrello',
    loadChildren: () =>
      import('./features/carrello/carrello.module').then(
        (m) => m.CarrelloModule
      ),
  },
  {
    path: 'photos/:id',
    component: ProductDetailComponent,
  },
  {
    path: 'photos/:id/modifica',
    component: ModificaProductComponent,
  },

  {
    path: '',
    redirectTo: '/catalog',
    pathMatch: 'full',
  },

  {
    path: '**',
    redirectTo: '/catalog',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,

      scrollPositionRestoration: 'enabled',

      anchorScrolling: 'enabled',

      enableTracing: false,
    }),
  ],

  exports: [RouterModule],
})
export class AppRoutingModule {}
