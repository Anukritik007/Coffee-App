import { Injectable } from '@angular/core';
import { PlaceLocation } from './model/placeLocation';
import { Coffee } from './model/coffee';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public endpoint = 'http://localhost:3000';

  constructor(private _http: HttpClient) { }

  public get(id:string,callback) {

    this._http.get(`${this.endpoint}/coffees/${id}`).subscribe((response) => {
      console.log('DataService: get',response);
      callback(response);
    });
  }

  public getList(callback) {
    // const list =[
    //   new Coffee("Double Espresso", "Sunny cafe", new PlaceLocation('123 Market cirty','San francisco')),
    //   new Coffee("Caramel Espresso", "Cafe Caffeeno", new PlaceLocation('123 Market cirty','San francisco'))
    // ];
    // callback(list);

    this._http.get(`${this.endpoint}/coffees`).subscribe((response) => {
      console.log('DataService: getList',response);
      callback(response);
    });
  }

  public save(coffee, callback) {
    //with real web service
    if (coffee._id) {
      //it is an update
      this._http
        .put(`${this.endpoint}/coffees/${coffee._id}`, coffee)
        .subscribe(
          response => {
            callback(true);
          },
          (error) => {
            console.log('Unable to save', error);
          }
        );
    } else {
      //it is an insert
      this._http.post(`${this.endpoint}/coffees`, coffee).subscribe(
        response => {
          callback(true);
        },
        (error) => {
          console.log('Unable to save', error);
        }
      );
    }
    callback(true);
  }
}
