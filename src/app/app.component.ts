import { Component, OnInit } from '@angular/core';
import { CatalogueService } from './service/catalogue.service';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { CaddyService } from './services/caddy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'ecom-web';
  private categories;
  private currentcategory;
  constructor(private catService: CatalogueService,
    private router: Router,
    public authService: AuthenticationService,
    public caddyService: CaddyService
  ) { }

  ngOnInit(): void {
    this.authService.loadAuthenticatedUserFromLocalStorage();
    this.getCategories();
  }

  private getCategories() {
    this.catService.getResoucre("/categories").subscribe(data => {
      this.categories = data;
    }, err => {
      console.log(err);
    })
  }

  getProductbyCategory(c) {
    this.currentcategory = c;
    this.router.navigateByUrl("/products/2/" + c.id);
  }


  selectedproducts() {
    this.currentcategory = undefined;
    this.router.navigateByUrl("/products/1/0")
  }

  onProductPromo() {
    this.currentcategory = undefined;
    this.router.navigateByUrl("/products/3/0")
  }

  onProductDispo() {
    this.currentcategory = undefined;
    this.router.navigateByUrl("/products/4/0")
  }

  onAddProduct() {
    this.router.navigateByUrl("/add-product")
  }

  onLogout() {
    this.authService.removeTokenFromLocalDtorage();
    this.router.navigateByUrl("/login")

  }

}
