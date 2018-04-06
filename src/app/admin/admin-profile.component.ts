import { Component, OnInit, ViewChild,Inject, AfterViewInit, OnChanges, SimpleChanges, Input, Output, ElementRef, EventEmitter } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import {FormControl, FormGroupDirective, NgForm, Validators, NgModel} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {merge} from 'rxjs/observable/merge';
import {of as observableOf} from 'rxjs/observable/of';
import {catchError} from 'rxjs/operators/catchError';
import {map} from 'rxjs/operators/map';
import 'rxjs/add/operator/map';
import {startWith} from 'rxjs/operators/startWith';
import {switchMap} from 'rxjs/operators/switchMap';
import { fileUploadService } from './fileupload.service';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';



/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || isSubmitted));
  }
}


@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
  //providers: [fileUploadService]
})
export class AdminProfileComponent implements OnInit {







userStatus: string;
	subs:any;
	user:number;
	SettingName: string = "Admin Profile";
	PswdName: string = "Change Password";
	AddName: string = "Add User";
	selectuserInfo: selectuserinfoData[]= [];
	public loginid :string;
	public selectedUser: string;
	id: number =0;
	userName: string;
	userEmail:string;
	selectuser:string = "Active Users";
	editusrName: string;
	editusrEmail: string;

	u_email: string;
	u_name: string;

	public Adminemail: string;
	public Adminname: string;
	public Admincontact: string;
	public Adminplace: string;
	public Admingender: string;
	public urldata: any;
	public urljsondata: any;
	total_lic: string;
	used_lic: string;


	public current_pwd: string;
	public new_pswd: string;
	public cnfrm_pswd: string;
	uploadLoadingDisplayValue: boolean = true;
  	fileInplen:number;
	@ViewChild('fileInp') input: ElementRef;


	fileToUpload: File = null;
	public type: string;


	i:number = 0;

	auserSource = null;

	displayedColumns = ['Username', 'Userid', 'Edit','Delete'];
	//public selectUserData : any[];


	public subscribe = false;
	public upload =false;
	public adminprofile = true;
	public adduser = false;
	public chngpswd = false;
	public userdetails = false;
	public editdetails = false;
	public deletedetails = false;
	public pwdSuccess = false;
	public bulk = false;
	public csvurl = false;
	public disablePass = false;

	public selectUserApi = "/api/user_details" 
	public adminsubscrApi = "/api/admin_subscription"
	public addUserApi = "/api/admin_ad_user"
	public adminApi = "/api/modify_user"
	public chngPswdApi = "/api/change_password"
	public bulkAddApi = "/api/bulk_add"
	public editApi = "/api/change_name";
	


//constructor(private http: HttpClient) { }
constructor(private http: HttpClient, private _fileuploads: fileUploadService, public dialog: MatDialog) { }
	
  public calladminprofile(): void {
	this.subscribe = false;
	this.upload = false;
	this.adminprofile = true;
	this.adduser = false;
	this.chngpswd = false;
	this.userdetails = false;
	this.editdetails = false;
	this.deletedetails = false;
	this.pwdSuccess = false;
	this.bulk = false;
	this.csvurl = false;
	this.disablePass = false;


  }

  public callsubscribe(): void {
	this.subscribe = true;
	this.upload = false;
	this.adminprofile = false;
	this.adduser = false;
	this.chngpswd = false;
	this.userdetails = false;
	this.editdetails = false;
	this.deletedetails = false;
	this.pwdSuccess = false;
	this.bulk = false;
	this.csvurl = false;
	this.disablePass = false;
  }

  public calluserdet(): void {
    	this.selectuserInfo= [];
	this.selectuser = '';
  	this.userName = '';
  	this.userEmail = '';
	this.subscribe = false;
	this.upload = false;
	this.adminprofile = false;
	this.adduser = false;
	this.chngpswd = false;
	this.userdetails = true;
	this.editdetails = false;
	this.deletedetails = false;
	this.pwdSuccess = false;
	this.bulk = false;
	this.csvurl = false;
	this.disablePass = false;
	this.ngOnInit();
	//console.log("editdetails", this.editdetails);
	
	//this.userEmail = this.selectuserInfo[this.user].userid;

  }

  public calladduser(): void {

         this.u_email = "";
     this.u_name = "";
	this.subscribe = false;
	this.upload = false;
	this.adminprofile = false;
	this.adduser = true;
	this.chngpswd = false;
	this.userdetails = false;
	this.editdetails = false;
	this.deletedetails = false;
	this.pwdSuccess = false;
	this.bulk = false;
	this.csvurl = false;
	this.disablePass = false;
  }

