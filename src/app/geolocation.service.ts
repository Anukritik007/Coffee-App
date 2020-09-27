import { Injectable } from '@angular/core';
import { PlaceLocation } from './model/placeLocation';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  constructor() {}

  public requestLocation(callback) {
    //W3 geolocation API
    navigator.geolocation.getCurrentPosition(
      (position) => {
        callback(position.coords);
      },
      (error) => {
        callback(null);
      }
    );
  }

  public getMapLink(location: PlaceLocation) {
    //universal link
    //<a href="https://maps.google.com/?q=Eiffel+Tower">
    //<a href="https://maps.apple.com/?q=Eiffel+Tower">

    let query = '';
    if (location.latitude) {
      query = location.latitude + ',' + location.longitute;
    } else {
      query = `${location.address},${location.city}`;
    }

    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      return `https://maps.apple.com/?q=${query}`;
    } else {
      return `https://maps.goole.com/?q=${query}`;
    }
  }
}
