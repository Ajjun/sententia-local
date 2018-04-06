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

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

/*--------------------------------------Variables start----------------------------------------------------*/

  tabFileName: tablenamedata[] = [];
  pieGraph: piegraphdata[] = [];
  userTabData: userData[] = [];
  PieData: examplePieData[] = [];
  sugTab: sugTabdata[] = [];
  LineGraph: any[];
  c:number = 0;
  i:number = 0;
  sugTabHead: string = 'Table name';
  userStatus: string;
  CheckId: number;
  DivDisplayMaxVal: boolean = false;
  DivDisplayMinVal: boolean = true;
  TotSen: string;
  TotErr: string;
  TotSenErrDisplayValue: boolean = true;
  loginstatus: string;
  dashboardLoadDispVal :boolean = false;
  dashboardMainVal: boolean = true;
  dataSource = null;
  sugTabDataSource = null;
  docQuality: number;
  gaugeType = "semi";
  gaugeValue = this.docQuality;
  gaugeLabel = "Document quality indicator";
  gaugeAppendText = "%";
  rowbgc: string;
  clicked: number = 1;
  userIds:string = "usermail";
  displayedColumns = ['docname', 'date'];
  displayedSugColumns = ['Column'];
  selectedRowIndex: number = -1;
  pieGaugeDisplayValue: boolean = false;
  GaugeDisplayValue: boolean = true;
  lineDisplayValue: boolean = false;
  rowId: number = 0;
  getUserId:string;
  getuserSessionId:string;
  d:any;
  single:any;    piedata: any[];
  piegraphview: any[] = [480, 350];
  showLabels = true;
  explodeSlices = false;
  doughnut = true;
  showLegendPieGraph = false;
  autoScale = true;
  linegraphview: any[] = [600, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegendLineGraph = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date & Time';
  showYAxisLabel = true;
  yAxisLabel = 'Quality';
  yMax = '100';
  yMin = '0';
  alertTabMsg: string;
  alertGraphMsg: string;
  SugTableDisplayValue: boolean = false;
  id:number  = 0;
  key: any;
  val: any;
  SugBoxisplayValue: boolean = false;
  DocErr: string;
  DocSug: string;
  token: string;
  userid:string;
  DocExample: string;
  progressbar: boolean = true;
  mainTable: boolean = false;
  selectuserInfo: selectuserinfoData[]= [];
  usr: string;
  selectedUser: string;
  Errors: boolean;
  spellCheckErr:boolean;
  mistakeHead: string = 'Sentence mistake';
  suggestionHead: string = 'Sententia suggestion';
  examples: boolean = true;
  public thresholdConfig = {
  "0": {
    "color": "#ef4c07"
  },
  "30": {
    "color": "coral"
  },
  "40": {
    "color": "orange"
  },
  "50": {
    "color": "#ead702"
  },
  "65": {
    "color": "#04cc46"
  }
  };
  public colorSchemeLineGraph = {
    domain: ['#406d9b']
  };

  public colorSchemePieeGraph = {
    domain: ['#406d9b', '#af1818', '#d1ca19', '#8dd118', '#18d193', '#af2764', '#e09018', '#98af17']
  };

  public selectUserApi = "/api/user_details"
  public apiTabData = "/api/admin_value_ind"
  public apiLineData = "/api/bar_value"
  public apiPieData = "/api/donut_value"
  public apiSignout = "/api/signout";
/*--------------------------------------Variables end----------------------------------------------------*/
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
  }


  constructor(private router: Router, private http: HttpClient) {
    Object.assign(this, {linegraphdata}, this.newGraph, this.single);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  this.sugTabDataSource.filter = filterValue;
  }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*--------------------------------------Hilight Row Function Start----------------------------------------------------*/
  highlight(row){
    if (this.selectedRowIndex === this.rowId){
      if (this.selectedRowIndex > row.id || this.selectedRowIndex < row.id) {
        this.selectedRowIndex = row.id;
        this.rowId = row.id;
        this.c=this.rowId;
        this.pieGraph = [];
        this.DonutFun();
        this.lineDisplayValue = false;
        this.SugTableDisplayValue = false;
        this.SugBoxisplayValue = false;
        this.DivDisplayMaxVal = false;
        this.DivDisplayMinVal = true;
        this.sugTabHead = '';
        this.CheckId = null;
        this.CheckId2 = null;
        this.TotSen = this.PieData[0].length;
        this.TotErr = this.PieData[0].tot_err;
        this.pieGaugeDisplayValue = true;
        this.TotSenErrDisplayValue = false;
      }
      else   {
        this.selectedRowIndex = -1;
        this.rowId = 0;
        this.c = 0;
        this.pieGaugeDisplayValue = false;
        this.lineDisplayValue = true;
        this.pieGraph = [];
        this.SugTableDisplayValue = false;
        this.SugBoxisplayValue = false;
        this.DivDisplayMaxVal = false;
        this.DivDisplayMinVal = true;
        this.sugTabHead = '';
        this.CheckId = null;
        this.CheckId2 = null;
        this.TotSen = '';
        this.TotErr = '';
        this.TotSenErrDisplayValue = true;
        }
      }
    else {
      this.getUserId = localStorage.getItem('userid');
      this.getuserSessionId = sessionStorage.getItem('userid');
      //////console.log('LocalStored userId :- ', this.getUserId, '-----', 'SessionStored userId :- ', this.getuserSessionId);
      this.selectedRowIndex = row.id;
      this.rowId = row.id;
      this.c=this.rowId;
      this.pieGraph = [];
      this.DonutFun();
      this.lineDisplayValue = false;
      this.SugTableDisplayValue = false;
      this.SugBoxisplayValue = false;
      this.DivDisplayMaxVal = false;
      this.DivDisplayMinVal = true;
      this.sugTabHead = '';
      this.CheckId = null;
      this.CheckId2 = null;
      this.TotSen = this.PieData[0].length;
      this.TotErr = this.PieData[0].tot_err;
      this.pieGaugeDisplayValue = true;
      this.TotSenErrDisplayValue = false;
  }
}
/*--------------------------------------Hilight Row Function End----------------------------------------------------*/

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*--------------------------------------Function for Pie Chart Starts----------------------------------------------------*/
  public DonutFun() {
    this.PieData = [];
    this.single = [];
    this.d=this.userTabData;
    for (let c of this.d) {
      this.PieData.push(
      new examplePieData(this.d[this.c].length, this.d[this.c].tot_err, this.d[this.c].begin, this.d[this.c].loose, this.d[this.c].tense, this.d[this.c].buggy, this.d[this.c].negative, this.d[this.c].comma, this.d[this.c].words, this.d[this.c].phrase, this.d[this.c].date));
      break;
    }
    this.c=0;

    this.single = [
      {
       "name": "Starting and Ending of the Sentence",
        "value": this.PieData[0].begin
      },
      {
        "name": "Loose Sentence",
        "value": this.PieData[0].loose
      },
      {
        "name": "Tense",
        "value": this.PieData[0].tense
      },
      {
        "name": "Buggy Words",
        "value": this.PieData[0].buggy
      },
      {
        "name": "Negativity",
        "value": this.PieData[0].negative
      },
      {
        "name": "Punctuation",
        "value": this.PieData[0].comma
      },
      {
        "name": "Terse Writing",
        "value": this.PieData[0].words
      },
      {
        "name": "Buggy phrase",
        "value": this.PieData[0].phrase
      }
    ];
    this.docQuality = Math.floor(100-((this.PieData[0].tot_err/this.PieData[0].length)*100));
  }
