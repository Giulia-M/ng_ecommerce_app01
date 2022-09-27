import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
  //--//
  // name?: string;
  // surname?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  //voglio archiviare l'utente autenticato e lo memorizzo nella variabile
  //Subject è importato da rxjs
  // user = new Subject<User>();

  /*BehaviorSubject possiamo chiamare next per ottenere un valore e possiamo
  iscriverlo per essere informato su nuovi valori . La differenza con Subject
  è che offre anche agli abbonati l'accesso immediato al valore precedentemente emesso anche se
  non si sono abbonati nel momento in cui quel valore è stato emesso.
  ciò significa che possiamo ottenere l'accesso come utente attualmente attivo
  anche se ci iscriviamo solo dopo che l'utente è stato emesso
  */
  user = new BehaviorSubject<User>(null);

  //timer di scadenza del token
  private tokenExpirationTimer: any;

  // public utentiRegis: [];

  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string) {
    //restituisce un osservabile
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB7yqauVl8KAexl98vbINJBvcC6FPQWPFk',
        {
          email: email,
          password: password,
          returnSecureToken: true,
          //--//
          // name: name,
          // surname: surname,
        }
      )
      .pipe(
        catchError(this.handleError),
        //tap senza modificare la risposta.entra nella catena osservabile ma non la ferma,
        // esegue solo un po di codice con i dati ottenuti dall'osservabile
        tap((respData) => {
          this.handleAuthentication(
            respData.email,
            respData.localId,
            respData.idToken,
            +respData.expiresIn

            // respData.name,
            // respData.surname
          );
        })
      );
  }

  //login automatico-- RECUPERARE I DATI DALLA MEMORIA LOCALE
  autologin() {
    // READ STRING FROM LOCAL STORAGE
    // const retrievedObject = localStorage.getItem('userData');

    // CONVERT STRING TO REGULAR JS OBJECT
    // const parsedObject = JSON.parse(retrievedObject);

    //userData con i dati che stiamo recuperando
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
      //--//
      // name: string;
      // surname: string;
      //1. Accedere all'archiviazione locale
      //prendere la stringa e riuscire a convertire in oggetto javascript con JSON.parse
    } = JSON.parse(localStorage.getItem('userData'));
    // JSON.parse(localStorage.getItem('userData'));

    //2.controllare se esiste in memoria l'utente
    if (!userData) {
      return;
    }
    //3.nuovo utente prendendo i dati dall'archiviazione
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
      //--//
      // userData.name,
      // userData.surname
    );
    //4. verificare se l'utente ha un token valido
    if (loadedUser.token) {
      //token
      this.user.next(loadedUser);
      //la data di scadenza è la data di scandenza del token (che è racchiusa in una data in millisecondi che otteniamo chiamando getTime)
      //meno il timestamp corrente
      //ottengo la durata che abbiamo fino alla scadenza del token
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  login(email: string, password: string) {
    return (
      this.http
        .post<AuthResponseData>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB7yqauVl8KAexl98vbINJBvcC6FPQWPFk',
          {
            email: email,
            password: password,
            returnSecureToken: true,
          }
        )
        // pipe per inviare
        // tutti gli osservabili restituiti dalla chiamata Http al gestore degli errori.
        .pipe(
          catchError(this.handleError),
          // Tap è utile per registrare il valore. TAP restituisce un osservabile
          // identico all'origine.
          tap((respData) => {
            //voglio creare il nuovo utente
            //respData è la risposta
            this.handleAuthentication(
              respData.email,
              respData.localId,
              respData.idToken,
              +respData.expiresIn
            );
            localStorage.setItem('email', respData.email);
            setTimeout(() => {
              window.location.reload();
            }, 500);
          })
        )
    );
  }

  private handleError(errorResp: HttpErrorResponse) {
    let errorMessage = ' errore sconosciuto ';
    if (!errorResp.error || !errorResp.error.error) {
      return throwError(errorMessage);
    }
    switch (errorResp.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'Questa email è già registrata';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = ' Questa email non esiste';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = ' La password non è corretta';
        break;
    }
    return throwError(errorMessage);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
    //--//
    // name?: string,
    // surname?: string
  ) {
    //getTime è il timestamp corrente in millisecondi dall'inizio dei tempi
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    //--//
    const user = new User(email, userId, token, expirationDate);
    //tipo di notifica che l'osservabile invia
    this.user.next(user);

    this.autoLogout(expiresIn * 1000);

    //usare l'archiviazione locale: rimanere connessi (con login) anche quando ricarichiamo la pagina
    //userData è la chiave con cui recuperare i dati
    //JSON.stringify voglio salvare i dati dell'user in stringa -->
    //memorizzato nella memoria locale
    localStorage.setItem('userData', JSON.stringify(user));
  }

  logout() {
    this.user.next(undefined);
    this.router.navigate(['/auth']);
    //1. cancellare l'archiviazione locale ovvero tutti i dati dell'utente
    // localStorage.clear();
    //rimuovo quella chiave di dati dell'utente e i dati che sono memorizzati
    localStorage.removeItem('userData');
    localStorage.removeItem('email');

    //se timer di scadenza del token è attivo, dovremmo cancellarlo
    //e impostare il timer di scadenza del token a null
    if (this.tokenExpirationTimer) {
      // cancella il timer quando ci disconnettiamo
      clearTimeout(this.tokenExpirationTimer);
    }
    //lo imposto
    this.tokenExpirationTimer = null;
  }

  //impostare un timer quando il token viene archiviato o quando ricevo il token per la prima volta
  //in modo da sapere quando invalidare quel token in un momento successivo di tempo
  //la disconnessione automatica dovrebbe ottenere la durata della scadenza (la quantità di millisecondi )
  autoLogout(expirationDuration: number) {
    console.log(expirationDuration);
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
}
