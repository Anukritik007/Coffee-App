import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { browser } from 'protractor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private _snackbar: MatSnackBar) {}

  public updateUIonNetworkStatus(){
    if(navigator.onLine){
      //not a good practise in terms of angular to update this way but still using any and doing it
      (document.querySelector('body')as any).style="";
    }
    else{
      (document.querySelector('body')as any).style="filter: grayscale(1)";
    }
  }

  public ngOnInit() {
    this.updateUIonNetworkStatus();
    window.addEventListener('online', this.updateUIonNetworkStatus);
    window.addEventListener('offline', this.updateUIonNetworkStatus);

    if ((navigator as any).standalone === false) {
      // This is an ios device , we are in browser
      this._snackbar.open('You can add this as PWA to homescreen', '', {
        duration: 3000,
      });
    }

    //TODO:non-ios device handling
  }
}
