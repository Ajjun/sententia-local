import { Component, OnInit, AfterViewInit, OnChanges, SimpleChanges, Input, Output, ViewChild } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import {FormControl, FormGroupDirective, NgForm, Validators, NgModel} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {merge} from 'rxjs/observable/merge';
import {of as observableOf} from 'rxjs/observable/of';
import {catchError} from 'rxjs/operators/catchError';
import {map} from 'rxjs/operators/map';
import {startWith} from 'rxjs/operators/startWith';
import {switchMap} from 'rxjs/operators/switchMap';
import {MatSnackBar} from '@angular/material';
import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';
import {Keepalive} from '@ng-idle/keepalive';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || isSubmitted));
  }
}

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  profileFormVal: boolean = false;
  passwordFormVal: boolean = true;
  suscribeFormVal: boolean = true;
  userStatus: string;
  name:string;
  contact:string;
  place:string;
  gender:string = 'select';
    subs:any;
  token:string
  public apiSubscription = "/api/subscription";
  public apiSignout = "/api/signout";
  public apiUserDetails = "/api/modify_user";
  @Input() plan: string;
  @Input() startDate:string;
  @Input() endDate:string;
  SettingName: string = "Profile";

  passwdFormControl = new FormControl('', [
    Validators.required,
  ]);
  newpasswdFormControl = new FormControl('', [
    Validators.required,
  ]);
  conpasswdFormControl = new FormControl('', [
    Validators.required,
  ]);
  hide = true;
  matcher = new MyErrorStateMatcher();

  //@ViewChild("nameInp") inputEl: ElementRef;

  constructor(private http: HttpClient, private router: Router, public snackBar: MatSnackBar, private idle: Idle) { }

  public userSubscription() {
  this.profileFormVal = true;
  this.passwordFormVal = true;
  this.suscribeFormVal = false;
  this.SettingName = "Subscription"
  this.idle.watch();
  }

public profileClick() {
  this.profileFormVal = false;
  this.passwordFormVal = true;
  this.suscribeFormVal = true;
  this.SettingName = "Profile"
  this.idle.watch();
}

public passwordClick() {
  this.profileFormVal = true;
  this.passwordFormVal = false;
  this.suscribeFormVal = true;
  this.SettingName = "Change password"
  this.idle.watch();
}

  public apiChangePass = "/api/change_password";
  newPass: string;
  confirmPass: string;
  userpasschange: boolean = true;
  notsame: boolean = false;
  PassColor: string;
  passworderr:string;
  oldPass: string;

  public CkeckPass() {
    if (this.newPass == this.confirmPass) {
      this.userpasschange = false;
          this.notsame = false;
          this.idle.watch();
    }
    else  {
          this.userpasschange = true;
          this.PassColor = 'red';
          this.passworderr = "Password is not same";
          this.notsame = true;
          setTimeout(()=>{this.notsame = false;}, 10000);
          this.idle.watch();
        }
  }

  public ChangePass() {
    if (this.newPass !=undefined && this.oldPass !=undefined && this.confirmPass !=undefined) {
      this.notsame = false;
      let updatePassBody = new URLSearchParams();
    updatePassBody.append('userid', this.userStatus);
    updatePassBody.append("current_pwd", this.oldPass);
    updatePassBody.append("n_pwd", this.newPass);
    let updatePassoptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')}; 
    this.http.post(this.apiChangePass, updatePassBody.toString(), updatePassoptions).subscribe((res:any)=> {
      //console.log("new Pass res:- ",res.status);
      if(res.status=="Your Password changed Successfully...")
      {
      this.notsame = true;
      this.PassColor = 'green';
      this.passworderr = res.status;
      setTimeout(()=>{this.notsame = false;}, 5000);
      this.newPass = '';
      this.oldPass = '';
      this.confirmPass = '';
      this.userpasschange = true;
      this.idle.watch();
      }
      else {
      this.notsame = true;
      this.PassColor = 'red';
      this.passworderr = "Error while changing your password. Please contact EunoiaLabs Service team.";
      setTimeout(()=>{this.notsame = false;}, 5000);
      this.idle.watch();
      }
    },
    err => {
       //console.log("error occured");
    }
    );
    } else {
      this.PassColor = 'red';
      this.passworderr = "Mandatory fields cannot be empty.";
      this.notsame = true;
      setTimeout(()=>{this.notsame = false;}, 5000);
    }
  }

  public SignOut() {
    //console.log('sigining out');
    this.userStatus = localStorage.getItem('loginid');
    let signoutBody = new URLSearchParams();
      signoutBody.set('userid', this.userStatus);
        let signoutOptions = {
          headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')};
          this.http.post(this.apiSignout, signoutBody.toString(), signoutOptions).subscribe(res => {
          //console.log(res);
            
      localStorage.removeItem('loginstatus');
        localStorage.removeItem('loginid');
        localStorage.removeItem('token');
      this.router.navigateByUrl('/signin');
          },
          err => {
            //console.log("Error Occured");
          }
      );
  }

  public userDetails(){
    let subscriptionBody = new URLSearchParams();
    subscriptionBody.set('usermail', this.userStatus);
    let subscriptionOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')};
      this.http.post(this.apiUserDetails, subscriptionBody.toString(), subscriptionOptions).subscribe(res => {
        //console.log( res);
        //console.log("name, contact, place, gen", res[0].name, res[0].contact, res[0].place, res[0].gen);
        this.name = res[0].name;
        this.contact = res[0].contact;
        //this.place = res[0].place;
        //this.gender = res[0].gen;
        //   if (this.name == "null") {
        //   this.name = '';
        // }
        // if (this.contact == "null") {
        //   this.contact = '';
        // }
        // if (this.place == "null") {
        //   this.place = '';
        // }
        // if (this.gender == "null") {
        //   this.gender = 'select';
        // }
      },
      err => {
        //console.log("Error Occured");
      }
    );

  }

  public openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

  private timeoutId() {
     setTimeout(() => {  
    this.SignOut();
  }, 4000);
  }

  ngOnInit() {
    this.userStatus = localStorage.getItem('loginid');
    this.token = localStorage.getItem('token');
    //console.log(this.userStatus);
    let subscriptionBody = new URLSearchParams();
    subscriptionBody.set('userid', this.userStatus);
    subscriptionBody.set('token', this.token);
    let subscriptionOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')};
      this.http.post(this.apiSubscription, subscriptionBody.toString(), subscriptionOptions).subscribe(res => {
        //console.log( res);
      this.subs=res;
      if (Object.values(res)[0] == 'expired') {
      this.openSnackBar('Session Expired.Please signin to continue', '');
       this.timeoutId();
      }
      else {
      ////console.log('plan :- ', this.subs.plan, 'start date :- ', this.subs.start, 'end date :- ', this.subs.end);
      this.plan = this.subs.plan;
      this.startDate = this.subs.start;
      this.endDate = this.subs.end;
      this.userDetails();
      }

      },
      err => {
        //console.log("Error Occured");
      }
    );
  }

}
