import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  onLogin(dataform: any) {
    console.log(dataform);
    this.authService.login(dataform.username, dataform.password);
    if (this.authService.isAuthenticated) {
      this.authService.saveAuthenticatedUser();
      this.router.navigateByUrl('');
    }
  }

}
