import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeolocationService } from '../geolocation.service';
import { DataService } from '../data.service';
import { ArtWork } from '../model/art-work';

@Component({
  selector: 'app-art',
  templateUrl: './art.component.html',
  styleUrls: ['./art.component.scss'],
})
export class ArtComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _geoLocation: GeolocationService,
    private _router: Router,
    private _dataService: DataService
  ) {}

  public art: ArtWork;
  public types: string[] = ['Cappucino', 'Espresso'];
  private _routeSubscription: any;

  public ngOnInit() {
    this.art = new ArtWork();
    this._routeSubscription = this._route.params.subscribe((params) => {
      if (params['id']) {
        this._dataService.get(params['id'], (response) => {
          this.art = response;
        });
      }
    });

    this._geoLocation.requestLocation((location_) => {
      if (location_) {
        this.art.location.latitude = location_.latitude;
        this.art.location.longitute = location_.longitude;
      }
    });
  }

  public onSave() {
    this._dataService.save(this.art, (result) => {
      if (result) {
        this._router.navigate(['/']);
      }
    });
  }

  public onCancel() {
    this._router.navigate(['/']);
  }

  public ngOnDestroy() {
    this._routeSubscription.unsubscribe();
  }
}
