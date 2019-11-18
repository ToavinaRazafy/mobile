import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from "@angular/forms";
import { Etudiant } from "src/app/modeles/etudiant";
import { Router, ActivatedRoute } from "@angular/router";
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { PromService } from "src/app/services/prom.service";

@Component({
  selector: 'app-modification',
  templateUrl: './modification.page.html',
  styleUrls: ['./modification.page.scss'],
})
export class ModificationPage implements OnInit {
  image:string;
  form: FormGroup;
  public nom: AbstractControl;
  public prenom: AbstractControl;
  public age: AbstractControl;
  public email: AbstractControl;
  public option: AbstractControl;
  id:any='';
  resultat: any;
  donne:any;
  resultat1: any;
  etudiant: Etudiant = new Etudiant();
  constructor(private route: Router,public router: ActivatedRoute, private camera: Camera, private formBuilder: FormBuilder, private service: PromService) {
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
    this.donne=this.service.getExtras();
    this.form.get('nom').setValue(this.donne.nom);
    this.form.get('prenom').setValue(this.donne.prenom);
    this.form.get('age').setValue(this.donne.age);
    this.form.get('email').setValue(this.donne.email);
    this.form.get('option').setValue(this.donne.option);
    this.image=this.donne.image;
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
      console.log("IMAGE " + this.image);
    }, (err) => {
      // Handle error
      alert("error " + JSON.stringify(err))
    });

  }
  getDetail(id) {
    if (id!=='') {
      this.service.getDetail(id)
      .then(data => {
        this.resultat1 = data;
        this.donne=this.resultat1.data;
        console.log(this.donne);
      });
    } 
  }
  onSubmit() {
    this.etudiant.id=this.donne.id;
    this.etudiant.image = this.image;
    this.etudiant.nom = this.form.get('nom').value;
    this.etudiant.prenom = this.form.get('prenom').value;
    this.etudiant.age = this.form.get('age').value;
    this.etudiant.email = this.form.get('email').value;
    this.etudiant.option = this.form.get('option').value;
    this.service.modification(this.etudiant)
      .then(data => {
        this.resultat = data;
        console.log(this.etudiant.image);
        this.route.navigate(['tabs/tabs/liste']);
      });
  }
  ngOnInit() {
  }

}
