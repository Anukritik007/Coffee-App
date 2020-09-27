import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Coffee } from '../model/coffee';
import { GeolocationService } from '../geolocation.service';

@Component({
  selector: 'app-coffee',
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffee.component.scss'],
})
export class CoffeeComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _geoLocation: GeolocationService
  ) {}

  public coffee: Coffee;
  public types: string[] = ['Cappucino', 'Espresso'];
  private _routeSubscription: any;

  public ngOnInit(){
    this.coffee = new Coffee();
    this._routeSubscription = this._route.params.subscribe((params) => {});

    this._geoLocation.requestLocation((location_) => {
      if (location_) {
        this.coffee.location.latitude = location_.latitude;
        this.coffee.location.longitute = location_.longitude;
      }
    });
  }

  public onSave(){

  }

  public onCancel(){
    
  }

  public ngOnDestroy() {
    this._routeSubscription.unsubscribe();
  }
}
