import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as XMLParser from 'xml-js';

@Injectable({
  providedIn: 'root'
})
export class SongkickService {

  private apiKey = 'JRps6goDOJAH1am1';

  constructor(private http: HttpClient) {}

  searchArtist(query: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'text' }).set('Accept', 'text');
    return this.http
      .get(`https://api.songkick.com/api/3.0/search/artists.xml?apikey=${this.apiKey}&query=${query}`, { headers: headers, responseType: 'text' })
      .pipe(map(retData => {
        const ret:any = XMLParser.xml2js(retData, {compact: true});
        if (ret.resultsPage._attributes.totalEntries > 0) {
          return ret.resultsPage.results.artist;
        }
        return [];
      }));
  }

  getUpcomingForArtist(artistId: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'text' }).set('Accept', 'text');
    return this.http
      .get(`https://api.songkick.com/api/3.0/artists/${artistId}/calendar.xml?apikey=${this.apiKey}`, { headers: headers, responseType: 'text' })
      .pipe(map(retData => {
        const ret:any = XMLParser.xml2js(retData, {compact: true});
        if (ret.resultsPage._attributes.totalEntries >= 0) {
          return ret.resultsPage.results.event;
        }
        return [];
      }));
  }
}
