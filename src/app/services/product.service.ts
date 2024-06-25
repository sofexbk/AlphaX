import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { PageProducts, Product } from '../models/product.model';
import { UUID } from 'angular2-uuid';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products!:Array<Product>;
  constructor() {
    this.products=[
      {id:UUID.UUID(),name:"Computer",price:1500,promotion:true},
      {id:UUID.UUID(),name:"Momputer",price:1500,promotion:false}
    ];
    for (let i =0; i <10 ; i++) {
      this.products.push({id : UUID.UUID(), name : "Computer", price : 5400, promotion :true},)
      this.products.push({id : UUID.UUID(), name : "Printer", price : 1200, promotion : false})
      this.products.push({id : UUID.UUID(), name : "Smart phone", price : 9000, promotion : true})
    }
  }
  public getAllProducts():Observable<Product[]>{
    /*let rnd=Math.random();
    if(rnd<0.5) return throwError(()=>new Error("Internal error made by me"))
    else*/ 
    return of(this.products);
  }
  public getPageProducts(page:number,size:number):Observable<PageProducts>{
    let index=page*size;
    let totalPages=~~(this.products.length/size);
    if(this.products.length%size!=0) totalPages++;
    let pageProducts=this.products.slice(index,index+size);
    return of({page:page,size:size,totalPages:totalPages,products:pageProducts});
  }
  public deleteProduct(id:string):Observable<boolean>{
    this.products=this.products.filter(p=>p.id!=id);
    return of(true);
  }
  public setPromotion(id:string):Observable<boolean>{
    let product=this.products.find(p=>p.id==id);
    if (product) {
      product.promotion = !product.promotion; 
      return of(true);
    }
    else { return throwError(()=>new Error("Product not found"));}
  }
  public searchProducts(keyword:string, page: number, size :number):Observable<PageProducts>{
    let result=this.products.filter(p=>p.name.includes(keyword));
    let index = page*size;
    let totalPages=~~(result.length/size);
    if(this.products.length % size !=0) totalPages++;
    let pageProducts =result.slice(index,index+size);
    return of({page:page,size:size,totalPages:totalPages,products:pageProducts});
  }
}


