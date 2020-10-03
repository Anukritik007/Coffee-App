import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public endpoint = 'http://localhost:3000';

  constructor(private _http: HttpClient) { }

  public get(id:string,callback) {

    this._http.get(`${this.endpoint}/art/${id}`).subscribe((response) => {
      console.log('DataService: get',response);
      callback(response);
    });
  }

  public getList(callback) {
    // const list =[
    //   new Coffee("Sunrise beach", new PlaceLocation('123 Market cirty','San francisco')),
    //   new Coffee("Iceland", new PlaceLocation('123 Market cirty','San francisco'))
    // ];
    // callback(list);

    this._http.get(`${this.endpoint}/art`).subscribe((response) => {
      console.log('DataService: getList',response);
      callback(response);
    });
  }

  public save(coffee, callback) {
    //with real web service
    if (coffee._id) {
      //it is an update
      this._http
        .put(`${this.endpoint}/art/${coffee._id}`, coffee)
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
      this._http.post(`${this.endpoint}/art`, coffee).subscribe(
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
