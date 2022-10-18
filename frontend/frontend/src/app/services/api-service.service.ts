import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';
import { Login } from '../model/login';
import { user } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private commonurl=environment.url;
  token!:any;
  constructor(private http:HttpClient){}

  isLogedIn(){
    return !!localStorage.getItem("token");
  }
  signup(prana:user){
    console.log("prana");
    let url=`http://localhost:7000/cosmichub/user/signup`
  return this.http.post(url,prana);
  }
  getall(){
    console.log("signup called");
    let url=`http://localhost:7000/cosmichub/user`;
    return this.http.get(url);
  }
  login(login:Login){
    let url=`http://localhost:7000/cosmichub/user/signin`;
    this.http.post(url,login).subscribe((res:any)=>{
      this.token='x-access-token:'+res.content.token;

    })
    return this.http.post(url,login);

  }
  update(updateuser:any){
    console.log(this.token);

    return this.http.put(
      'http://localhost:7000/cosmichub/user/me',
     updateuser,{headers: this.token}
  );
  }
  delete(){
    console.log(this.token)
    let url=`http://localhost:7000/cosmichub/user/me`;
    return this.http.delete(url,{headers:this.token});
  }
  getMe(){
    let url=`http://localhost:7000/cosmichub/user/me`;
    return  this.http.get(url,{headers:this.token})
  }

}
