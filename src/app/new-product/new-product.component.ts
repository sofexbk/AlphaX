import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent {

  newProductFormGroup! : FormGroup;
  constructor(private fb : FormBuilder, public productService:ProductService) { }
  ngOnInit(): void {
    this.newProductFormGroup=this.fb.group({
      name : this.fb.control(null,[Validators.required, Validators.minLength(5)]),
      price : this.fb.control(0, [Validators.required]),
      promotion : this.fb.control(false)
    });
  }
  handleAddProduct() {
    let product=this.newProductFormGroup.value;
    this.productService.saveProduct(product).subscribe({
      next :(data)=>{
        alert("Product saved successfully");
        this.newProductFormGroup.reset();
      }
    }); 
   }
  getErrorMessage(field:string, error:ValidationErrors):string{
    if(error['required']){
      return field +" is Required";
    } else if(error['minlength']){
      return field+" should have at least "+error['minlength']['requiredLength']+" Characters";
    } else return "";
  }
}
