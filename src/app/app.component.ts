import {Component, OnInit} from '@angular/core';
import { SpotifyService } from './services/spotify.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'musefan';

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit() {
    this.spotifyService.getToken();
    console.log('On Init executed.');
  }
}
