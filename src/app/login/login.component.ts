import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userFormGroup !: FormGroup;
  errorMsg!: string;
  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService, private router: Router) { }
  ngOnInit(): void {
    this.userFormGroup = this.formBuilder.group({
      username: this.formBuilder.control(""),
      password: this.formBuilder.control("")
    });
  }
  handleLogin() {
    let username = this.userFormGroup.value.username;
    let password = this.userFormGroup.value.password;
    this.authService.login(username, password).subscribe({
      next: (appUser) => {
        this.authService.authenticateUsers(appUser).subscribe({
          next: (data) => {
            this.router.navigateByUrl("/products");
          }
        });
      },
      error: (err) => {
        this.errorMsg = err;
      }
    });
  }
}
