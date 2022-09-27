import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CatalogModule } from './features/catalog/catalog.module';
import { LoginModule } from './features/login/login.module';
import { ContactsModule } from './features/contacts/contacts.module';
import { CoreModule } from './core/core.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StarComponent } from './shared/star/star.component';
// import { NavbarComponent } from './core/components/navbar/navbar.component';
import { ProductDetailComponent } from './features/product-detail/product-detail.component';
// import { CarrelloComponent } from './features/carrello/carrello.component';
import { CarrelloModule } from './features/carrello/carrello.module';
// import { LoginComponent } from './features/login/login.component';
import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire/compat';

import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { NuovoProductComponent } from './features/nuovo-product/nuovo-product.component';

import { MoviesHomeModule } from './features/movies-home/movies-home.module';
import { MovieDetailComponent } from './features/movie-detail/movie-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { LoaderInterceptorService } from './core/services/loader-interceptor.service';
import { LoaderComponent } from './shared/loader/loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
@NgModule({
  declarations: [
    AppComponent,
    StarComponent,
    ProductDetailComponent,
    //componenti di navigazione e le viste
    AuthComponent,
    //
    LoadingSpinnerComponent,
    NuovoProductComponent,
    MovieDetailComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CatalogModule,
    LoginModule,
    ContactsModule,
    CarrelloModule,
    CoreModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    MoviesHomeModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
