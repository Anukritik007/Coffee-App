import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Coffee } from '../model/coffee';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public list: Coffee[];

  constructor(private _data: DataService) {}

  ngOnInit(): void {
    this._data.getList((list_) => {
      this.list = list_;
    });
  }
}
