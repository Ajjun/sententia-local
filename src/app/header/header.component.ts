import { Component, OnInit, Input } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import { SigninComponent } from "../signin/signin.component";
import { AppRoutingModule } from '../app-routing.module';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar } from '@angular/material';
import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';
import {Keepalive} from '@ng-idle/keepalive';

	@Component({
	  selector: 'app-header',
	  providers:[SigninComponent],
	  templateUrl: './header.component.html',
	  styleUrls: ['./header.component.css']
	})
	export class HeaderComponent implements OnInit {
		idleState = 'Not started.';
   		timedOut = false;
   		lastPing?: Date = null;
		MenuDisplayValue: boolean = true;
		userStatus: string;
		RouteVal: string;
		RouteVar: string = '0';
		loginstatus: string;
		routeUrl: string;
		userid: string;
		token: string;

		public analysisHDR = false; 
		public myaccountHDR = false; 
		public faqHDR = false; 
		public aboutusHDR = false; 
		public aboutHDR = false;
		public principleHDR = false;
		public featuresHDR = false;
		public monitorUserHDR = false;
		public userlogHDR = false; 
		public contactusHDR = false; 
		public signoutHDR = false; 
		public myaccountadminHDR = false;
		public mylearningHDR = false;

		public apiSignout = "/api/signout";
		public apiTabData = "/api/admin_value"

	    constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private functions: SigninComponent, private idle: Idle, private keepalive: Keepalive, public snackBar: MatSnackBar) {

 		idle.setIdle(3600);
    	idle.setTimeout(5);
    	idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
    	idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');
    	idle.onTimeout.subscribe(() => {
      		this.idleState = 'Timed out!';
      		this.timedOut = true;
      		this.openSnackBar('Session Expired.Please signin to continue', '');
      		this.timeoutId();
    	});
    	idle.onIdleStart.subscribe(() => this.idleState = 'You\'ve gone idle!');
    	idle.onTimeoutWarning.subscribe((countdown) => this.idleState = 'You will time out in ' + countdown + ' seconds!');

    // sets the ping interval to 15 seconds
    	keepalive.interval(15);
    	keepalive.onPing.subscribe(() => this.lastPing = new Date());

    //this.reset();
	        router.events.subscribe( (event: Event) => {

	            if (event instanceof NavigationStart) {
	                //console.log('Navigation Started');
	                this.CheckLoginStats();
                if (this.loginstatus == 'loggedin') {
                	this.reset();
                } else {
                	this.idle.ngOnDestroy();

                }
	            }

	            if (event instanceof NavigationEnd) {
					this.routeUrl = this.router.url;
					//this.RouteCheck();
	            }

	            if (event instanceof NavigationError) {
	                // Hide loading indicator
	                // Present error to user
					//console.log('Navigation Failed :- ', event.error);
	            }
	        });

			route.url.subscribe(() => {
				//console.log('snapshot', route.snapshot);
			});
		}

			scrollVar: any;
		public gotoFeature(id){
			//this.functions.Feature('#featureDiv', '#home', false);
			this.scrollVar = this.functions.scrollFun(id);
			//console.log("this.scrollVar = ", this.scrollVar);
		}

reset() {
    this.idle.watch();


  }
		public scrollReset() {
			this.scrollVar = 0;
		}
 openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }
    private timeoutId() {
       setTimeout(() => {  
       this.SignOut();
       }, 4000);

      }


		public CheckLoginStats(): void{

			this.loginstatus = localStorage.getItem('loginstatus');
			if (this.loginstatus) {

			if (this.loginstatus == 'loggedin') {
				// code...
				this.analysisHDR = true;
				this.myaccountHDR = true;
				this.faqHDR = true;
				this.aboutusHDR = true;
				this.aboutHDR = false;
				this.principleHDR = false;
				this.featuresHDR = false;
				this.mylearningHDR = true;
				this.monitorUserHDR = false;
				this.userlogHDR = false;
				this.contactusHDR = true;
				this.signoutHDR = true;
				this.myaccountadminHDR = false;
				this.callmylearning();
			};
			if (this.loginstatus == 'adminLogin') {

				this.analysisHDR = false;
				this.myaccountHDR = false;
				this.faqHDR = false;
				this.mylearningHDR = false;
				this.aboutusHDR = true;
				this.aboutHDR = false;
				this.principleHDR = false;
				this.featuresHDR = false;
				this.monitorUserHDR = true;
				this.userlogHDR = true;
				this.contactusHDR = true;
				this.signoutHDR = true;
				this.myaccountadminHDR = true;
				this.mylearningHDR = false;
				
			};
				if (this.loginstatus == 'SadminLogin') {

				this.analysisHDR = false;
				this.myaccountHDR = false;
				this.faqHDR = false;
				this.mylearningHDR = false;
				this.aboutusHDR = true;
				this.aboutHDR = false;
				this.principleHDR = false;
				this.featuresHDR = false;
				this.monitorUserHDR = false;
				this.userlogHDR = false;
				this.contactusHDR = true;
				this.signoutHDR = true;
				this.myaccountadminHDR = false;
				this.mylearningHDR = false;
				
			}

				
			} else {
				
				this.aboutusHDR = true;
				this.aboutHDR = true;
				this.principleHDR = true;
				this.featuresHDR = true;
				this.contactusHDR = true;
				this.faqHDR = true;
				this.signoutHDR = false;
				this.monitorUserHDR = false;
				this.userlogHDR = false;
				this.analysisHDR = false;
				this.myaccountHDR = false;
				this.myaccountadminHDR = false;
				this.mylearningHDR = false;

			}
		}

			public homeClick() {

				if (this.loginstatus) {

			if (this.loginstatus == 'loggedin' ) {
				this.router.navigateByUrl('/document-upload');
			}

			if (this.loginstatus == 'adminLogin' ) {
				this.router.navigateByUrl('/admin');
			}

			if (this.loginstatus == 'SadminLogin' ) {
				this.router.navigateByUrl('/super-admin');
			}

					// code...
				} else {

					if (this.scrollVar == 1) {
						this.gotoFeature('topDiv');
						this.scrollVar = 1;
					}
					else {
						this.router.navigateByUrl('/signin');
						this.scrollVar = 1;
					}
				}
		}

	public callmylearning(){
		this.userStatus = localStorage.getItem('loginid');
		this.token = localStorage.getItem('token');
		let body = new URLSearchParams();
		body.set('usermail', this.userStatus);
		body.set('token', this.token);
		let options = {
	    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')};
	    this.http.post(this.apiTabData, body.toString(), options).subscribe((res:any)=> {
	    	////console.log("nam",  res[0].nam);
			if (res[0].nam == "Sample File") {
				this.mylearningHDR = false;
			}
			else{
				this.mylearningHDR = true;
			   	//console.log("file name",res[0].nam);
		   }
		},
	    err => {
	    	alert("Error occured on loading learning data. Please reload the page.")
	    });
		}

		public SignOut() {
			//console.log('sigining out');
			this.userid = localStorage.getItem('loginid');
			let signoutBody = new URLSearchParams();
	    	signoutBody.set('userid', this.userid);
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

	  ngOnInit() {
		this.loginstatus = localStorage.getItem('loginstatus');

	}
	}
