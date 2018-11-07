/// <reference types="@types/googlemaps" />
import {Component, AfterViewInit, ViewChild, OnInit} from '@angular/core';
// import { } from '@types/googlemaps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit, OnInit {
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

  constructor() { }

  ngAfterViewInit() {
    const DSLScript = document.createElement('script');
    DSLScript.src = 'https://maps.googleapis.com/maps/api/js?key=xxxxx'; // replace by your API key
    DSLScript.type = 'text/javascript';
    document.body.appendChild(DSLScript);
    document.body.removeChild(DSLScript);
    console.log('Called ngAfterViewInit() for the map.');
    const mapProp = {
      center: new google.maps.LatLng(18.5793, 73.8143),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }
  ngOnInit() {
    // console.log('Called ngAfterViewInit() for the map.');
    // const mapProp = {
    //   center: new google.maps.LatLng(18.5793, 73.8143),
    //   zoom: 15,
    //   mapTypeId: google.maps.MapTypeId.ROADMAP
    // };
    // this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

  }
}
