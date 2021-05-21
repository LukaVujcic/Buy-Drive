import { Component, OnInit } from '@angular/core';
import { LoggedUsersService } from '../services/logged-users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  logIn = false;
  isAdmin = false;

  constructor(private logged: LoggedUsersService, private router: Router) {
    if (this.logged.get_token() != null){
      this.logIn = true;
    }
   }

  ngOnInit(): void {
    this.logged.log.subscribe(login_is_admin => {
      this.logIn = login_is_admin[0];
      this.isAdmin = login_is_admin[1];
    });
  }

  public logout(){
    this.logged.logout();
    this.logIn = false;
    this.router.navigate(['/login']);
  }

}
