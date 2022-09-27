export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) // public name: string,
  // public surname: string
  {}

  get token() {
    //se la data di scadenza nn esiste o se la data corrente va oltre la data di scadenza del token
    //allora il token è scaduto
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}
