import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Coffee } from '../model/coffee';
import { GeolocationService } from '../geolocation.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-coffee',
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffee.component.scss'],
})
export class CoffeeComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _geoLocation: GeolocationService,
    private _router: Router,
    private _dataService: DataService
  ) {}

  public coffee: Coffee;
  public types: string[] = ['Cappucino', 'Espresso'];
  private _routeSubscription: any;

  public ngOnInit() {
    this.coffee = new Coffee();
    this._routeSubscription = this._route.params.subscribe((params) => {
      if (params['id']) {
        this._dataService.get(params['id'], (response) => {
          this.coffee = response;
        });
      }
    });

    this._geoLocation.requestLocation((location_) => {
      if (location_) {
        this.coffee.location.latitude = location_.latitude;
        this.coffee.location.longitute = location_.longitude;
      }
    });
  }

  public onSave() {
    this._dataService.save(this.coffee, (result) => {
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
