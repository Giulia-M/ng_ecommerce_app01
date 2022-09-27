import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  isLoginMode = true;
  isRegister = false;

  newName = '';
  newSurname = '';

  //per il loading spinner
  isLoading = false;

  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    this.isRegister = !this.isRegister;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    // const name = form.value.name;
    // const surname = form.value.surname;

    //in firebase rules: .read :'auth!=null

    //osservabile
    let authObs: Observable<AuthResponseData>;

    //prima che le richieste email e password vengonano inviate
    this.isLoading = true;

    //se effettuo l'accesso di login
    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      //altrimenti mi registro
      authObs = this.authService.signup(email, password);
    }
    //subscribe per ricevere le risposte
    authObs.subscribe(
      (responseData) => {
        console.log(responseData);
        //una volta che le richieste le ho ricevute il loading spinner è su false
        this.isLoading = false;

        if (this.isLoginMode) {
          //una volta effettuato il login, c'è il reindirizzo su una nuova pagina
          this.router.navigate(['/product/nuovo']);
        } else {
          //altrimenti mi registro
          this.router.navigate(['/auth']);
        }
      },
      //errorMessage dal service
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
        //una volta che le richieste le ho ricevute il loading spinner è su false
        this.isLoading = false;
      }
    );

    form.reset();
  }
}
