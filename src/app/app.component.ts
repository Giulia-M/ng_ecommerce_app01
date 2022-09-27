import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';
import { LoaderService } from './core/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'app01';

  //usere il servizio di autentitcazione
  constructor(
    private authService: AuthService,
    private _loading: LoaderService
  ) {}
  //all'avvio dell'app
  ngOnInit() {
    //chiamare servizio di accesso automatico
    this.authService.autologin();
  }
}
