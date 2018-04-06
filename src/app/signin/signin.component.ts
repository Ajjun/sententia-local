import { Component, OnInit, AfterViewInit, OnChanges, SimpleChanges, Input, Output } from '@angular/core';
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
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { UserdetailsService } from '../userdetails.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || isSubmitted));
  }
}

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent implements OnInit {

  loginInfo: loginInfodata[] = [];
  @Input() num1: number;
  @Input() num2: number;
  @Input() num3: number;
  @Input() output: string = "Please solve the Equation";
  @Input() random: number;
  @Input() errclr: string = "#dad8d8";
  @Input() captxt: string = "#696262";
  @Input() txtclr: string = "#696262";
  @Input() req1: string = "false";
  @Input() req2: string = "false";
  @Input() req3: string = "false";


  userStatus: string;
  RouteVal: string;
  userid: string;
  userpass: string;
  name:string;
  contact:string;
  place:string;
  gender:string;
  regUseremail: string;
  verifyThisOTP: string;
  forgotEmail: string;
  frgtPwdEmail: string;
  frgtpwdVerifyOTP: string;
  password1Confirm: string;
  username: string;
  userpasswd: string;
  planAmount: string;
  str_pay: string;
  paymentObjData: paymentData[]=[];
  items: Array<any> = []
  progressbar: boolean = false;

  YearlyTickDispVal: boolean = false;
  YearlyPlanTxtActiveVal: boolean = true;
  YearlyRsActiveVal: boolean = true;
  YearlyPlanCalActiveVal: boolean = true;
  YearlyPlanBGSepActiveVal: boolean = true;
  YearlyPlanBGActiveVal: boolean = true;
  YearlyCalTopPinActiveVal: boolean = true;

  MonthlyTickDispVal: boolean = true;
  MonthlyPlanTxtActiveVal: boolean = false;
  MonthlyRsActiveVal: boolean = false;
  MonthlyPlanCalActiveVal: boolean = false;
  MonthlyPlanBGSepActiveVal: boolean = false;
  MonthlyPlanBGActiveVal: boolean = false;
  MonthlyCalTopPinActiveVal: boolean = false;
  newMail: string;




  public signin = true;
  public registerMe = false;
  public forgotPass = false;
  public sen_pricing = false;
  public alreadyReg = false;
  public verifyOTP = false;
  public wrongOTP = false;
  public notRegistered = false;
  public verifyOTPFrgtpwd = false;
  public confirmPassword = false;
  public apiLoginData = "/api/"
  public apiemailcheck = "/api/email_avail"
  public sendOTP = "/api/registerOTP"
  public verifyOTPData = "/api/verifyOTP"
  public sendOTPFrgtPwd = "/api/forgototp"
  public confirmPAss = "/api/resetpass"
  public proceedPay = "/api/paymentregister"


  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwdFormControl = new FormControl('', [
    Validators.required,
  ]);


  regEmailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  regNameFormControl = new FormControl('', [
    Validators.required,
  ]);
  regPasswdFormControl = new FormControl('', [
    Validators.required,
  ]);
  checkbox = new FormControl('', [
    Validators.required,
  ]);
  FpwdemailControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  verifyOTPControl = new FormControl('', [
    Validators.required,
  ]);

  hide = true;
  matcher = new MyErrorStateMatcher();


  constructor(private sanitizer: DomSanitizer, private router: Router, private http: HttpClient, public Userdetails: UserdetailsService) {

     this.items = [
      { name: './assets/images/thumb7.jpg' },
      { name: './assets/images/thumb2.jpg' },
      { name: './assets/images/thumb3.jpg' },
      { name: './assets/images/thumb4.jpg' },
      { name: './assets/images/thumb5.jpg' },
      { name: './assets/images/thumb6.jpg' },
      { name: './assets/images/thumb7.jpg' },
      { name: './assets/images/thumb2.jpg' },
      { name: './assets/images/thumb3.jpg' },
      { name: './assets/images/thumb4.jpg' },
      { name: './assets/images/thumb5.jpg' },
      { name: './assets/images/thumb6.jpg' },
    ]
   }

   public scrollFun(id) {
     var featureDiv = document.getElementById(id);
     featureDiv.scrollIntoView({behavior: "smooth", block: "center", inline: "end"});
     return 1;
   }

  public callRegister(): void {
      this.signin = false;
      this.registerMe = true;
      this.forgotPass = false;
      this.sen_pricing = false;
      this.alreadyReg = false;
      this.verifyOTP = false;
      this.notRegistered = false;
      this.verifyOTPFrgtpwd = false;
      this.confirmPassword = false;
  }

  public callAllreadyMember(): void {
    this.signin = true;
    this.registerMe = false;
    this.forgotPass = false;
    this.sen_pricing = false;
    this.alreadyReg = false;
    this.verifyOTP = false;
    this.notRegistered = false;
    this.verifyOTPFrgtpwd = false;
    this.confirmPassword = false;
  }

  public frgtPwd(): void {
    this.forgotPass = true;
    this.signin = false;
    this.registerMe = false;
    this.sen_pricing = false;
    this.alreadyReg = false;
    this.verifyOTP = false;
    this.notRegistered = false;
    this.verifyOTPFrgtpwd = false;
    this.confirmPassword = false;

  }



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

 public callVerifyOTP(): void {

   let veryfyOTPBody = new URLSearchParams();
       veryfyOTPBody.append('usr', this.regUseremail);
       veryfyOTPBody.append('otp', this.verifyThisOTP);
   let verifyOTPoptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')}; 
      this.http.post(this.verifyOTPData, veryfyOTPBody.toString(), verifyOTPoptions).subscribe((res:any)=> {

        ////console.log("verifyotp", res);

        if (res == true) {
          // valid OTP
          this.sen_pricing = true;
          this.forgotPass = false;
          this.signin = false;
          this.registerMe = false;
          this.alreadyReg = false;
          this.verifyOTP = false; 
          this.notRegistered = false;
          this.verifyOTPFrgtpwd = false;
          this.confirmPassword = false;
          ////console.log("valid OTP");         
        } else {
          ////console.log("Wrong OTP"); 
          this.wrongOTP = true;
          this.verifyOTP = true;
          this.txtclr = "red";
          // Wrong OTP

        }

      },
      err => {
         //console.log("error occured. with otp");
       }
      );


 }


  public callVerifyOTPFPwd(): void {

   let veryfyOTPFPwdBody = new URLSearchParams();
       veryfyOTPFPwdBody.append('usr', this.frgtPwdEmail);
       veryfyOTPFPwdBody.append('otp', this.frgtpwdVerifyOTP);
   let verifyOTPFPwdoptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')}; 
      //console.log("verifyOTPData", this.verifyOTPData);
      //console.log("veryfyOTPFPwdBody", veryfyOTPFPwdBody.toString());
      this.http.post(this.verifyOTPData, veryfyOTPFPwdBody.toString(), verifyOTPFPwdoptions).subscribe((res:any)=> {

        //console.log("verifyotp", res);

        if (res == true) {
          // valid OTP
          this.confirmPassword  = true;
          this.sen_pricing = false;
          this.forgotPass = false;
          this.signin = false;
          this.registerMe = false;
          this.alreadyReg = false;
          this.verifyOTP = false; 
          this.notRegistered = false;
          this.verifyOTPFrgtpwd = false;

          //console.log("valid OTP");         
        } else {
          //console.log("Wrong OTP"); 
          this.wrongOTP = true;
          this.verifyOTP = true;
          this.txtclr = "red";
          // Wrong OTP

        }

      },
      err => {
         //console.log("error occured. with otp");
       }
      );


 }




 public resendOTP(): void {
         // email does not exist
         let sendOTPBody = new URLSearchParams();
             sendOTPBody.append('userid', this.regUseremail);
         let sendOTPOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')};
      this.http.post(this.sendOTP, sendOTPBody.toString(), sendOTPOptions).subscribe((result:any)=> {

        if (result == true) {
          //console.log("OTP (re)sent", result);
         this.verifyOTP = true;
         this.alreadyReg = false;
         this.forgotPass = false;
         this.signin = false;
         this.registerMe = false;
         this.sen_pricing = false;
         this.notRegistered = false;
         this.verifyOTPFrgtpwd = false;
         this.confirmPassword = false;
        } else {
          //console.log("OTP NOT (re)sent", result);
          alert("Something went wrong. Your otp was not sent");

        }
      },
      err => {
        //console.log("error occured. OTP not (Re)sent");
      }
     );
        
       }


  public resendOTPFPwd(): void {
         // email does not exist
         let sendOTPFPBody = new URLSearchParams();
             sendOTPFPBody.append('userid', this.frgtPwdEmail);
         let sendOTPFPOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')};
      this.http.post(this.sendOTPFrgtPwd, sendOTPFPBody.toString(), sendOTPFPOptions).subscribe((result:any)=> {

        if (result == true) {
          //console.log("OTP (re)sent", result);
         this.verifyOTP = true;
         this.alreadyReg = false;
         this.forgotPass = false;
         this.signin = false;
         this.registerMe = false;
         this.sen_pricing = false;
         this.notRegistered = false;
         this.verifyOTPFrgtpwd = false;
         this.confirmPassword = false;
        } else {
          //console.log("OTP NOT (re)sent", result);
          alert("Something went wrong. Your otp was not sent");

        }
      },
      err => {
        //console.log("error occured. OTP not (Re)sent");
      }
     );
        
       }      


  public verifyEmailAndOTP(): void {

        let emailCheckFPBody = new URLSearchParams();
            emailCheckFPBody.append('email', this.frgtPwdEmail);
        let emailCheckoptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')};
      this.http.post(this.apiemailcheck, emailCheckFPBody.toString(), emailCheckoptions).subscribe((res:any)=> {
       

       if (res == true) {
         // if email does not exist
         //alert("yes email");
         this.notRegistered = true;
         this.alreadyReg = false;
         this.forgotPass = false;
         this.signin = false;
         this.registerMe = false;
         this.sen_pricing = false;
         this.verifyOTP = false;
         this.verifyOTPFrgtpwd = false;
         this.confirmPassword = false;


       } else {
         // email exist
         let sendOTPfrgtBody = new URLSearchParams();
             sendOTPfrgtBody.append('userid', this.frgtPwdEmail);
         let sendOTPOfrgtptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')};
      //console.log("sendOTPBody.toString()", sendOTPOfrgtptions.toString());
      this.http.post(this.sendOTPFrgtPwd, sendOTPfrgtBody.toString(), sendOTPOfrgtptions).subscribe((result:any)=> {
        ////console.log("result.status", result.status);
        if (result.status == "OTP sent") {
          //console.log("OTP sent", result);
         this.verifyOTPFrgtpwd = true;
         this.verifyOTP = false;
         this.alreadyReg = false;
         this.forgotPass = false;
         this.signin = false;
         this.registerMe = false;
         this.sen_pricing = false;
         this.confirmPassword = false;
         
        } else {
          //console.log("OTP NOT sent", result.status);
          alert("Something went wrong. Your otp was not sent");

        }
      },
      err => {
        //console.log("error occured. OTP not sent");
      }
     );
        
       }
      
  },
      err => {
         //console.log("error occured");
       }
    );

  }

  public callEmailCheck(): void {
    if (this.checkAnswer() == false) {
       this.errclr = "red";
       this.captxt = "red";
       this.output = "Invalid Equation";
   } else {
        let emailCheckBody = new URLSearchParams();
            emailCheckBody.append('email', this.regUseremail);
        let emailCheckoptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')};
      this.http.post(this.apiemailcheck, emailCheckBody.toString(), emailCheckoptions).subscribe((res:any)=> {
       

       if (res == false) {
         // if email exist
         //alert("yes email");
         this.alreadyReg = true;
         this.forgotPass = false;
         this.signin = false;
         this.registerMe = false;
         this.sen_pricing = false;
         this.verifyOTP = false;
         this.verifyOTPFrgtpwd = false;
         this.confirmPassword = false;

       } else {
         // email does not exist
         let sendOTPBody = new URLSearchParams();
             sendOTPBody.append('userid', this.regUseremail);
         let sendOTPOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')};
      this.http.post(this.sendOTP, sendOTPBody.toString(), sendOTPOptions).subscribe((result:any)=> {

        if (result == true) {
          //console.log("OTP sent", result);
         this.verifyOTP = true;
         this.alreadyReg = false;
         this.forgotPass = false;
         this.signin = false;
         this.registerMe = false;
         this.sen_pricing = false;
         this.verifyOTPFrgtpwd = false;
         this.confirmPassword = false;
        } else {
          //console.log("OTP NOT sent", result);
          alert("Something went wrong. Your otp was not sent");

        }
      },
      err => {
        //console.log("error occured. OTP not sent");
      }
     );
        
       }
      
  },
      err => {
         //console.log("error occured");
       }
    );
     
   }
    
  }


  public changePassword(): void {

         let confirmPasswordBody = new URLSearchParams();
             confirmPasswordBody.append('userid', this.frgtPwdEmail);
             confirmPasswordBody.append('npass', this.password1Confirm);
         let confirmOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')};
      this.http.post(this.confirmPAss, confirmPasswordBody.toString(), confirmOptions).subscribe((result:any)=> {

        //console.log("confirmPasswordBody.toString()", confirmPasswordBody.toString());
          //console.log("password response", result);

        if (result == true) {
          
          //console.log("password changed", result);
         this.verifyOTP = false;
         this.alreadyReg = false;
         this.forgotPass = false;
         this.signin = true;
         this.registerMe = false;
         this.sen_pricing = false;
         this.notRegistered = false;
         this.verifyOTPFrgtpwd = false;
         this.confirmPassword = false;
         alert("password changed");
        } else {
          //console.log("password NOT changed");
          alert("Something went wrong. Your password was NOT changed");

        }
      },
      err => {
        //console.log("error occured. Your password was NOT changed");
      }
     );

  }

  RouteVar: string;
  i:number = 0;
  id:number  = 0;
  resUserId: string;
  resRole: number;
 public check() {
   if (this.checkAnswer() == false) {
       this.errclr = "red";
       this.captxt = "red";
       this.output = "Invalid Equation";
   }
   else {
   this.progressbar = true;
   this.loginInfo = [];
  let loginbody = new URLSearchParams();
      loginbody.append('userid', this.userid);
    loginbody.append('userpass', this.userpass);
    loginbody.append('token', this.token);
    let loginoptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')};
      this.http.post(this.apiLoginData, loginbody.toString(), loginoptions).subscribe((res:any)=> {
       //console.log('API Response signin :- ', res);
      this.resUserId = res.profile[0].email;
      this.name = res.profile[0].name;
      this.contact = res.profile[0].contact;
      this.place = res.profile[0].place;
      this.gender = res.profile[0].gen;
      //console.log(this.resUserId);
      this.resRole = res.role;
      this.token = res.token;



        if (this.token == 'alreadyLogedin') {
          
          alert("Session already in use. Only 1 active session per user is allowed.");
        } else {


      if (this.resRole == 0) {

          localStorage.setItem('loginstatus', 'loggedin');
          localStorage.setItem('loginid', this.userid);
          localStorage.setItem('token', this.token);

          this.Userdetails.newUserEmail(this.userid);
          this.router.navigateByUrl('/document-upload');
           this.progressbar = false;
      }
      else if (this.resRole == -1) {
        alert("Root Admin");
           this.progressbar = false;
      }
      else if (this.resRole == 1) {
        
        localStorage.setItem('loginstatus', 'adminLogin');
          localStorage.setItem('loginid', this.userid);
        this.router.navigateByUrl('/admin');
           this.progressbar = false;
      }
      else if (this.resRole == 2) {
        localStorage.setItem('loginstatus', 'SadminLogin');
          localStorage.setItem('loginid', this.userid);
        this.router.navigateByUrl('/super-admin');
           this.progressbar = false;
      }
      else if (this.resRole == -3) {
        alert("Inactive user");
           this.progressbar = false;
      }
      else if (this.resRole == -2) {
        alert("Email or Password is Incorrect");
           this.progressbar = false;
      }
      for (let i of res) {
          this.loginInfo.push(
            new loginInfodata(res[this.i].userid, res[this.i].role, this.id));
      this.id++;
      this.i++;
         }
      this.i=0;
      //console.log(this.loginInfo);

        }




  },
      err => {
         //console.log("error occured");
       }
    );
     this.progressbar = false;
    }
}












public form_data: string;
public form_value: SafeHtml;


public proceedToPayment(): void {

           let proceedPayBody = new URLSearchParams();
             proceedPayBody.append('email', this.regUseremail);
             proceedPayBody.append('name', this.username);
             proceedPayBody.append('password', this.userpasswd);
             proceedPayBody.append('amount', this.planAmount);
         let proceedPayOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')};
      this.http.post(this.proceedPay, proceedPayBody.toString(), proceedPayOptions).subscribe((res:any)=> {
        var testsrting = JSON.stringify(res)
        var testobj = JSON.parse(testsrting);

        //console.log("payobj", this.paymentObjData);
         var payTMURL = 'https://securegw.paytm.in/theia/processTransaction';

                 this.form_data = '<form method="post" action=' + payTMURL +  ' name="paytmform" id="paytmform">'
                //var results = JSON.parse(result);
                
                for (var i in res) {
                    this.form_data += '<input type="hidden" name=' + i + ' value=' + res[i] + '>'
                }
                this.form_data += '<button id="sub_form" type="submit"></button>';
                this.form_data += '</form>';
                ////console.log("result", results);

               //this.http.post(form);


            
            this.form_value = this.sanitizer.bypassSecurityTrustHtml(this.form_data);
            setTimeout(()=>{this.BtnClick();}, 300);
            
      },
      err => {
        //console.log("error occured");
      }
     );

}

private BtnClick() {

            /*var myFormLength = (<HTMLInputElement>document.getElementById("sub_form")).value.length;
            //console.log("myFormLength :- ", myFormLength);*/
            var myForm = document.getElementById("sub_form");
            //console.log("myForm :- ", myForm);
            myForm.click();
}

    public YearlyClick() {
  this.YearlyTickDispVal = false;
  this.YearlyPlanTxtActiveVal = true;
  this.YearlyRsActiveVal = true;
  this.YearlyPlanCalActiveVal = true;
  this.YearlyPlanBGSepActiveVal = true;
  this.YearlyPlanBGActiveVal = true;
  this.YearlyCalTopPinActiveVal = true;

  this.MonthlyTickDispVal = true;
  this.MonthlyPlanTxtActiveVal = false;
  this.MonthlyRsActiveVal = false;
  this.MonthlyPlanCalActiveVal = false;
  this.MonthlyPlanBGSepActiveVal = false;
  this.MonthlyPlanBGActiveVal = false;
  this.MonthlyCalTopPinActiveVal = false;
  this.planAmount = '1000';
  }

  public MonthlyClick() {
  this.YearlyTickDispVal = true;
  this.YearlyPlanTxtActiveVal = false;
  this.YearlyRsActiveVal = false;
  this.YearlyPlanCalActiveVal = false;
  this.YearlyPlanBGSepActiveVal = false;
  this.YearlyPlanBGActiveVal = false;
  this.YearlyCalTopPinActiveVal = false;

  this.MonthlyTickDispVal = false;
  this.MonthlyPlanTxtActiveVal = true;
  this.MonthlyRsActiveVal = true;
  this.MonthlyPlanCalActiveVal = true;
  this.MonthlyPlanBGSepActiveVal = true;
  this.MonthlyPlanBGActiveVal = true;
  this.MonthlyCalTopPinActiveVal = true;
  this.planAmount = '100';
  }








 loginstatus:string;
 token:string;
  ngOnInit() {
    this.loginstatus = localStorage.getItem('loginstatus');
    this.token = localStorage.getItem('token');
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
    if (this.loginstatus == 'loggedin') {
      this.router.navigateByUrl('/dashboard');
    }
    if (this.loginstatus == 'adminLogin') {
      this.router.navigateByUrl('/admin');
    }
    else {
      ////console.log('User not logged in');
    }
    if (this.loginstatus == 'SadminLogin') {
      this.router.navigateByUrl('/super-admin');
    }
      }

  }

////////////////////////////////////////////////////////////////////////////////////////////////////

export class loginInfodata {
  constructor(public userid: string,
        public role: string,
        public id: number){}
}


export class paymentData {
  constructor(public key: string){}
}



