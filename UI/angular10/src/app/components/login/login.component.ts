import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private loginAuth: AuthService) {}

  loginForm = new FormGroup ({
    email: new FormControl('', [Validators.required, Validators.email]),
    pwd: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15),
    ])
  });

  isUserValid: boolean = false;

  loginSubmitted() {
    this.loginAuth
      .loginUser([this.Email.value, this.PWD.value])
      .subscribe(res => {
        if (res == 'Failure') {
          this.isUserValid = false;
          alert('Login unsuccessful');
        } else {
          this.isUserValid = true;
          alert('Login successful');
        }
      });
  }
  
  get Email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }
  
  get PWD(): FormControl {
    return this.loginForm.get('pwd') as FormControl;
  }
}
