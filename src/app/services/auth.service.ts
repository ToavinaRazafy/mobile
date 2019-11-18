import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { Prof } from "src/app/modeles/prof";
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import {Storage} from '@ionic/storage';
import { NetworkService } from "src/app/services/network.service";
import { OfflineManagerService } from "src/app/services/offline-manager.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<Prof>;
  public currentUser: Observable<Prof>;

  constructor(private route: Router, private http: HttpClient,private networkService: NetworkService, private storage: Storage, private offlineManager: OfflineManagerService) {
    this.currentUserSubject = new BehaviorSubject<Prof>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Prof {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>("authentification", { username, password }).pipe(map(user => {
      console.log(JSON.stringify(user));
      if (user && user.token) {
        localStorage.setItem('nom', user.nom);
        localStorage.setItem('prenom', user.prenom);
        localStorage.setItem('id', user.id);
        localStorage.setItem('currentUser', JSON.stringify(user));
        console.log("service " + localStorage.getItem('currentUser'));
        this.currentUserSubject.next(user);
        return user;
      }

    }));
    console.log("service" + username);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    console.log("decoo");
    this.route.navigate(['/login']);
    
  }
}
