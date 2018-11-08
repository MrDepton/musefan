import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private messageSource = new BehaviorSubject('');
  currentArtist = this.messageSource.asObservable();

  constructor() { }

  changeArtist(name: string) {
    this.messageSource.next(name);
  }
}
