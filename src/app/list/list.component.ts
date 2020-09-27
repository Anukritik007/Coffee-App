import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Coffee } from '../model/coffee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public list: Coffee[];

  constructor(private _data: DataService,private _router:Router) {}

  public ngOnInit(): void {
    this._data.getList((list_) => {
      this.list = list_;
    });
  }

  public goDetails(coffee:Coffee){
    this._router.navigate(['/coffee',coffee._id]);
  }
}
