import { Component, OnInit, AfterViewInit, OnChanges, SimpleChanges, Input, Output, ViewChild, Inject, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { SuperAdminFunctions } from '../CallApiService';

@Component({
  selector: 'app-super-admin',
  providers:[SuperAdminFunctions],
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css']
})
export class SuperAdminComponent implements OnInit {


  id: number =0;
  total_lic: number;
  used_lic: number;
  i:number = 0;
  AdminTabSource = null;
  UserTabSource = null;
  SettingName: string = "Super-admin Profile";
  PswdName: string = "Change Password";
  AddName: string = "Add Admin";
  userName: string;
  userEmail:string;
  selectuser:string = "Active Admin";
  u_email: string;
  u_name: string;
  loginid :string;
  selectAdminInfo: selectAdminInfoData[]= [];
  selectUserInfo: selectUserInfoData[]= [];
  displayedAdminColumns = ['Adminname', 'Adminid'];
  displayedUserColumns = ['Username', 'Userid'];

  public SuperAdminemail: string;
  public SuperAdminname: string;
  public SuperAdmincontact: string;
  public SuperAdminplace: string;
  public SuperAdmingender: string;
  public subscribe = false;
  public Sadminprofile = true;
  public addAdmin = false;
  public chngpswd = false;
  public AdminDetails = false;
  public deletedetails = false;
  public apiGetUserList = "/api/user_details" 
  public adminsubscrApi = "/api/admin_subscription" 
  public apiAddAdmin = "/api/sadmin_ad_admin";
  public apiSuperAdmin = "/api/modify_user";
  public apiCheckEmail = "/api/email_avail";
  public apiChangePass = "/api/change_password";

  SadminLic: number;
  LeftLic: number;
  NewAdminLic:number;
  maxLic: number;
  AddAdminMsg: boolean = false;
  notsame: boolean = false;
  progressbar: boolean = true;
  userpasschange: boolean = true;
  hide = true;
  NewAdminEmail:string;
  NewAdminName:string;
  AddAdminMsgText: string;
  AddAdminMsgColor: string;
  newPass: string;
  confirmPass:string;
  oldPass: string;
  PassColor: string;
  passworderr:string;


////////////////////////////////////////////////////////////////////////////////////////////////////////
constructor(private http: HttpClient,private functions: SuperAdminFunctions, public dialog: MatDialog ) { }
/*************************calladminprofile()*************************/ 
  public calladminprofile(): void {
  this.subscribe = false;
  this.Sadminprofile = true;
  this.addAdmin = false;
  this.chngpswd = false;
  this.AdminDetails = false;
  this.deletedetails = false;
  }
/*************************calladminprofile()*************************/ 

/*************************callsubscribe()*************************/ 
  public callsubscribe(): void {
  this.subscribe = true;
  this.Sadminprofile = false;
  this.addAdmin = false;
  this.chngpswd = false;
  this.AdminDetails = false;
  this.deletedetails = false;
  }
/*************************callsubscribe()*************************/ 

/*************************callAdminDetails()*************************/
  public callAdminDetails(): void {
  this.selectuser = '';
  this.userName = '';
  this.userEmail = '';
  this.subscribe = false;
  this.Sadminprofile = false;
  this.addAdmin = false;
  this.chngpswd = false;
  this.AdminDetails = true;
  this.deletedetails = false;
  this.adminInactiveTab = false;
  this.adminActiveTab = true;
  this.userInactiveTab = true;
  this.userActiveTab = false;
  this.analysisInactiveTab = true;
  this.analysisActiveTab = false;
  this.adminDetailsTab = true;
  this.userDetailsTab = false;
  this.userAnalysisTab = false;
  }
/*************************callAdminDetails()*************************/

/*************************calladdAdmin()*************************/
  public calladdAdmin(): void {
    this.u_email = "";
    this.u_name = "";
    this.subscribe = false;
    this.Sadminprofile = false;
    this.addAdmin = true;
    this.chngpswd = false;
    this.AdminDetails = false;
    this.deletedetails = false;
  }
/*************************calladdAdmin()*************************/

/*************************callchngpswd()*************************/ 
  public callchngpswd(): void {
  this.subscribe = false;
  this.AdminDetails = false;
  this.Sadminprofile = false;
  this.addAdmin = false;
  this.chngpswd = true;
  this.deletedetails = false;
  }
/*************************callchngpswd()*************************/ 

  public clickeduser;
  openDialog(row): void {
    //console.log("row id", row.id);
     //console.log("userid", this.selectAdminInfo[row.id].userid);
     this.clickeduser = this.selectAdminInfo[row.id].userid;
    let dialogRef = this.dialog.open(deleteAdminDialog, {
      width: '250px',
      data: {clickeduser: this.clickeduser, loginid: this.loginid}
    });
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////
  public subscription() {
    let adminsubscrBody = new URLSearchParams();
    adminsubscrBody.set('usermail', this.loginid);
    let adminsubscrOptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')};
    this.http.post(this.adminsubscrApi, adminsubscrBody.toString(), adminsubscrOptions).subscribe(res => {
      this.total_lic = +Object.keys(res)[0];
      this.used_lic = +Object.values(res)[0];
      this.LeftLic = this.total_lic-this.used_lic;
      this.SadminLic = this.total_lic;
      this.maxLic = this.LeftLic.toString().length;
    },
    err => {
      //console.log("Error Occured");
    }
    );
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////////////////////////
  public superAdminDetails() {
    let adminProfileBody = new URLSearchParams();
    adminProfileBody.append('usermail', this.loginid);
    let adminProfileoptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')}; 
    this.http.post(this.apiSuperAdmin, adminProfileBody.toString(), adminProfileoptions).subscribe((res:any)=> {
      //console.log("adminres", res);
      this.SuperAdminemail = res[0].email;
      this.SuperAdminname = res[0].name;
      this.SuperAdmincontact = res[0].contact;
      this.SuperAdminplace = res[0].place;
      this.SuperAdmingender = res[0].gen;
      ////console.log("adminEmaiil", this.Adminemail)
    },
    err => {
      //console.log("error occured");
    }
    );
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////

  public CkeckPass() {
    if (this.newPass == this.confirmPass) {
      this.userpasschange = false;
          this.notsame = false;
    }
    else  {
          this.userpasschange = true;
          this.PassColor = 'red';
          this.passworderr = "Password is not same";
          this.notsame = true;
        }
  }

  public ChangePass() {
    if (this.newPass !=undefined && this.oldPass !=undefined && this.confirmPass !=undefined) {
      this.notsame = false;
      //console.log("this.oldPass", this.oldPass, "this.newPass", this.newPass, "this.loginid", this.loginid);
      let updatePassBody = new URLSearchParams();
    updatePassBody.append('userid', this.loginid);
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
      }
      else {
      this.notsame = true;
      this.PassColor = 'red';
      this.passworderr = "Error while changing your password. Please contact EunoiaLabs Service team.";
      setTimeout(()=>{this.notsame = false;}, 5000);
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


  /////////////////////////////////////////////////////////////////////////////////////////////////
  public SubmitNewAdmin(NewAdminEmail, NewAdminName, NewAdminLic) {
    this.AddAdminMsg = true;
    this.AddAdminMsgColor = "green";
    this.AddAdminMsgText = "Adding Admin "+NewAdminName+". Please wait...";

    if(this.LeftLic == 0 ){
      this.AddAdminMsg = true;
      this.AddAdminMsgColor = "red";
      this.AddAdminMsgText = "License exausted. Please contact EunoiaLabs Service team..";
      setTimeout(()=>{this.AddAdminMsg = false;}, 5000);      
    }
    else {
      if(NewAdminEmail == undefined && NewAdminName == undefined){
        this.AddAdminMsg = true;
        this.AddAdminMsgColor = "red";
        this.AddAdminMsgText = "Please fill the mandatory fields";
        setTimeout(()=>{this.AddAdminMsg = false;}, 5000);
      }
      else {
        if (NewAdminLic > this.LeftLic) {
          this.AddAdminMsg = true;
          this.AddAdminMsgColor = "red";
          this.AddAdminMsgText = "Number of license cannot exceed "+this.LeftLic;
          setTimeout(()=>{this.AddAdminMsg = false;}, 5000);
        }
        else {
          if(NewAdminLic == undefined){
            NewAdminLic = 1;
            let checkEmailBody = new URLSearchParams();
            checkEmailBody.append("email", NewAdminEmail);
            let checkEmailoptions = {
              headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')};
              this.http.post(this.apiCheckEmail, checkEmailBody.toString(), checkEmailoptions).subscribe((res:any)=> {
              //console.log("Check Email", res);
              if(res == false) {
                this.AddAdminMsg = true;
                this.AddAdminMsgColor = "red";
                this.AddAdminMsgText = "User/Admin already registered";
                setTimeout(()=>{this.AddAdminMsg = false;}, 5000);
                this.NewAdminEmail = '';
              }
              else {
                let addAdminBody = new URLSearchParams();
                addAdminBody.append("userid", this.loginid);
                addAdminBody.append("u1_email", NewAdminEmail);
                addAdminBody.append("u1_name", NewAdminName);
                addAdminBody.append("admin_lic", NewAdminLic);  
                let addAdminoptions = {
                  headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')};
                  this.http.post(this.apiAddAdmin, addAdminBody.toString(), addAdminoptions).subscribe((res:any)=> {
                  //console.log("nameres", res);
                  if(res.status = "Admin added successfully...") {
                    this.AddAdminMsg = true;
                    this.AddAdminMsgColor = "green";
                    this.AddAdminMsgText = "Admin  '"+NewAdminName+"'  added successfully";
                    setTimeout(()=>{this.AddAdminMsg = false;}, 5000);
                    this.NewAdminEmail = '';
                    this.NewAdminName = '';
                    this.NewAdminLic = null;
                    this.subscription();
                  }
                  else {
                    this.AddAdminMsg = true;
                    this.AddAdminMsgColor = "red";
                    this.AddAdminMsgText = "There is some Error while Adding. Please contact EunoiaLabs Service team...";
                    setTimeout(()=>{this.AddAdminMsg = false;}, 5000);
                    this.NewAdminEmail = '';
                    this.NewAdminName = '';
                    this.NewAdminLic = null;
                    this.subscription();            
                  }
                },
                err => {
                  this.AddAdminMsg = true;
                  this.AddAdminMsgColor = "red";
                  this.AddAdminMsgText = "There is some Error while Adding. Please contact EunoiaLabs Service team...";
                  setTimeout(()=>{this.AddAdminMsg = false;}, 5000);
                  this.NewAdminEmail = '';
                  this.NewAdminName = '';
                  this.NewAdminLic = null;
                  this.subscription();  
                }
                );
              }
            },
            err => {
              this.AddAdminMsg = true;
              this.AddAdminMsgColor = "red";
              this.AddAdminMsgText = "There is some Error while Adding. Please contact EunoiaLabs Service team...";
              setTimeout(()=>{this.AddAdminMsg = false;}, 5000);
              this.NewAdminEmail = '';
              this.NewAdminName = '';
              this.NewAdminLic = null;
              this.subscription();  
            }
            );
          }
        }
      }
    }
  }

  public getAdmin() {
    this.progressbar=true;
    this.selectAdminInfo=[];
    this.functions.callAPI(this.apiGetUserList, 'usermail', this.loginid).subscribe(data => {
    data = JSON.parse(data);
    for (let i of data) {
      this.selectAdminInfo.push(
      new selectAdminInfoData(i.userid, i.name, this.id));
      this.id++;
     }
     this.id=0;
     //console.log('My Array selectuserInfo:- ', this.selectAdminInfo);
     this.AdminTabSource = new MatTableDataSource(this.selectAdminInfo);
     this.progressbar=false;
     },
     err => {
      //console.log("error occured");
     });
  }

  public getUser() {
    this.progressbar=true;
     this.Totaluserdisp=false;
    this.TotalUsers  = 0;
    this.selectUserInfo=[];
    this.functions.callAPI(this.apiGetUserList, 'usermail', this.SelectedAdminEmail).subscribe(data => {
    data = JSON.parse(data);
     for (let i of data) {
      this.selectUserInfo.push(
      new selectUserInfoData(i.userid, i.name, this.id));
      this.TotalUsers = this.id+1;
      this.id++;
     }
     this.id=0;
     //console.log('My Array selectuserInfo:- ', this.selectUserInfo);
     this.UserTabSource = new MatTableDataSource(this.selectUserInfo);
     this.Totaluserdisp=true;
     this.progressbar=false;
   },
   err => {
    //console.log("error occured");
   }
   );
  }

/*-----------------------------------------------Tab Functions Starts---------------------------------------------*/
  adminInactiveTab:boolean = false;
  adminActiveTab:boolean = true;
  userInactiveTab:boolean = true;
  userActiveTab:boolean = false;
  analysisInactiveTab:boolean = true;
  analysisActiveTab:boolean = false;
  adminDetailsTab:boolean = true;
  userDetailsTab:boolean = false;
  userAnalysisTab:boolean = false;
  Totaluserdisp: boolean = false;
  userTabActive: boolean = false;
  AnalysisTabActive: boolean = false;
  SelectedAdminEmail: string;
  SelectedAdminName: string;
  SelectedAdminId: number;
  TotalUsers: number;
  selectedRowIndex: number = -1;

  public highlight(row) {
    //console.log("row => ", row );
    this.SelectedAdminEmail = row.userid;
    this.SelectedAdminName = row.name;
    this.SelectedAdminId = row.id;
    this.selectedRowIndex = row.id;
    this.selectUserInfo=[null];
    this.userTabActive = true;
    this.getUser();
    this.adminInactiveTab = true;
    this.adminActiveTab = false;
    this.userInactiveTab = false;
    this.userActiveTab = true;
    this.analysisInactiveTab = true;
    this.analysisActiveTab = false;
    this.adminDetailsTab = false;
    this.userDetailsTab = true;
    this.userAnalysisTab = false;
  }

  public adminTab() {
    this.adminInactiveTab = false;
    this.adminActiveTab = true;
    this.userInactiveTab = true;
    this.userActiveTab = false;
    this.analysisInactiveTab = true;
    this.analysisActiveTab = false;
    this.adminDetailsTab = true;
    this.userDetailsTab = false;
    this.userAnalysisTab = false;
  }

  public userTab() {
    this.adminInactiveTab = true;
    this.adminActiveTab = false;
    this.userInactiveTab = false;
    this.userActiveTab = true;
    this.analysisInactiveTab = true;
    this.analysisActiveTab = false;
    this.adminDetailsTab = false;
    this.userDetailsTab = true;
    this.userAnalysisTab = false;
  }

  public analysisTab() {
    this.adminInactiveTab = true;
    this.adminActiveTab = false;
    this.userInactiveTab = true;
    this.userActiveTab = false;
    this.analysisInactiveTab = false;
    this.analysisActiveTab = true;
    this.adminDetailsTab = false;
    this.userDetailsTab = false;
    this.userAnalysisTab = true;

  }

  public userTabCls() {
    event.stopPropagation();
    this.selectedRowIndex = -1;
    this.userTabActive = false;
    this.adminDetailsTab = true;
    this.userDetailsTab = false;
    this.userAnalysisTab = false;
    this.adminInactiveTab = false;
    this.adminActiveTab = true;
    this.userInactiveTab = true;
    this.userActiveTab = false;
    this.analysisInactiveTab = true;
    this.analysisActiveTab = false;
  }

  public analysisTabCls() {
    event.stopPropagation();
    //console.log("analysis child clicked");
  }
 /*-----------------------------------------------Tab Functions Ends---------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
  ngOnInit() {
   this.loginid = localStorage.getItem('loginid');
   this.getAdmin();
   this.subscription();
   this.superAdminDetails();
  }
}

/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
export class selectAdminInfoData {
  constructor(public userid: string,
        public name: string,
        public id:number =0){}
}

export class selectUserInfoData {
  constructor(public userid: string,
        public name: string,
        public id:number =0){}
}
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

@Component({
  selector: 'deleteAdminDialog',
  templateUrl: 'deleteDialog.html',
})

export class deleteAdminDialog {

public deleteApi = "/api/admin_del_user";
editusrName: string;
editusrEmail: string;
id: number =0;
loginid: string;
userid: string;
constructor(
  public dialogRef: MatDialogRef<deleteAdminDialog>, @Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient)
{}
 onNoClick(): void {
  this.dialogRef.close();
 }

 public OnClickOK() {
  this.loginid = this.data.loginid;
  //console.log("Login Id :- ", this.data.loginid, "\n", "Clicked User :- ", this.data.clickeduser);
  let deleteBody = new URLSearchParams();
  deleteBody.append("ud_email", this.data.clickeduser);
  deleteBody.append("cr_by", this.data.loginid);
  let addUseroptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')};
  this.http.post(this.deleteApi, deleteBody.toString(), addUseroptions).subscribe((res:any)=> {
    //console.log("delres", res);
  },
  err => {
    //console.log("error occured");
  }
  );
  this.dialogRef.close();
  }
  }
