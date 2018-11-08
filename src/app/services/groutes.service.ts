import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroutesService {
  private here = {latitude: null, longitude: null};
  private apiKey = 'AIzaSyD8-0qAzkTrb3RDiXTlvs_P8cmqBPPMZgI';

  constructor(private http: HttpClient) {}

  getTravelTime(destLat: string, destLng: string) {
    return this.http.get(`/googleapis/maps/api/distancematrix/json?key=${this.apiKey}&origins=${this.here.latitude},${this.here.longitude}&destinations=${destLat},${destLng}`);
  }

  getCurrent() {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log('Got position', position.coords);
      this.here.latitude = '48.864716';
      this.here.longitude = '2.349014';
    });
  }
}
