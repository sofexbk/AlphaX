import { FormBuilder, FormGroup } from '@angular/forms';
import { Product } from '../models/product.model';
import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Array<Product> = [];
  currentPage:number=0;
  pageSize:number=5;
  totalPages:number=0;
  errorMessage!:string;
  searchFormGroup!:FormGroup;
  currentAction:string="all";

  constructor(private productService:ProductService,private fb:FormBuilder,public authService:AuthentificationService,
    private router:Router
  ){

  }
  ngOnInit(): void {
    this.searchFormGroup=this.fb.group({
      keyword:this.fb.control(null)
    });
    
    //this.handleGetAllProducts();
    this.handleGetPagesProducts();
  }

  handleGetAllProducts(){
    this.productService.getAllProducts().subscribe({
      next:(data)=>{
        this.products=data; 
      },
      error:(err)=>{
        this.errorMessage=err;
      }
    })
  }


  
  handleGetPagesProducts(){
    this.productService.getPageProducts(this.currentPage,this.pageSize).subscribe({
      next:(data)=>{
        
        this.products=data.products;
        this.totalPages=data.totalPages; 
        //console.log(this.totalPages)
      },
      error:(err)=>{
        this.errorMessage=err;
      }
    })
  }

  handleDeleteProduct(p:Product){
    let conf=confirm("sure want to delete?")
    if(conf==false) return ;
    this.productService.deleteProduct(p.id).subscribe({
      next:(data)=>{
        //this.handleGetAllProducts();
        let index=this.products.indexOf(p);
        this.products.splice(index,1);
      },
      error: (err) => {
        this.errorMessage = err;
    }
    })
  }
  handleSetPromotion(p:Product){
    let promo=p.promotion;
    this.productService.setPromotion(p.id).subscribe({
      next:(data)=>{
        //console.log('ok')
        p.promotion=!promo;
      },
      error:err=>{
        this.errorMessage=err;
      }
    })
  }

  goToPage(i: number) {
    this.currentPage = i;
    if (this.currentAction === 'all') {
      this.handleGetPagesProducts();
    } else 
      this.handleSearchProducts(); 
  }
  
  handleSearchProducts() {
    this.currentAction="search";
    //this.currentPage=0;
    let keyword = this.searchFormGroup.value.keyword; // Get keyword from form control
    this.productService.searchProducts(keyword, this.currentPage, this.pageSize).subscribe({
      next: (data) => {
        this.products = data.products; // Update products with search results
        this.totalPages = data.totalPages; // Update total pages based on search results
      },
      error: (err) => {
        this.errorMessage = err; // Handle error
      }
    });
  }
  handleNewProduct() {
    this.router.navigateByUrl("/admin/newProduct")
  }    
  handleEditProduct(p: Product) {
    this.router.navigateByUrl("/admin/editProduct/"+p.id);
  }
}


