import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { User } from '../models/user.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

  constructor(private http:HttpClient) {}

  private userUrl = 'http://localhost:8080/admin-portal/users';
  private loginUrl = 'http://localhost:8080/admin-portal/token/generate-token';
  private signUpUrl = 'http://localhost:8080/admin-portal/users/signup';

  public getUsers() {
    return this.http.get<User[]>(this.userUrl);
  }

  public deleteUser(user) {
    return this.http.delete(this.userUrl + "/"+ user.id);
  }

  public createUser(user) {
    return this.http.post<User>(this.signUpUrl, user);
  }
  
  attemptAuth(email: string, password: string): Observable<any> {
    const credentials = {email: email, password: password};
    console.log('Authentication is in progress......');
    return this.http.post(this.loginUrl, credentials);
  }
  
}
