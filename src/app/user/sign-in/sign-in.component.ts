import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
data:any={}
  constructor(private userService: UserService,private router : Router) { }

  model ={
    email :'',
    password:''
  };
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages: string;
  ngOnInit() {
    // if(this.userService.isLoggedIn())
    // this.router.navigate(['/userprofile']);
  }

  onSubmit(form : NgForm){

    console.log('dato')
    this.userService.login(form.value).subscribe(
      (res) => {
        // var data=res
        this.data=res
        let token=this.data.sessionTokenBck
        console.log('loginn ',token)
          this.userService.setToken(token);
        this.router.navigateByUrl('userprofile');
      },
      err => {
        this.serverErrorMessages = err.error.message;
      }
    );
  }

}