/*--------------------------------------Function for Pie Chart Ends----------------------------------------------------*/

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*--------------------------------------Function for Pie Select Starts----------------------------------------------------*/
   public newpieName:string;
      public newName: string;


  public OnPieSelect(event) {

    if(event.name=="Buggy Words") {
     this.newpieName = "Buggy word";
     this.newName = event.name;
     //console.log("this.newpieName => ", this.newpieName);
     this.spellCheckErr = false;
     this.Errors = true;
     this.pieOperation(); 
    }
    if(event.name=="Negativity") {
     this.newpieName = "Negative term";
     this.newName = event.name;
     //console.log("negativity_newpieName => ", this.newpieName);
     this.spellCheckErr = false;
     this.Errors = true;
     this.pieOperation(); 
    }
    if(event.name=="Terse Writing") {
     this.newpieName = "Useless word";
     this.newName = event.name;
     //console.log("this.newpieName => ", this.newpieName);
     this.spellCheckErr = false;
     this.Errors = true;
     this.pieOperation(); 
    }
    if(event.name=="Starting and Ending of the Sentence") {
     this.newpieName = "Should not begin";
     this.newName = event.name;
     //console.log("this.newpieName => ", this.newpieName);
     this.spellCheckErr = false;
     this.Errors = true;
     this.pieOperation(); 
    }
    if(event.name=="Tense") {
     this.newpieName = "Tense";
     this.newName = event.name;
     //console.log("this.newpieName => ", this.newpieName);
     this.spellCheckErr = false;
     this.Errors = true;
     this.pieOperation(); 
    }
    if(event.name=="Punctuation") {
     this.newpieName = "Punctuation";
     this.newName = event.name;
     //console.log("negativity_newpieName => ", this.newpieName);
     this.spellCheckErr = false;
     this.Errors = true;
     this.pieOperation(); 
    }
    if(event.name=="Loose Sentence") {
     this.newpieName = "Loose sentence";
     this.newName = event.name;
     //console.log("this.newpieName => ", this.newpieName);
     this.spellCheckErr = false;
     this.Errors = true;
     this.pieOperation(); 
    }
    if(event.name=="Spell check") {
     this.newpieName = "Buggy phrase";
     this.newName = event.name;
     //console.log("this.newpieName => ", this.newpieName);
     this.spellCheckErr = true;
     this.Errors = false;
     this.pieOperation(); 
    } 
  }

  public pieOperation() {
    if (this.sugTabHead == this.newName) {
      this.SugTableDisplayValue = false;
      this.SugBoxisplayValue = false;
      this.sugTabHead = '';
      this.CheckId = null;
      this.CheckId2 = null;
    }
    else {
      this.progressbar=true;
      //////console.log('userId :-', this.userStatus);
      this.sugTabDataSource = null;
      this.CheckId = null;
      this.CheckId2 = null;
    this.sugTab = [];
    this.sugTabHead = this.newName;
    let Piebody = new URLSearchParams();
    this.SugTableDisplayValue = true;
    this.SugBoxisplayValue = false;
      Piebody.append('usermail', this.usr);
    Piebody.append('dat', this.PieData[0].date);
    Piebody.append('labe', this.newpieName);
    let Pieoptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')};
      this.http.post(this.apiPieData, Piebody.toString(), Pieoptions).subscribe((res:any)=> {
       //console.log('API Response :- ', res);
      for (let i of Object.keys(res)) {
        this.sugTab.push(
          new sugTabdata((Object.keys(res)[this.i]), (Object.values(res)[this.i]), this.id));
        this.i++;
        this.id++;
      }
      this.progressbar=false;
      this.i = 0;
      this.id=0;
      //console.log(this.sugTab);
      this.sugTabDataSource = new MatTableDataSource(this.sugTab);
  },
      err => {
         ////console.log("error occured");
       }
    );
}
} 

