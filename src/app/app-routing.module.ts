import { EditProductComponent } from './edit-product/edit-product.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { CostumersComponent } from './costumers/costumers.component';  
import { LoginComponent } from './login/login.component';
import { AdminDashComponent } from './admin-dash/admin-dash.component';
import {AuthentificationGuard } from "./guards/authentification.guard";
import { NewProductComponent } from './new-product/new-product.component';


const routes: Routes = [ 
  {path:"login",component:LoginComponent},
  {path:"",component:LoginComponent},
  {path:"admin",component:AdminDashComponent,canActivate : [AuthentificationGuard ],children:[
    {path:"products",component:ProductsComponent},
    {path:"costumers",component:CostumersComponent},
    {path : "newProduct" , component : NewProductComponent},
    {path : "editProduct/:id" , component : EditProductComponent}

  ]},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
