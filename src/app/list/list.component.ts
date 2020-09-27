import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Coffee } from '../model/coffee';
import { Router } from '@angular/router';
import { GeolocationService } from '../geolocation.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public list: Coffee[];

  constructor(
    private _data: DataService,
    private _router: Router,
    private _geoLocation: GeolocationService
  ) {}

  public ngOnInit(): void {
    this._data.getList((list_) => {
      this.list = list_;
    });
  }

  public goDetails(coffee: Coffee) {
    this._router.navigate(['/coffee', coffee._id]);
  }

  public goMap(coffee: Coffee) {
    const mapURL = this._geoLocation.getMapLink(coffee.location);
    location.href = mapURL;
  }

  public goShare(coffee: Coffee) {
    const shareText_ = `I had this coffee at ${coffee.place} and for me it's a ${coffee.rating} star coffee`;

    if ('share' in navigator) {
      //The navigator.share() method of the Web Share API invokes the native sharing mechanism of the device.
      navigator
        .share({
          title: coffee.name,
          text: shareText_,
          url: window.location.href, //The window.location.href property returns the URL of the current page.
        })
        .then(() => console.log('shared'))
        .catch(() => console.log('Error in sharing'));
    } else {
      const shareUrl_ = `whatsapp://send?text=${encodeURIComponent(
        shareText_
      )}`; //encodeURIComponent to encode any space character
      location.href = shareUrl_;
    }
  }
}
