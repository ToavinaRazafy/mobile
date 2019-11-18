import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { PromService } from "src/app/services/prom.service";

@Component({
  selector: 'app-fiche',
  templateUrl: './fiche.page.html',
  styleUrls: ['./fiche.page.scss'],
})
export class FichePage implements OnInit {
  currentUser: any;
  id:string;
  resultat: any;
  donne:any;
  constructor(private route: Router,public router: ActivatedRoute,public service:PromService) { 

    this.donne = this.service.getExtras();
    console.log("ato am fiche "+this.donne.nom);
  }
  getDetail(id) {
    if (id!=='') {
      this.service.getDetail(id)
      .then(data => {
        this.resultat = data;
        this.donne=this.resultat.data;
        console.log(this.donne.nom);
      });
    } 
  }
  ngOnInit() {
  }

}