  public callupload(): void {
	this.subscribe = false;
	this.upload = true;
	this.adminprofile = false;
	this.adduser = false;
	this.chngpswd = false;
	this.editdetails = false;
	this.deletedetails = false;
	this.userdetails = false;
	this.pwdSuccess = false;
	this.bulk = true;
	this.csvurl = false;
	this.disablePass = false;
  }

  public callchngpswd(): void {
	this.subscribe = false;
	this.userdetails = false;
	this.upload = false;
	this.adminprofile = false;
	this.adduser = false;
	this.chngpswd = true;
	this.editdetails = false;
	this.deletedetails = false;
	this.pwdSuccess = false;
	this.bulk = false;
	this.csvurl = false;
	this.disablePass = false;
  }



   public calledituser(row): void {
   	//console.log("row id", row.id);
   	//console.log("userid", this.selectuserInfo[row.id].userid);
	this.subscribe = false;
	this.userdetails = false;
	this.upload = false;
	this.adminprofile = false;
	this.adduser = false;
	this.chngpswd = false;
	this.editdetails = true;
	this.deletedetails = false;
	this.pwdSuccess = false;
	this.bulk = false;
	this.csvurl = false;
	this.disablePass = false;
	this.editusrName = row.name;
	this.editusrEmail = row.userid;
  }

   public calldeluser(): void {
	this.subscribe = false;
	this.userdetails = false;
	this.upload = false;
	this.adminprofile = false;
	this.adduser = false;
	this.chngpswd = false;
	this.editdetails = false;
	this.deletedetails = true;
	this.pwdSuccess = false;
	this.bulk = false;
	this.csvurl = false;
	this.disablePass = false;
  }
  
     public clickeduser;
  openDialog(row): void {
  	
     this.clickeduser = row.userid;
     //////console.log("this.clickeduser = ", this.clickeduser);
    let dialogRef = this.dialog.open(deleteDialog, {
      width: '250px',
      data: {clickeduser: this.clickeduser, loginid: this.loginid}
    });
  }

  public addnewUser(){
         ////////console.log("u_email", this.u_email, "u_name", this.u_name,"cr_by", this.loginid);
  	let addUserBody = new URLSearchParams();
       addUserBody.append("u_email", this.u_email);
       addUserBody.append("u_name", this.u_name);
       addUserBody.append("cr_by", this.loginid);
   let addUseroptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')}; 
      ////////console.log("u_email", this.u_email, "u_name", this.u_name,"cr_by", this.loginid);
      this.http.post(this.addUserApi, addUserBody.toString(), addUseroptions).subscribe((res:any)=> {
      	//////console.log("userres", res);
         this.u_email="";
        this.u_name="";
        alert(Object.values(res)[0]);
        this.adduser=false;
      //location.href="admin-profile";
        this.calluserdet();
       }
      );
  }
  public editData(){

    let editBody = new URLSearchParams();
       editBody.append("userid", this.editusrEmail);
       editBody.append("name", this.editusrName);

       //////console.log("useremail", this.editusrEmail);
     //////console.log("username", this.editusrName);
       
   let editoptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')}; 
      ////////console.log("u_email", this.u_email, "u_name", this.u_name,"cr_by", this.loginid);
      this.http.post(this.editApi, editBody.toString(), editoptions).subscribe((res:any)=> {
        //////console.log("nameres", res);

        alert("Name is added successfully....");

        let selectUserBody = new URLSearchParams();
       selectUserBody.append('usermail', this.loginid);
   let selectUseroptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')}; 
      this.http.post(this.selectUserApi, selectUserBody.toString(), selectUseroptions).subscribe((res:any)=> {
      this.calluserdet();
      },
      );
      },
      err => {
         //////console.log("error occured");
       }
      );
  }


  public checkPass(): void {
	if (this.current_pwd == this.new_pswd) {
		this.disablePass = false;
		
	} else {
		this.disablePass = true;
	}
}

