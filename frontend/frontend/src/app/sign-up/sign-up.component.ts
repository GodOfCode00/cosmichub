import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { user } from '../model/user';
import { ToastrService } from 'ngx-toastr';
import { ApiServiceService } from '../services/api-service.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private route:Router,private toast:ToastrService,private service:ApiServiceService) { }


signupUser!:user;
confirmPassword!:string
  ngOnInit(): void {
  this.signupUser=new user();
  this.confirmPassword=this.confirmPassword;


  }
  signedup(){

    if(this.signupUser.email==undefined){
      this.toast.error("email not there","error")
    }

    else if(this.signupUser.password!=this.confirmPassword || this.confirmPassword==undefined||this.signupUser.password==undefined){
      this.toast.error("Password","error")
    }


    else{
      if(this.signupUser.firstname==undefined|| this.signupUser.lastname==undefined){
        this.toast.warning("Enter First and Last name","error")
      }
      else{

        this.toast.success("signup ","success");
        this.service.signup(this.signupUser).subscribe((res:any)=>{console.log(res)});
        console.log(this.signupUser);
        this.route.navigate(['/login']);
    }
  }

  }

}
