import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent {
  productId! : string ;
  editProductGroup! : FormGroup;
  errorMessage! : string ;
  product!:Product;
  constructor(private fb : FormBuilder, public prodService : ProductService, private route : ActivatedRoute) {
    this.productId=this.route.snapshot.params['id'];
   }
   ngOnInit(): void{
    this.productId=this.route.snapshot.params['id'];
    if(this.productId){
      this.prodService.getProduct(this.productId).subscribe({
        next :(product)=>{
          this.product=product;
          this.editProductGroup=this.fb.group({
            name : this.fb.control(this.product.name,[Validators.required, Validators.minLength(5)]),
            price : this.fb.control(this.product.price, [Validators.required]),
            promotion : this.fb.control(this.product.promotion, [Validators.required]),
          });
          
        },
       error : err => {
          console.log(err);
          this.errorMessage=err;
       }
      });
    }
  }
  handleUpdateProduct() {
    let p=this.editProductGroup.value;
    p.id=this.product.id;
    this.prodService.updateProduct(p).subscribe({
      next : (data)=>{
        alert("Product has been successfully updated");
      }, error : err => {
        this.errorMessage=err;
      }
    })
  }
}
