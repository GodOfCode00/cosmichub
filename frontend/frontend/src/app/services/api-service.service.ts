import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Login } from '../model/login';
import { user } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private commonurl=environment.url;
  token!:any;
  constructor(private http:HttpClient){}

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
      this.token=res.content.token;
      console.log(this.token);
    })
    return this.http.post(url,login);

  }
  update(updateuser:any){
    let url=`http://localhost:7000/cosmichub/user/me`;

    const headers = new HttpHeaders({ 'Authorization':'barrier'+ this.token})

    return this.http.put(url,updateuser, {headers });
  }

}
