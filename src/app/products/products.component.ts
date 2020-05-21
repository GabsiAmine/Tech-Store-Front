import { Component, OnInit } from '@angular/core';
import { CatalogueService } from '../service/catalogue.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import { Product } from '../model/Product.model';
import { CaddyService } from '../services/caddy.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  private products;
  private editPhoto: boolean;
  private currentproduct;
  private promotion: boolean;
  private selected: boolean;
  private available: boolean;
  private selectedFiles;
  private progress: number;
  private currentFileUpload: any;
  private startupload: boolean;
  currentTime: number;
  private title: string;
  private timeStamp: number;
  constructor(
    private catService: CatalogueService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public authService: AuthenticationService,
    public caddyService: CaddyService
  ) {

  }

  ngOnInit() {

    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        let url = val.url;
        console.log(url);

        let p1 = this.activatedRoute.snapshot.params.p1;

        if (p1 == 1) {
          this.title = "Produit Selectioné"
          this.getproducts("/products/search/selectedProducts");
        } else if (p1 == 2) {
          let idCat = this.activatedRoute.snapshot.params.p2;
          this.title = "Produit Produit de la categorie" + idCat
          this.getproducts("/categories/" + idCat + "/products");
        } else if (p1 == 3) {
          this.title = "Produit en Promotion"
          this.getproducts("/products/search/promotionProducts");
        } else if (p1 == 4) {
          this.title = "Produit Disponible"
          this.getproducts("/products/search/dispoProducts");
        } else if (p1 == 5) {
          this.title = "Produit Recherché"
          this.getproducts("/products/search/dispoProducts");
        }
      }
    });

    let p1 = this.activatedRoute.snapshot.params.p1;
    if (p1 == 1) {
      this.getproducts("/products/search/selectedProducts");
    }

    this.catService.progressSource.subscribe(progress => {
      this.progress = progress;
    });
  }

  getproducts(url) {
    this.catService.getResoucre(url)
      .subscribe(data => {
        this.products = data;
      }, err => {
        console.log(err);
      })
  }

  oneditphoto(p) {
    this.currentproduct = p;
    this.editPhoto = true;
  }
  onselectedfile(event) {

    this.selectedFiles = event.target.files;
  }

  getTS() {
    return this.timeStamp;
  }

  uploadPhoto() {
    this.startupload = true;
    this.progress = 0;
    this.currentFileUpload = this.selectedFiles.item(0)
    this.catService.uploadPhotoProduct(this.currentFileUpload, this.currentproduct.id).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total);
        // alert("Fin du telechargement");
        this.timeStamp = Date.now();
        this.editPhoto = false;
      }
    }, err => {
      alert("Problème de chargement");
    })

    this.selectedFiles = undefined
  }

  onProductsDetails(p: Product) {
    let url = btoa(p._links.product.href);
    this.router.navigateByUrl("product-details/" + url);
  }

  onAddProductToCaddy(p: Product) {
    this.caddyService.addProductToCaddy(p);
  }
}
