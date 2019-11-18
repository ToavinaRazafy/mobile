import { Component, OnInit } from '@angular/core';
import { PromService } from "src/app/services/prom.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-liste',
  templateUrl: './liste.page.html',
  styleUrls: ['./liste.page.scss'],
})
export class ListePage implements OnInit {
  resultat: any = {};
  donne: any;
  constructor(public route:Router, public service:PromService) { 
    this.getEtudiant();
  }
  getEtudiant() {
    this.service.getEtudiant()
      .then(data => {
        this.resultat = data;
        this.donne = this.resultat.data;
        console.log(this.donne);
      });
  }
  recherche(nom) {
    this.service.recherche(nom)
      .then(data => {
        this.resultat = data;
        this.donne = this.resultat.data;
        console.log(this.donne);
      });
  }
  getDetail(etudiant){
    this.service.setExtras(etudiant);
    this.route.navigate(['tabs/tabs/fiche']);
  }
  nouveau(){
    this.route.navigate(['tabs/tabs/ajout']);
  }
  modifier(etudiant){
    this.service.setExtras(etudiant);
    this.route.navigate(['tabs/tabs/modification']);
  }
  supprimer(id){
     this.service.suppression(id)
      .then(data => {
        this.resultat = data;
        this.getEtudiant();
      });
  }
  search(event){
     this.service.recherche(event.target.value)
      .then(data => {
        this.resultat = data;
        this.donne = this.resultat.data;
      });
  }
  ngOnInit() {
    setTimeout( () => {
      console.log("timeout");
        this.getEtudiant();
    }, 1000);
  }
  
}
