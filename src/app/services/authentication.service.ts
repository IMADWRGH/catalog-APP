import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { UUID } from 'angular2-uuid';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  users: User[] = [];
  authenticateUser: User | undefined;
  constructor() {
    this.users.push({ userID: UUID.UUID(), username: "user1", password: "123", roles: ["USER"] });
    this.users.push({ userID: UUID.UUID(), username: "user2", password: "123", roles: ["USER"] });
    this.users.push({ userID: UUID.UUID(), username: "user3", password: "123", roles: ["USER", "ADMIN"] });
  }
  public login(username: string, password: string): Observable<User> {
    let appUser = this.users.find(value => value.username == username);
    if (!appUser) return throwError(() => new Error("User not found"));
    if (appUser.password != password) return throwError(() => new Error("Bad credentials"));
    return of(appUser);
  }
  public authenticateUsers(appUser: User): Observable<boolean> {
    this.authenticateUser = appUser;
    localStorage.setItem("authUser", JSON.stringify({ username: appUser.username, roles: appUser.roles, jwt: "JWT_TKEN" }));
    return of(true);
  }
  public hasRole(role: string): boolean {
    return this.authenticateUser!.roles.includes(role);
  }
  public isAuthenticated() {
    return this.authenticateUser != undefined;
  }
}
