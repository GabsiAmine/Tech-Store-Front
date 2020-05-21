import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CatalogueService } from '../service/catalogue.service';
import { Product } from '../model/Product.model';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {


  currentProduct;
  selectedFiles;
  progress: number;
  currentFileUpload: any;
  private currentTime: number;
  private editPhoto: boolean;
  private mode: number = 0;


  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    public authService: AuthenticationService,
    public catalService: CatalogueService) { }

  ngOnInit() {
    let url = atob(this.activatedRoute.snapshot.params.url);
    this.catalService.getProduct(url).subscribe(data => {
      this.currentProduct = data;
      console.log(data);

    })

  }

  onEditProduct() {
    this.mode = 1;
  }

  onEditPhoto(p) {
    this.currentProduct = p;
    this.editPhoto = true;
  }

  onSelectedFile(event) {
    this.selectedFiles = event.target.files;
  }

  uploadPhoto() {
    this.progress = 0;
    this.currentFileUpload = this.selectedFiles.item(0)
    this.catalService.uploadPhotoProduct(this.currentFileUpload, this.currentProduct.id).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        //console.log(this.router.url);
        //this.getProducts(this.currentRequest);
        //this.refreshUpdatedProduct();
        this.currentTime = Date.now();
        this.editPhoto = false;
      }
    }, err => {
      alert("Problème de chargement");
    })



    this.selectedFiles = undefined
  }

  onAddProductToCaddy(p: Product) {
    if (!this.authService.isAuthenticated) {
      this.router.navigateByUrl("/login");
    }
    else {
      // this.caddyService.addProduct(p);
    }
  }

  getTS() {
    return this.currentTime;
  }

  onProductDetails(p) {
    this.router.navigateByUrl("/product/" + p.id);
  }

  onUpdateProduct(data) {

  }

}
