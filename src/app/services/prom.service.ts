import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Etudiant } from "src/app/modeles/etudiant";
import { BehaviorSubject, from } from "rxjs";
import { Storage } from '@ionic/storage';
import { NetworkService, ConnectionStatus } from "src/app/services/network.service";
import { OfflineManagerService } from "src/app/services/offline-manager.service";

const API_STORAGE_KEY = 'specialkey';

@Injectable({
  providedIn: 'root'
})
export class PromService {
  etudiant: any;
  donne: any;
  liste;
  constructor(public http: HttpClient, private networkService: NetworkService, private storage: Storage, private offlineManager: OfflineManagerService) {
  }
  getEtudiant() {
    console.log(this.networkService.getCurrentNetworkStatus());
    if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline) {
      return this.getLocalData('etudiants');
    }
    return new Promise(resolve => {
      this.http.get('etudiant/findall').subscribe(data => {
        resolve(data);
        this.donne = data;
        this.liste = this.donne.data;
        this.setLocalData('etudiants', data);
        console.log(this.getLocalData('etudiants'));
      }, err => {
        console.log(err);
      });
    });
  }
  getDetail(id) {
    return new Promise(resolve => {
      this.http.get('etudiant/detail?id=' + id).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  recherche(nom) {
    return new Promise(resolve => {
      this.http.get('etudiant/recherche?nom=' + nom).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  ajout(etudiant: Etudiant) {
    console.log(etudiant);
    if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline) {
      return from(this.offlineManager.storeRequest('etudiant/ajout', 'POST', etudiant));
    } else {
      return new Promise(resolve => {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        this.http.post('etudiant/ajout', etudiant, { headers: headers }).subscribe(data => {
          resolve(data);
          console.log("vita service");
        }, err => {
          console.log(err);
        });
      });
    }

  }
  modification(etudiant: Etudiant) {
    console.log(etudiant);
    if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline) {
      return from(this.offlineManager.storeRequest('etudiant/ajout', 'POST', etudiant));
    } else {
      return new Promise(resolve => {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        this.http.post('etudiant/ajout', etudiant, { headers: headers }).subscribe(data => {
          resolve(data);
          console.log("vita service");
        }, err => {
          console.log(err);
        });
      });
    }

  }
  suppression(id) {
    console.log(id);
    return new Promise(resolve => {
      this.http.delete('etudiant/suppression/' + id).subscribe(data => {
        resolve(data);
        console.log("vita service");
      }, err => {
        console.log(err);
      });
    });
  }
  public setExtras(data) {
    this.etudiant = data;
  }

  public getExtras() {
    return this.etudiant;
  }
  private setLocalData(key, data) {
    this.storage.set(`${API_STORAGE_KEY}-${key}`, data);
  }

  private getLocalData(key) {
    return this.storage.get(`${API_STORAGE_KEY}-${key}`);
  }
}
