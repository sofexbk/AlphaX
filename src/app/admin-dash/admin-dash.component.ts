import { Router } from '@angular/router';
import { AuthentificationService } from './../services/authentification.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dash',
  templateUrl: './admin-dash.component.html',
  styleUrls: ['./admin-dash.component.css']
})
export class AdminDashComponent {
handleLogout() {
  this.authService.logout().subscribe({
    next:(data)=>{
      this.router.navigateByUrl("/login")
    }
  })

}

  constructor(public authService: AuthentificationService,private router:Router) { }

}
