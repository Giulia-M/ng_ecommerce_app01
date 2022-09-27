import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  //BEHAVIORSUBJECT = serve ad ascoltare il valore dello stato di caricamento dello spinner. true mostrerà lo spinner, false nasconderà lo spinner.
  loadingSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /**
   * Questa mappa deve contenere solo richieste http in corso.
   * string = url
   * boolean = true o false
   */
  loadingMap: Map<string, boolean> = new Map<string, boolean>();

  // Questo metodo accetta 2 parametri, lo stato di caricamento (booleano) e un URL
  /**
  Imposta il valore della proprietà loadingSub in base a quanto segue:
    * - Se il caricamento è true, aggiungi l'URL fornito a loadingMap con un valore true, imposta il valore loadingSub su true
    * - Se il caricamento è false, rimuovere la voce loadingMap e solo quando la mappa è vuota imposteremo loadingSub su false
    * @param loading {boolean}
   * @param url {string}
   */

  setLoading(loading: boolean, url: string): void {
    if (!url) {
      throw new Error(
        'The request URL must be provided to the LoadingService.setLoading function'
      );
    }
    if (loading === true) {
      this.loadingMap.set(url, loading);
      this.loadingSub.next(true);
    } else if (loading === false && this.loadingMap.has(url)) {
      this.loadingMap.delete(url);
    }
    if (this.loadingMap.size === 0) {
      this.loadingSub.next(false);
    }
  }
}
