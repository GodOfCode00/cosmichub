import { Component, OnInit } from '@angular/core';
import { Login } from '../model/login';
import { ApiServiceService } from '../services/api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private service:ApiServiceService,private router:Router) { }
  validUser!:Login

  ngOnInit(): void {
    this.validUser=new Login();
    this.getll();

  }
  login(validUser:Login){
    this.service.login(validUser).subscribe((res:any)=>{
      console.log(res.content.token);
      this.router.navigate(['/dashboard']);
    })


  }
  getll(){
    this.service.getall().subscribe((res:any)=>{
      console.log(res)
    })
  }

}
