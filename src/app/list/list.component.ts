import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { GeolocationService } from '../geolocation.service';
import { ArtWork } from '../model/art-work';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public artList: ArtWork[];

  constructor(
    private _data: DataService,
    private _router: Router,
    private _geoLocation: GeolocationService
  ) {}

  public ngOnInit(): void {
    this._data.getList((list_) => {
      this.artList = list_;
    });
  }

  public goDetails(art_: ArtWork) {
    this._router.navigate(['/art', art_._id]);
  }

  public goMap(art_: ArtWork) {
    const mapURL = this._geoLocation.getMapLink(art_.location);
    location.href = mapURL;
  }

  public goShare(art_: ArtWork) {
    const shareText_ = `I saw this work, it's a ${art_.rating} star art`;

    if ('share' in navigator) {
      //The navigator.share() method of the Web Share API invokes the native sharing mechanism of the device.
      navigator
        .share({
          title: art_.name,
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
