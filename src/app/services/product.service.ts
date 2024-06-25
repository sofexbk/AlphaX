import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products!:Array<Product>;
  constructor() {
    this.products=[
      {id:1,name:"Computer",price:1500,promotion:true},
      {id:2,name:"Computer",price:1500,promotion:false}
   
    ];
  }
  public getAllProducts():Observable<Product[]>{
    /*let rnd=Math.random();
    if(rnd<0.5) return throwError(()=>new Error("Internal error made by me"))
    else*/ 
    return of(this.products);
  }
  public deleteProduct(id:number):Observable<boolean>{
    this.products=this.products.filter(p=>p.id!=id);
    return of(true);
  }
  public setPromotion(id:number):Observable<boolean>{
    let product=this.products.find(p=>p.id==id);
    if (product) {
      product.promotion = !product.promotion; 
      return of(true);
    }
    else { return throwError(()=>new Error("Product not found"));}
  }

}


