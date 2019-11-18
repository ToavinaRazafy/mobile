import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpClient, HttpHandler, HttpRequest, HttpEvent } from "@angular/common/http";
import { AuthService } from "src/app/services/auth.service";
import { Observable } from "rxjs";
import { LoadService } from "src/app/services/load.service";
import { finalize } from "rxjs/operators";
import { LoadingController } from "@ionic/angular";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    loaderToShow: any;
    constructor(private http: HttpClient, private authenticationService: AuthService, public loadingController: LoadingController) {
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let req = request.url;
        let currentUser = this.authenticationService.currentUserValue;
        const url = "https://blooming-meadow-28826.herokuapp.com/";
        //const url = "http://localhost:5000/";
        if (!request.url.startsWith("http")) {
            request = request.clone({
                url: url + request.url
            });
            console.log(url);
        }

        if (currentUser && currentUser.token) {
            console.log(`Bearer ${currentUser.token}`);
            request = request.clone({
                setHeaders: {
                    'Authorization': `Bearer ${currentUser.token}`
                }
            });
        }
        this.showLoader();
        return next.handle(request).pipe(finalize(() => {
            this.hideLoader();
        }));
    }
    showLoader() {
        this.loaderToShow = this.loadingController.create({
            message: 'Chargement'
        }).then((res) => {
            res.present();

          /**  res.onDidDismiss().then((dis) => {
                console.log('Loading dismissed!');
            });**/
        });
        //this.hideLoader();
    }

    hideLoader() {
        this.loadingController.dismiss();
    }
}
