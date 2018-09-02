import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../models/user.model';
import { UserService } from './user.service';

import {TokenStorage} from './token.storage';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User = new User();
  users: User[];
  email: string;
  password: string;

  constructor(private router: Router, private userService: UserService, private token: TokenStorage) {

  }

  ngOnInit() {
    /*this.userService.getUsers()
      .subscribe( data => {
        this.users = data;
      });*/
  };

  deleteUser(user: User): void {
    this.userService.deleteUser(user)
      .subscribe( data => {
        this.users = this.users.filter(u => u !== user);
      })
  };

  login(): void {
    this.userService.attemptAuth(this.user.email, this.user.password).subscribe(
      data => {
      	console.log("token is --- " + data.token);
        this.token.saveToken(data.token);
        this.router.navigate(['orders']);
      }
    );
  }
  
}
