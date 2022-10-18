import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { user } from '../model/user';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IfStmt } from '@angular/compiler';
import { main } from '@popperjs/core';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  closeResult = '';
  constructor(private service:ApiServiceService,private modalService: NgbModal,private route:Router) { }
   alluser:user[]=[];
   totalLength:any;
   show:boolean=false;
   deleteclicked:boolean=false;
  page:number=1;
  ngOnInit(): void {

  this.getuser();
  }
  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  getuser(){
    this.service.getall().subscribe((res:any)=>{
      console.log(res);
       this.alluser=res.content.data;
       console.log(this.alluser);
       this.totalLength=this.alluser.length;
    })
  }
  update(received:user){
      console.log(received);
      this.service.update(received).subscribe((res:any)=>{
      console.log(res);
      console.log("updated")
      })
   }
  logout(){
    localStorage.removeItem("token");
    this.route.navigate(['/login']);
  }
  delete(){
   this.deleteclicked=true;


  }
  confirmdelete(){
   this.deleteclicked=false;
   this.service.delete().subscribe((res:any)=>{
   this.getuser();

})
  }
  toogle(){
    this.show=!this.show;
    console.log("Toogle called")
  }
  getMe(){
   this.service.getMe().subscribe((res:any)=>{
    console.log(res.content.data);
   })
  }
  oninputfile(event:any){
    console.log(event)

  }


}
