import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthentificationService } from '../services/authentification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userFormGroup! :FormGroup;
  
  
  constructor(private fb :FormBuilder,private authService :AuthentificationService,private router:Router){}
  
  ngOnInit():void{
    this.userFormGroup=this.fb.group({
      username:this.fb.control(""),
      password:this.fb.control("")
    })
  }

  handleLogin() {
    let username=this.userFormGroup.value.username;
    let password=this.userFormGroup.value.password;
    this.authService.login(username,password).subscribe({
      next : (data)=>{
        this.authService.authenticateUser(data).subscribe({
          next : (data)=>{
            this.router.navigateByUrl("/admin");
          }
        })
      }
    })
  }
}
