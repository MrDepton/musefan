import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {
  private messageSource = new BehaviorSubject('default message');
  currentArtist = this.messageSource.asObservable();

  constructor() { }

  changeArtist(name: string) {
    this.messageSource.next(name);
  }
}
