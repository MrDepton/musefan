import { Component, OnInit } from '@angular/core';
import { SpotifyService } from './services/spotify.service';
import { SongkickService } from './services/songkick.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'musefan';

  constructor(
    private spotifyService: SpotifyService,
    private songkickService: SongkickService
  ) {}

  ngOnInit() {
    // this.spotifyService.getToken();
    // this.songkickService.searchArtist('coldplay').subscribe(data => console.log(data));
    // this.songkickService.getUpcomingForArtist('2867646').subscribe(data => console.log(data));
    console.log('On Init executed.');
  }
}
