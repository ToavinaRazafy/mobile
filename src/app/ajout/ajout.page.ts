import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FormGroup, AbstractControl, FormBuilder, Validators } from "@angular/forms";
import { PromService } from "src/app/services/prom.service";
import { Etudiant } from "src/app/modeles/etudiant";
import { Router } from "@angular/router";

@Component({
  selector: 'app-ajout',
  templateUrl: './ajout.page.html',
  styleUrls: ['./ajout.page.scss'],
})
export class AjoutPage implements OnInit {
  image: any = '';
  form: FormGroup;
  public nom: AbstractControl;
  public prenom: AbstractControl;
  public age: AbstractControl;
  public email: AbstractControl;
  public option: AbstractControl;
  resultat :any;
  etudiant: Etudiant= new Etudiant();
  constructor(private route: Router,private camera: Camera, private formBuilder: FormBuilder,private service: PromService) {
    this.form = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      age: ['', Validators.required],
      email: ['', Validators.required],
      option: ['Developpement', Validators.required]
    });
    this.nom = this.form.controls['nom'];
    this.prenom = this.form.controls['prenom'];
    this.age = this.form.controls['age'];
    this.option = this.form.controls['option'];
    this.email = this.form.controls['email'];
  }
  openCam() {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      //alert(imageData)
      this.image = (<any>window).Ionic.WebView.convertFileSrc(imageData);
      console.log("IMAGE "+this.image);
    }, (err) => {
      // Handle error
      alert("error " + JSON.stringify(err))
    });

  }
   onSubmit(){
     this.etudiant.image=this.image;
     this.etudiant.nom=this.form.get('nom').value;
     this.etudiant.prenom=this.form.get('prenom').value;
     this.etudiant.age=this.form.get('age').value;
     this.etudiant.email=this.form.get('email').value;
     this.etudiant.option=this.form.get('option').value;
    this.service.ajout(this.etudiant)
    .then(data => {
      this.resultat = data;
      console.log(this.resultat.status);
       console.log(this.resultat.message);
      console.log(this.etudiant.image);
      this.route.navigate(['tabs/tabs/liste']);
    });
  }
  ngOnInit() {
  }

}
