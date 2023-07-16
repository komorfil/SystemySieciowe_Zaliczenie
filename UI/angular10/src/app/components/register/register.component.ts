import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  repeatPass: string = 'none';
  displayMsg: string | null = null;
  isAccountCreated: boolean = false;

  constructor(private authService: AuthService) {}

  registerForm = new FormGroup({
    firstname: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern('[a-zA-Z].*'),
    ]),
    lastname: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern('[a-zA-Z].*'),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobile: new FormControl('', [
      Validators.required,
      Validators.pattern("[0-9]*"),
      Validators.minLength(9),
      Validators.maxLength(9),
    ]),
    gender: new FormControl('', [Validators.required]),
    pwd: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15),
    ]),
    rpwd: new FormControl('')
  });

  registerSubmitted() {
    if (this.PWD.value === this.RPWD.value) {
      console.log('Form is valid:', this.registerForm.valid);
      this.repeatPass = 'none';
      this.displayMsg = null; // Reset the display message
      this.isAccountCreated = false; // Reset the account created flag

      const user = [
        this.FirstName.value,
        this.LastName.value,
        this.Email.value,
        this.Mobile.value,
        this.Gender.value,
        this.PWD.value
      ];

      console.log('User:', user);

      this.authService.registerUser(user).subscribe(res => {
        console.log('Response:', res);
        let responseMsg = res + '';
        console.log(responseMsg);
        
        if (responseMsg === '"Success"') {
          console.log('Account created successfully!');
          this.displayMsg = 'Account created successfully!';
          this.isAccountCreated = true;
        } else if (responseMsg === '"Already exists"') {
          console.log('Account already exists. Try another Email.');
          this.displayMsg = 'Account already exists. Try another Email.';
          this.isAccountCreated = false;
        } else {
          console.log('Something went wrong');
          this.displayMsg = 'Something went wrong';
          this.isAccountCreated = false;
        }
      });
    } else {
      this.repeatPass = '"inline"';
      console.log('Passwords do not match');
      this.displayMsg = 'Passwords do not match';
      this.isAccountCreated = false;
    }
  }

  get FirstName(): FormControl {
    return this.registerForm.get('firstname') as FormControl;
  }

  get LastName(): FormControl {
    return this.registerForm.get('lastname') as FormControl;
  }

  get Email(): FormControl {
    return this.registerForm.get('email') as FormControl;
  }

  get Mobile(): FormControl {
    return this.registerForm.get('mobile') as FormControl;
  }

  get Gender(): FormControl {
    return this.registerForm.get('gender') as FormControl;
  }

  get PWD(): FormControl {
    return this.registerForm.get('pwd') as FormControl;
  }

  get RPWD(): FormControl {
    return this.registerForm.get('rpwd') as FormControl;
  }
}