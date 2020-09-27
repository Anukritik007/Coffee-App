import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Coffee } from '../model/coffee';

@Component({
  selector: 'app-coffee',
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffee.component.scss']
})
export class CoffeeComponent implements OnInit {

  constructor(private _route: ActivatedRoute) { }

  public coffee:Coffee;
  public types:string[] =[
    'Cappucino',
    'Espresso'
  ];
  private _routeSubscription:any;


  ngOnInit(): void {
    this.coffee = new Coffee();
    this._routeSubscription = this._route.params.subscribe(
      params =>{
        
      }
    )
  }

  public ngOnDestroy(){
    this._routeSubscription.unsubscribe();
  }

}
