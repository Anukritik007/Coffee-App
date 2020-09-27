import { Injectable } from '@angular/core';
import { PlaceLocation } from './model/placeLocation';
import { Coffee } from './model/coffee';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  public getList(callback){
    const list =[
      new Coffee("Double Espresso", "Sunny cafe", new PlaceLocation('123 Market cirty','San francisco')),
      new Coffee("Caramel Espresso", "Cafe Caffeeno", new PlaceLocation('123 Market cirty','San francisco'))
    ];
    callback(list);
  }

  public save(coffee, callback){
    //TODO: with real web service
    callback(true);
  }
}
