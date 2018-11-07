import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {
  results: any[] = [];
  queryField: FormControl = new FormControl();
  nodisp: boolean = false;

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit() {
    // console.log('Running INIT.');
    this.spotifyService.getToken();
    this.queryField.valueChanges
      .pipe(debounceTime(200))
      .subscribe( queryField => {
        if (this.nodisp) {
          this.nodisp = false;
          return;
        }
        if (queryField === '') {
          this.results = [];
          return;
        }
        this.spotifyService.searchArtist(queryField)
        .subscribe(response => {
          if (response.total > 0) {
            this.results = response.items;
          } else {
            this.results = [];
          }
        });
      });
  }

  onResultClicked(result) {
    this.queryField.setValue(result.name);
    this.nodisp = true;
    this.results = [];
    console.log('Click fired.');
  }
}