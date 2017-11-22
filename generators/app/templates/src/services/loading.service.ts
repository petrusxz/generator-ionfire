import { Injectable } from '@angular/core';

import { LoadingController } from 'ionic-angular';

@Injectable()
export class LoadingService {

    private loading: any;

    constructor(public loadingCtrl: LoadingController) { }

    presentLoading(): void {
        this.loading = this.loadingCtrl.create({
            spinner: 'crescent'
          });        
        
          this.loading.present();
    }

    dissmissLoading(): void {
        this.loading.dismiss();
    }
}