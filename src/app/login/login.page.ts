import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from "src/app/services/auth.service";
import { first } from 'rxjs/operators';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  signupForm: FormGroup;
  error = '';
  submitted = false;
  public email: AbstractControl;
  public password: AbstractControl;
  resultat: any = {};
  constructor(private route: Router, private formBuilder: FormBuilder, private service: AuthService) {
    this.service.logout();
    this.signupForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.email = this.signupForm.controls['email'];
    this.password = this.signupForm.controls['password'];
  }
  public onSubmit() {
    if (this.signupForm.valid) {
      console.log("control");
      this.service.login(this.email.value, this.password.value)
        .pipe(first())
        .subscribe(
        data => {
          console.log("control" + data);
          this.route.navigate(['/']);
        },
        error => {
          console.log(error);
        });
    }
  }
  ngOnInit() {
  }

}
