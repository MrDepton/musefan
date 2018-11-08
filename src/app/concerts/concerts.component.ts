import {Component, OnInit} from '@angular/core';
import {DataService} from '../services/data-service.service';
import {SongkickService} from '../services/songkick.service';
import {GroutesService} from '../services/groutes.service';


@Component({
  selector: 'app-concerts',
  templateUrl: './concerts.component.html',
  styleUrls: ['./concerts.component.scss']
})

export class ConcertsComponent implements OnInit {
  concerts: any[] = [];
  artistName: string;
  currentArtist;
  currentCoords;

  constructor(
    private data: DataService,
    private songkick: SongkickService,
    private groutes: GroutesService
  ) {}

  ngOnInit() {
    this.data.currentArtist.subscribe(artist => this.getConcerts(artist));
    this.groutes.getCurrent();
  }

  getConcerts(artist: string) {
    this.artistName = artist;
    this.songkick.searchArtist(artist).subscribe(results => {
      console.log(results[0]._attributes.id);
      this.currentArtist = artist;
      this.songkick.getUpcomingForArtist(results[0]._attributes.id).subscribe(ret => {
        this.concerts = ret;
        this.concerts.forEach((concert) => {
          this.groutes.getTravelTime(concert.location._attributes.lat, concert.location._attributes.lng).subscribe((ret: any) => {
            concert.travel = ret.rows[0].elements[0].duration.text;
          });
        });
        console.log(ret);
      });
    });
  }
}