/*--------------------------------------Function for Pie Select Ends----------------------------------------------------*/

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*--------------------------------------Function for Suggest Table Starts----------------------------------------------------*/
 
  SugRowIndex: number = -1;
  public Sughighlight(row) {
    this.SugRowIndex = row.id;
  }

  CheckId2: number;
  public SugClick(values,index) {
    //////console.log("id = ", values.id);
  this.DocExample = values.sugSen[1][index];
  if (this.CheckId == index && this.CheckId2 == values.id) {
    this.SugBoxisplayValue = false;
    this.CheckId = null;
    this.CheckId2 = null;
    this.mistakeHead = 'Sentence mistake';
    this.suggestionHead = 'Sententia suggestion';
    this.examples = false;
  }
  else {
    this.CheckId2 = values.id;
    this.CheckId = index;
    this.mistakeHead = 'Sentence mistake';
    this.suggestionHead = 'Sententia suggestion';
    this.examples = true;
    this.SugBoxisplayValue = true;
    this.examples = true;
    this.DocErr = '';
    this.DocSug = '';
    this.DocErr = values.errSen;
    this.DocSug = values.sugSen[0][index];
  }
  }

    public SpellClick(values,index) {
    //console.log("value, index = ", values, index);
  this.DocExample = values[1];
  if (this.CheckId == index && this.CheckId2 == values.id) {
    this.SugBoxisplayValue = false;
    this.CheckId = null;
    this.CheckId2 = null;
    this.mistakeHead = 'Spelling mistake';
    this.suggestionHead = 'Suggestion';
    this.examples = false;
  }
  else {
    this.CheckId2 = values.id;
    this.CheckId = index;
    this.mistakeHead = 'Spelling mistake';
    this.suggestionHead = 'Suggestion';
    this.examples = false;
    this.SugBoxisplayValue = true;
    this.DocErr = '';
    this.DocSug = '';
    this.DocErr = values[0];
    this.DocSug = values[1];
  }
  }
