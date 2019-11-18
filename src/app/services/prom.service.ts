import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Etudiant } from "src/app/modeles/etudiant";
import { BehaviorSubject, from } from "rxjs";
import { Storage } from '@ionic/storage';
import { NetworkService, ConnectionStatus } from "src/app/services/network.service";
import { OfflineManagerService } from "src/app/services/offline-manager.service";
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
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
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  } 
  getEtudiant() {
     console.log(this.networkService.getCurrentNetworkStatus());
    if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline) {
      return this.getLocalData('etudiants');
    }else{
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
    
    /** if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline) {
      return this.getLocalData('etudiants');
    }else{
        return this.http.get<Etudiant>('etudiant/findall')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
    }**/
    
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
      return this.offlineManager.storeRequest('etudiant/ajout', 'POST', etudiant);
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
      return this.offlineManager.storeRequest('etudiant/ajout', 'POST', etudiant);
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
    return this.http.delete<Etudiant>('etudiant/suppression/' + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  handleError(error) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     window.alert(errorMessage);
     return throwError(errorMessage);
  }
  public setExtras(data) {
    this.etudiant = data;
  }

  public getExtras() {
    return this.etudiant;
  }
  public setLocalData(key, data) {
    this.storage.set(`${API_STORAGE_KEY}-${key}`, data);
  }

  public getLocalData(key) {
    return this.storage.get(`${API_STORAGE_KEY}-${key}`);
  }
}
