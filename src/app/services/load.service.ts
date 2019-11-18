import { Injectable } from '@angular/core';
import { LoadingController, NavController } from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class LoadService {
  loading:any;
  constructor(public nav: NavController,public load: LoadingController) { 
    this.loading=this.load.create({
    message: "Chargement"
  });
  }
  

  show() {
    this.loading.present();
  }

  hide() {
    this.loading.dismiss();
  }
}
