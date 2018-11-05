import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { SpToken } from './SpToken';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  private clientId = 'c0da6c8427dd49a682b1eadb91546417';
  private clientSecret = '3558d134fa804a38900a620ba67aa1e6';
  private token:  SpToken;

  constructor(private http: HttpClient) {}

  getQuery(query: String){
    const url = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${this.token.accessToken}`
    });

    return this.http.get(url, {headers});
  }

  getToken() {
    const url = '/spotify-account/api/token';
    const headers = { headers : new HttpHeaders(
        {
          'Authorization' : 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`),
          'Access-Control-Allow-Origin' : 'true',
          'Content-type' : 'application/x-www-form-urlencoded'
        }
      )};
    const body = 'grant_type=client_credentials';

    this.http.post(url, body, headers).pipe(
      catchError(this.handleError('getToken', []))
    ).subscribe(retData => {
      console.log(retData);
      this.token = new SpToken();
      this.token.accessToken = retData.access_token;
      this.token.tokenType = retData.token_type;
      this.token.expiresIn = retData.expires_in;
      this.token.expireDate = new Date();
      this.token.expireDate.setSeconds(this.token.expireDate.getSeconds() + (this.token.expiresIn - 300));
      console.log('The token is: ' + this.token.expireDate);
    });
  }

  hasValidToken() {
    if (this.token != null && this.token !== undefined && this.token.expireDate.getTime() < new Date().getTime()) {
      return (true);
    }
    return (false);
  }

  getNewReleases() {
    return this.getQuery('browse/new-releases?limit=20')
      .pipe(map(data => data['albums'].items));
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
