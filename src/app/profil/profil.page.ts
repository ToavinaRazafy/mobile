import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {
donne:any;
  constructor(private route: Router) {
    this.donne=JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.donne);
   }
   deconnecter(){
    this.route.navigate(['/login']);
   }
  ngOnInit() {
  }

}
