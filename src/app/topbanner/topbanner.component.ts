import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { AuthService } from '@/_services/auth.service';
import { Router } from '@angular/router';

import { User } from '@/_models/user';

@Component({
  selector: 'app-topbanner',
  templateUrl: './topbanner.component.html',
  styleUrls: ['./topbanner.component.css']
})
export class TopbannerComponent implements OnInit {
  currentUser: User;

  constructor(
    private router: Router, 
    private authenticationService : AuthService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
   }

  ngOnInit(): void {
    
  }

  checkLoggedIn(){
    return this.authenticationService.currentUserValue != null;
  }
  
  logout(){
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }
}
