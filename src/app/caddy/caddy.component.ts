import { Component, OnInit } from '@angular/core';
import { CaddyService } from '../services/caddy.service';
import { Caddy } from '../model/caddy.model';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-caddy',
  templateUrl: './caddy.component.html',
  styleUrls: ['./caddy.component.css']
})
export class CaddyComponent implements OnInit {

  public caddy: Caddy;

  constructor(public caddyService: CaddyService, public router: Router, public authService: AuthenticationService) { }

  ngOnInit() {
    if (!this.authService.isAuthenticated)
      this.router.navigateByUrl('/login');
    this.caddy = this.caddyService.getCaddy();
    console.log(this.caddy);
  }


}
