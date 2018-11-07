import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { SpToken } from '../SpToken';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  private clientId = 'c0da6c8427dd49a682b1eadb91546417';
  private clientSecret = '3558d134fa804a38900a620ba67aa1e6';
  private token: SpToken;

  constructor(private http: HttpClient) {}

  getQuery(query: String){
    const url = `/spotify-endpoint/${query}`;

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
    ).subscribe((retData: any) => {
      console.log(retData);
      this.token = new SpToken();
      this.token.accessToken = retData.access_token;
      this.token.tokenType = retData.token_type;
      this.token.expiresIn = retData.expires_in;
      this.token.expireDate = new Date();
      this.token.expireDate.setSeconds(this.token.expireDate.getSeconds() + (this.token.expiresIn - 300));
      console.log('Got Token');
    });
  }

  hasValidToken() {
    if (this.token != null && this.token !== undefined && this.token.expireDate.getTime() < new Date().getTime()) {
      return (true);
    }
    return (false);
  }

  searchArtist(query: string) {
    return this.getQuery('search?type=artist&limit=20&q=' + query).pipe(map(data => data['artists']));
  }

  getArtistFromId(artistId: string) {
    return this.getQuery('artists/' + artistId);
  }

  getArtistTopTracksFromId(artistId: string) {
    return this.getQuery(`artists/${artistId}/top-tracks?market=US`);
  }

  getNewReleases() {
    return this.getQuery('browse/new-releases?limit=20')
      .pipe(map(data => data['albums'].items));
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }
}
