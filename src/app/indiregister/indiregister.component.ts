import { Component, OnInit, AfterViewInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || isSubmitted));
  }
}

@Component({
  selector: 'app-indiregister',
  templateUrl: './indiregister.component.html',
  styleUrls: ['./indiregister.component.css']
})

export class IndiregisterComponent implements OnInit {
  @Input() num1: number;
  @Input() num2: number;
  @Input() num3: number;
  @Input() output: string = "Please solve the Equation";
  @Input() random: number;
  @Input() errclr: string = "#dad8d8";
  @Input() captxt: string = "#696262";
  @Input() req1: string = "false";
  @Input() req2: string = "false";
  @Input() req3: string = "false";
  @Input() username: string = "";
  @Input() useremail: string = "";
  @Input() userpasswd: string = "";

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  nameFormControl = new FormControl('', [
    Validators.required,
  ]);
  passwdFormControl = new FormControl('', [
    Validators.required,
  ]);
  checkbox = new FormControl('', [
    Validators.required,
  ]);
  hide = true;
  matcher = new MyErrorStateMatcher();
  constructor() { }

  public checkAnswer() {
   if(this.random == 1){
     if((this.num3 - this.num2) == this.num1) {
       this.errclr = "green";
       this.captxt = "green";
       this.output = "Good to go";
       return true;
     }
     else {
       this.errclr = "red";
       this.captxt = "red";
       this.output = "Invalid Equation";
       return false;
     }
   }
   if(this.random == 2){
     if((this.num3 - this.num1) == this.num2) {
       this.errclr = "green";
       this.captxt = "green";
       this.output = "Good to go";
       return true;
     }
     else {
       this.errclr = "red";
       this.captxt = "red";
       this.output = "Invalid Equation";
       return false;
     }
   }
   if(this.random == 3){
     if((this.num1 + this.num2) == this.num3) {
       this.errclr = "green";
       this.captxt = "green";
       this.output = "Good to go";
       return true;
     }
     else {
       this.errclr = "red";
       this.captxt = "red";
       this.output = "Invalid Equation";
       return false;
     }
   }
  }

  check() {
    if (this.checkAnswer() == true) {
   //console.log(this.username, this.useremail, this.userpasswd);
 }
 else {
   //console.log("wrong");
 }
  }

  ngOnInit() {
    this.errclr = "#dad8d8";
    this.captxt = "#696262";
    this.output = "Please solve the Equation";
    this.random = Math.floor((Math.random() * 3) + 1);
    if(this.random == 1) {
      this.req1 = "true";
      this.req2 = "flase";
      this.req3 = "false";
      this.num2 = Math.floor((Math.random() * 10) + 1);
      this.num3 = Math.floor((Math.random() * 50) + 10);
      this.num1 = null;
    }
    else if(this.random == 2) {
      this.req1 = "false";
      this.req2 = "true";
      this.req3 = "false";
      this.num1 = Math.floor((Math.random() * 10) + 1);
      this.num3 = Math.floor((Math.random() * 50) + 10);
      this.num2 = null;
    }
    else if(this.random == 3) {
      this.req1 = "false";
      this.req2 = "false";
      this.req3 = "true";
      this.num1 = Math.floor((Math.random() * 10) + 1);
      this.num2 = Math.floor((Math.random() * 10) + 1);
      this.num3 = null;
    }
  }
}
