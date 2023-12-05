import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { Role } from '../model/role.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /* users: User[] = [{"username":"admin","password":"123","roles":['ADMIN']},
  {"username":"tasnime","password":"123","roles":['USER']} ];*/
  apiURL: string = 'http://localhost:8081/users';
  token!: string;
  private helper = new JwtHelperService();
  public loggedUser!: string;
  public isloggedIn: Boolean = false;
  public roles!: string[];
  public regitredUser : User = new User();
  constructor(private router: Router, private http: HttpClient) {//i added this for the logout
    this.isloggedIn = !!this.token;
  }

  setRegistredUser(user : User){
  this.regitredUser=user;
  }
  getRegistredUser(){
  return this.regitredUser;
  }
  login(user: User) {
    return this.http.post<User>(this.apiURL + '/login', user, {
      observe: 'response',
    });
  }
  saveToken(jwt: string) {
    localStorage.setItem('jwt', jwt);
    this.token = jwt;
    this.isloggedIn = true;
    localStorage.setItem('isLoggedIn', `${this.isloggedIn}`);
    this.decodeJWT();
  }

  isUserLoggedIn(): Boolean {
    return this.isloggedIn;
  }

  decodeJWT() {
    if (this.token == undefined)
      //si il nya pas de token je quitte
      return;
    const decodedToken = this.helper.decodeToken(this.token); //si non je vais declarer qui va recevoir le resultat de decoetoken de helper qui est une instance de l'objet helper declarer au debut
    this.roles = decodedToken.roles; //min hne bech na3rf role se trouve dans jwtauthenticationfilter fy users
    console.log('roles ' + this.roles);
    this.loggedUser = decodedToken.sub; //sub houa subject cest le nom de l'utilistateur
  }
  loadToken() {
    this.token = localStorage.getItem('jwt')!; //elle va recuperer le token a partir de local storge
    this.decodeJWT();
    this.isloggedIn = !!this.token;
     
  }
  isTokenExpired(): Boolean {
    return this.helper.isTokenExpired(this.token);
  }
  getToken(): string {
    return this.token;
  }

  /*SignIn(user :User):Boolean{
    let validUser: Boolean = false;
    this.users.forEach((curUser) => {
    if(user.username== curUser.username && user.password==curUser.password) {
    validUser = true;
    this.loggedUser = curUser.username;
    this.isloggedIn = true;
    this.roles = curUser.roles;
    localStorage.setItem('loggedUser',this.loggedUser);
    localStorage.setItem('isloggedIn',String(this.isloggedIn));
    }
    });
    return validUser;
    }*/
  isAdmin(): Boolean {
    if (!this.roles)
      //this.roles== undefiened
      return false;
    return this.roles.indexOf('ADMIN') >= 0; //indexof 5ater tableau ya3ni cette chaine admin exist dans tableau role
  }
  logout() {
    this.loggedUser = undefined!;
    this.roles = undefined!;
    this.token = undefined!;
    this.isloggedIn = false;
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }
  setLoggedUserFromLocalStorage(login: string) {
    this.loggedUser = login;
    this.isloggedIn = true;
    //this.getUserRoles(login);
  }
  /* getUserRoles(username :string){
          this.users.forEach((curUser) => {
          if( curUser.username == username ) {
          this.roles = curUser.roles;
          }
          });
        } */
        registerUser(user :User){
          return this.http.post<User>(this.apiURL+ '/register', user, 
          {observe:'response'});
          }
          validateEmail(code : string){
            return this.http.get<User>(this.apiURL+'/verifyEmail/'+code);
            }
            deleteUser(id: number) {
              let jwt=this.getToken();
              jwt="Bearer "+jwt;
              let httpHeaders=new HttpHeaders({"Authorization":jwt})
              const url=`${this.apiURL}/deleteUserById/${id}`
              return this.http.delete(url,{headers:httpHeaders});
              }
              AddRoleForUser(id:number,r:Role):Observable<User>
              {
                let jwt = this.getToken();
                jwt = "Bearer "+jwt;
                let httpHeaders = new HttpHeaders({"Authorization":jwt})
                const url=`${this.apiURL}/addRole/${id}`
                return this.http.post<User>(url,r, {headers:httpHeaders});
          
              }
          
              removeRoleFromUser(id:number,r:Role):Observable<User>
              {
                let jwt = this.getToken();
                jwt = "Bearer "+jwt;
                let httpHeaders = new HttpHeaders({"Authorization":jwt})
                const url=`${this.apiURL}/removeRoleFromUer/${id}`
                return this.http.post<User>(url,r, {headers:httpHeaders});
          
              }
          
              consulterUser(id: number): Observable<User> {
                let jwt = this.getToken();
                jwt = "Bearer "+jwt;
                let httpHeaders = new HttpHeaders({"Authorization":jwt})
                const url = `${this.apiURL + '/findUserById'}/${id}`;
                return this.http.get<User>(url,{headers:httpHeaders});
                }
}
