import { Component, OnInit, ViewChild, AfterViewInit, OnChanges, SimpleChanges, Input, Injectable } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {linegraphdata} from '../linegraphdata';
import {BrowserModule} from '@angular/platform-browser';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {merge} from 'rxjs/observable/merge';
import {of as observableOf} from 'rxjs/observable/of';
import {catchError} from 'rxjs/operators/catchError';
import {map} from 'rxjs/operators/map';
import {startWith} from 'rxjs/operators/startWith';
import {switchMap} from 'rxjs/operators/switchMap';

////////////////////////////////////////////////////////////////////////////////////////////

@Component({
  selector: 'app-userlogstatus',
  templateUrl: './userlogstatus.component.html',
  styleUrls: ['./userlogstatus.component.css']
})

///////////////////////////////////////////////////////////////////////////////////////////

export class UserlogstatusComponent implements OnInit {


statusTabData: statusData[] =[];

statusSource = null;

displayedColumns = ['Username', 'Userid', 'LastLoginDate', 'LastLoginTime', 'Access'];

i:number = 0;
id:number  = 0;

alertGraphMsg: string;
  alertOnly: boolean = false;

 @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

public apiStatusData = "/api/userlog_value";
userStatus: string;
  constructor(private http: HttpClient) { }

  ngOnInit() {
  //console.log("Works");
    this.userStatus = localStorage.getItem('loginid');
  	let linebody = new URLSearchParams();
	  linebody.set('usermail', this.userStatus);
	  let lineoptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')};
      this.http.post(this.apiStatusData, linebody.toString(), lineoptions).subscribe((res:any)=> {
		   //console.log('User Log Status API Response :- ', res);
		   for (let i of res) {
        this.statusTabData.push(
         new statusData(res[this.i].access, res[this.i].log_date, res[this.i].log_time, res[this.i].userid, res[this.i].name, res[this.i].id));
		  this.id++;
		  this.i++;
      	 }
		  this.i=0;
		  this.id = 0;
		  //console.log('My Array :- ', this.statusTabData);
		  this.statusSource = new MatTableDataSource(this.statusTabData);
          //this.statusSource.paginator = this.paginator;
          //this.statusSource.sort = this.sort;
	  },
 
      err => {
         this.alertOnly = true;
         this.alertGraphMsg = "Failed to load Table Data.";
       }
    );
    }

}


export class statusData {
	constructor(public access: number,
				public log_date: any,
				public log_time: any,
				public userid: string,
				public name: string,
				public id: number = 0){}
}