   public changePassword(){

   	   let chngPwdBody = new URLSearchParams();
       chngPwdBody.append('userid', this.loginid);
       chngPwdBody.append('current_pwd', this.current_pwd);
       chngPwdBody.append('n_pwd', this.new_pswd);
   let chngPwdoptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')}; 



      this.http.post(this.chngPswdApi, chngPwdBody.toString(), chngPwdoptions).subscribe((res:any)=> {

        //////console.log("change Password", res);
        this.pwdSuccess = true;

      },
      err => {
         //////console.log("error occured.");
       }
      );
   }


 
public HandleBrowseClick() {
	////////console.log('clicked');
   var fileinput = document.getElementById("f");
   //////console.log("fileinput", fileinput);
    fileinput.click();
}



public handleFileInput(files: FileList): void {
	//////console.log("File name :-", files[0].name);

	this.type = files.item(0).type;
    var x = this.type.split("/");

		if (x[1] != 'csv') {
			alert("Only csv files are allowed.");
			this.fileToUpload = null;
		} else {
			this.fileToUpload = files.item(0);
		}

}

public uploadFileToActivity(): void {


	if (this.fileToUpload == null) {
		alert("choose a csv file to upload");
		this.csvurl = false;
		
	} else {
		this.uploadLoadingDisplayValue = false;
		//////console.log("analyse file value check", this.fileToUpload);
	     this._fileuploads.postFile(this.fileToUpload, this.loginid).subscribe(data => {
      	//////console.log("fileupload from service:-", data);

      	this.urljsondata = JSON.parse(data);
      	this.urldata = this.urljsondata.url;
		this.uploadLoadingDisplayValue = true;
		this.csvurl = true;
      	//////console.log("urldata", this.urldata);

      }, error => {
        //////console.log(error);
      });

	}

  }





  ngOnInit() {

   this.loginid = localStorage.getItem('loginid');

   let selectUserBody = new URLSearchParams();
       selectUserBody.append('usermail', this.loginid);
   let selectUseroptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')}; 
      this.http.post(this.selectUserApi, selectUserBody.toString(), selectUseroptions).subscribe((res:any)=> {

      	////////console.log("userres", res);

      	 for (let i of res) {
        this.selectuserInfo.push(
         new selectuserinfoData(i.userid, i.name, this.id));
        this.id++;
      	 }

		  ////////console.log('My Array selectuserInfo:- ', this.selectuserInfo);
		  this.auserSource = new MatTableDataSource(this.selectuserInfo);

      },
      err => {
         //////console.log("error occured");
       }
      );
      
      let adminsubscrBody = new URLSearchParams();
	  adminsubscrBody.set('usermail', this.loginid);
	  let adminsubscrOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')};
      this.http.post(this.adminsubscrApi, adminsubscrBody.toString(), adminsubscrOptions).subscribe(res => {
        //////console.log("subscription :- ", res);
		  //this.subs=res;
		  //////console.log("usermail :- ",this.loginid, "keys", Object.keys(res)[0]);
		  //////console.log("keys", Object.values(res)[0]);
		  ////////console.log('plan :- ', this.subs.plan, 'start date :- ', this.subs.start, 'end date :- ', this.subs.end);
		  this.total_lic = Object.keys(res)[0];
		  this.used_lic = Object.values(res)[0];
		  //this.endDate = this.subs.end;

      },
      err => {
        //////console.log("Error Occured");
      }
  
  );


let adminProfileBody = new URLSearchParams();
       adminProfileBody.append('usermail', this.loginid);
  
   let adminProfileoptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')}; 
      this.http.post(this.adminApi, adminProfileBody.toString(), adminProfileoptions).subscribe((res:any)=> {

      	////////console.log("adminres", res);
      	this.Adminemail = res[0].email;
      	this.Adminname = res[0].name;
      	this.Admincontact = res[0].contact;
      	this.Adminplace = res[0].place;
      	this.Admingender = res[0].gen;

      	////////console.log("adminEmaiil", this.Adminemail)
      },
      err => {
         //////console.log("error occured");
       }
      );






  }
}
@Component({
  selector: 'deleteDialog',
  templateUrl: 'deleteDialog.html',
})

export class deleteDialog {
public new: AdminProfileComponent;

public deleteApi = "/api/admin_del_user";

selectuserInfo: selectuserinfoData[]= [];
editusrName: string;
editusrEmail: string;


id: number =0;
loginid: string;
userid: string;

  constructor(
    public dialogRef: MatDialogRef<deleteDialog>, @Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient) 
  { 
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public OnClickOK() {

  	this.loginid = this.data.loginid;
      //////console.log("Login Id :- ", this.data.loginid, "\n", "Clicked User :- ", this.data.clickeduser);

      let deleteBody = new URLSearchParams();
      deleteBody.append("ud_email", this.data.clickeduser);
      deleteBody.append("cr_by", this.data.loginid);
      let addUseroptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')};
      this.http.post(this.deleteApi, deleteBody.toString(), addUseroptions).subscribe((res:any)=> {
      //////console.log("delres", res);
      location.href="admin-profile";
      },
      err => {
         //////console.log("error occured");
       }
      );
      this.dialogRef.close();
  }
  }




export class selectuserinfoData {
	constructor(public userid: string,
				public name: string,
				public id:Number=0){}
}