/*--------------------------------------Function for Suggest Table Ends----------------------------------------------------*/

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*--------------------------------------Function for Closing Suggest Table Starts----------------------------------------------------*/

  public SugTabCls() {
    this.SugBoxisplayValue = false;
    this.SugTableDisplayValue = false;
    this.CheckId = null;
    this.CheckId2 = null;
    this.sugTabHead = '';
      this.DivDisplayMaxVal = false;
      this.DivDisplayMinVal = true;
  }

  public SugBoxCls() {
    this.SugBoxisplayValue = false;
    this.CheckId = null;
    this.CheckId2 = null;
  }

  public getFileData() {
    ////console.log("this.usr from getFileData", this.usr);
    this.mainTable = false;
    this.userTabData = [];
    let body = new URLSearchParams();
    body.set('usermail', this.usr);
    let options = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')};
    this.http.post(this.apiTabData, body.toString(), options).subscribe((res:any)=> {           // 1st table
      ////console.log('Table Data API Response :- ', res);



      for (let i of res) {
        this.userTabData.push(
        new userData(i.begin, i.loose, i.tense, i.tot_err, i.buggy, i.negative, i.nam, i.length, i.comma, i.words, i.date, i.phrase, this.id));
        this.id++;
      }
      this.id = 0;
      this.mainTable = true;
      ////console.log('My Array :- ', this.userTabData);
      this.dataSource = new MatTableDataSource(this.userTabData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
     

      },  
      err => {
        this.alertGraphMsg = "Failed to load Table Data.";
      });
  }

  public getLineData() {
    ////console.log("this.usr from getLineData", this.usr);
    this.lineDisplayValue = false;
    this.LineGraph = [];
    let linebody = new URLSearchParams();
    linebody.set('usermail', this.usr);
    let lineoptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')};
      this.http.post(this.apiLineData, linebody.toString(), lineoptions).subscribe((res:any)=> {
        ////console.log('Line Graph API Response :- ', res);
        for (let i of res) {
          this.LineGraph.push({
            "name": res[this.i].date,
            "value": res[this.i].qual
          });
          this.i++;
        }
        this.lineDisplayValue = true;
        this.newGraph = [{
          "name": "Document Quality",
          "series": this.LineGraph
        }];
        this.i=0;
        ////console.log(this.newGraph);
        },
        err => {
          this.alertGraphMsg = "Failed to load Graph Data.";
        });
  }
/*--------------------------------------Function for Closing Suggest Table Ends----------------------------------------------------*/

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

public onChange(usr): void {
        ////console.log("usr =>", usr);
        this.usr = usr;
        this.lineDisplayValue = false;
        this.mainTable = false;
        this.pieGaugeDisplayValue = false;
        this.SugTableDisplayValue = false;
        this.SugBoxisplayValue = false;
        this.CheckId = null;
        this.CheckId2 = null;
        this.selectedRowIndex = -1;
        this.getFileData();
        this.getLineData();
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

/*--------------------------------------ngOnInit Starts----------------------------------------------------*/
    
    newGraph: any[];
  ngOnInit() {
    this.progressbar=false;
    this.lineDisplayValue = false;
    this.mainTable = false;
    this.lineDisplayValue = false;
    this.mainTable = false;
    this.userStatus = localStorage.getItem('loginid');
    let selectUserBody = new URLSearchParams();
    selectUserBody.append('usermail', this.userStatus);
    let selectUseroptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')}; 
      this.http.post(this.selectUserApi, selectUserBody.toString(), selectUseroptions).subscribe((res:any)=> {
        for (let i of res) {
           this.selectuserInfo.push(
            new selectuserinfoData(i.userid, i.name))
        }
      },
      err => {
         ////console.log("error occured");
       }
      );
    }
}

/*--------------------------------------ngOnInit Starts----------------------------------------------------*/

////////////////////////////////////////////////////////////////////////////////////////////////////

/*--------------------------------------Classes Starts----------------------------------------------------*/

export class tablenamedata {
  constructor(public id: string, public name: string, public dates: string, public quality: number){}
}

export class piegraphdata {
  constructor(public name: string, public value: string){}
}

export class userData {
  constructor(public begin: string,
        public loose: string,
        public tense: string,
        public tot_err: any,
        public buggy: string,
        public negative: string,
        public nam: string,
        public length: any,
        public comma: string,
        public words: string,
        public date: string,
        public phrase: string,
        public id: number = 0){}
}


export class examplePieData {
  constructor(
        public length: any,
        public tot_err: any,
        public begin: string,
        public loose: string,
        public tense: string,
        public buggy: string,
        public negative: string,
        public comma: string,
        public words: string,
        public phrase: string,
        public date: string){}
}

export class apiLineGraphData {
  constructor(public date: string,
        public qual: string,
        public i: number){}
}

export class sugTabdata {
  constructor(public errSen: any,
        public sugSen: any,
        public id: number = 0){}
}


export class selectuserinfoData {
  constructor(public userid: string,
        public name: string){}
}
/*--------------------------------------Classes Ends----------------------------------------------------*/
