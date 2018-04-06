import { Component, OnInit, ViewChild, AfterViewInit, OnChanges, SimpleChanges, Input, Injectable } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {linegraphdata} from '../linegraphdata';
import {BrowserModule} from '@angular/platform-browser';
//import { TABLESDATA, tabledata } from '../mock-table';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {merge} from 'rxjs/observable/merge';
import {of as observableOf} from 'rxjs/observable/of';
import {catchError} from 'rxjs/operators/catchError';
import {map} from 'rxjs/operators/map';
import {startWith} from 'rxjs/operators/startWith';
import {switchMap} from 'rxjs/operators/switchMap';
import 'rxjs/add/operator/toPromise';
import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';
import {Keepalive} from '@ng-idle/keepalive';

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.css']
})
export class SubmitComponent implements OnInit {
  pieGraph: piegraphdata[] = [];
  userTabData: userData[] = [];
  PieData: examplePieData[] = [];
  sugTab: sugTabdata[] = []; 
  i: number  = 0;
  id:number  = 0;
  fileId: number = 0;
  userStatus: string;
  apiUploadData: string = '/api/user_result';
  gaugeVal: number;
  c:number = 0;
  documentName: string;
  InfoAfterClickVal: boolean = false;
  sugColumnName: string = 'Column';
  sugTabHead: string = 'Table name';
  displayedSugColumns = [this.sugColumnName];
  DocErr: string;
  DocSug: string;
  DocExample: string = 'Some Example';
  InfoDisplayNoneVal: boolean = false;
  DownBtnText: string = 'Download';
  CheckId2: number;
  progressbar: boolean = false;
  Errors: boolean;
  spellCheckErr:boolean;
  mistakeHead: string = 'Sentence mistake';
  suggestionHead: string = 'Sententia suggestion';
  examples: boolean = true;
  GagueDisp: boolean = false;
  DonutDisp: boolean = false;
  TotSen: string;
  TotErr: string;

/*------------------------------------------------------------------------------------------------------*/


  sugTabDataSource = null;
  gaugeType = "semi";
  gaugeLabel = "Document quality indicator";
  gaugeAppendText = "%";
  rowbgc: string;
  clicked: number = 1;
  displayedColumns = ['docname', 'date'];

////////////////////////////////////////////////////////////////////////////////////////////////////
  public apiPostExample = "/api/subscription"
  public apiTabData = "/api/admin_value"
  public apiLineData = "/api/bar_value"
  public apiPieData = "/api/donut_value"
  public apiDownload = "/api/Download"
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
////////////////////////////////////////////////////////////////////////////////////////////////////
public colorSchemeLineGraph = {
    domain: ['#406d9b']
  };

public colorSchemePieeGraph = {
    domain: ['#406d9b', '#af1818', '#d1ca19', '#8dd118', '#18d193', '#af2764', '#e09018', '#98af17']
  };
////////////////////////////////////////////////////////////////////////////////////////////////////


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase();
  this.sugTabDataSource.filter = filterValue;
  }

d:any;
  single:any;
  public someFun() {
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
        "name": "Spell check",
        "value": this.PieData[0].phrase
      }
];}


    piedata: any[];
    piegraphview: any[] = [480, 350];
    //showLegendPieGraph = true;
    showLabels = true;
    explodeSlices = false;
    doughnut = true;
    showLegendPieGraph = false;
    gradient = true;
    DownloadUrl: string;

public docDownload() {
    this.DownBtnText = 'Downloading...';
  let Downloadbody = new URLSearchParams();
    Downloadbody.set('usermail', this.userStatus);
    let Downloadoptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')};
      this.http.post(this.apiDownload, Downloadbody.toString(), Downloadoptions).subscribe((res:any)=> {
       //console.log('Download API Response :- ', res);
       this.DownloadUrl = res;
       window.location.href = this.DownloadUrl;
       },
      err => {
        alert('Download error occured');
      }
      );
    this.DownBtnText = 'Download';
    }

SugTableDisplayValue: boolean = false;
    key: any;
    val: any;

     public newpieName:string;
      public newName: string;

  public OnPieSelect(event) {

    if(event.name=="Buggy Words") {
      this.idle.watch();
     this.newpieName = "Buggy word";
     this.newName = event.name;
     console.log("this.newpieName => ", this.newpieName);
     this.spellCheckErr = false;
     this.Errors = true;
     this.pieOperation(); 
    }
    if(event.name=="Negativity") {
      this.idle.watch();
     this.newpieName = "Negative term";
     this.newName = event.name;
     console.log("negativity_newpieName => ", this.newpieName);
     this.spellCheckErr = false;
     this.Errors = true;
     this.pieOperation(); 
    }
    if(event.name=="Terse Writing") {
      this.idle.watch();
     this.newpieName = "Useless word";
     this.newName = event.name;
     console.log("this.newpieName => ", this.newpieName);
     this.spellCheckErr = false;
     this.Errors = true;
     this.pieOperation(); 
    }
    if(event.name=="Starting and Ending of the Sentence") {
      this.idle.watch();
     this.newpieName = "Should not begin";
     this.newName = event.name;
     console.log("this.newpieName => ", this.newpieName);
     this.spellCheckErr = false;
     this.Errors = true;
     this.pieOperation(); 
    }
    if(event.name=="Tense") {
      this.idle.watch();
     this.newpieName = "Tense";
     this.newName = event.name;
     console.log("this.newpieName => ", this.newpieName);
     this.spellCheckErr = false;
     this.Errors = true;
     this.pieOperation(); 
    }
    if(event.name=="Punctuation") {
      this.idle.watch();
     this.newpieName = "Punctuation";
     this.newName = event.name;
     console.log("negativity_newpieName => ", this.newpieName);
     this.spellCheckErr = false;
     this.Errors = true;
     this.pieOperation(); 
    }
    if(event.name=="Loose Sentence") {
      this.idle.watch();
     this.newpieName = "Loose sentence";
     this.newName = event.name;
     console.log("this.newpieName => ", this.newpieName);
     this.spellCheckErr = false;
     this.Errors = true;
     this.pieOperation(); 
    }
    if(event.name=="Spell check") {
      this.idle.watch();
     this.newpieName = "Buggy phrase";
     this.newName = event.name;
     console.log("this.newpieName => ", this.newpieName);
     this.spellCheckErr = true;
     this.Errors = false;
     this.pieOperation(); 
    } 
  }
  
  public pieOperation() {
    if (this.sugTabHead == this.newName) {
      this.SugTableDisplayValue = false;
      this.InfoAfterClickVal = false;
      this.SugBoxisplayValue = false;
      this.InfoDisplayNoneVal = false;
      this.sugTabHead = '';
      this.CheckId = null;
      this.CheckId2 = null;
      this.idle.watch();

    }
    else {
      this.idle.watch();
      this.progressbar=true;
      ////console.log('userId :-', this.userStatus);
      this.sugTabDataSource = null;
      this.CheckId = null;
      this.CheckId2 = null;
    this.sugTab = [];
    this.sugTabHead = this.newName;
    let Piebody = new URLSearchParams();
    this.SugTableDisplayValue = true;
    this.SugBoxisplayValue = false;
    this.InfoAfterClickVal = true;
    this.InfoDisplayNoneVal = false;
      Piebody.append('usermail', this.userStatus);
    Piebody.append('dat', this.PieData[0].date);
    Piebody.append('labe', this.newpieName);
    let Pieoptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')};
      this.http.post(this.apiPieData, Piebody.toString(), Pieoptions).subscribe((res:any)=> {
       console.log('API Response :- ', res);
      for (let i of Object.keys(res)) {
        this.sugTab.push(
          new sugTabdata((Object.keys(res)[this.i]), (Object.values(res)[this.i]), this.id));
        this.i++;
        this.id++;
      }
      this.progressbar=false;
      this.i = 0;
      this.id=0;
      console.log(this.sugTab);
      this.sugTabDataSource = new MatTableDataSource(this.sugTab);
  },
      err => {
         //console.log("error occured");
       }
    );
}
} 

public SugTabCls() {
    this.SugBoxisplayValue = false;
    this.InfoDisplayNoneVal = false;
    this.SugTableDisplayValue = false;
    this.CheckId = null;
    this.CheckId2 = null;
    this.sugTabHead = '';
    this.InfoAfterClickVal = false;
    this.idle.watch();
  }

  SugRowIndex: number = -1;
  public Sughighlight(row) {
    this.SugRowIndex = row.id;
    this.idle.watch();
  }


  public SugBoxCls() {
    this.SugTableDisplayValue = true;
    this.SugBoxisplayValue = false;
    this.InfoAfterClickVal = true;
    this.InfoDisplayNoneVal = false;
    this.CheckId = null;
    this.CheckId2 = null;
    this.idle.watch();

  }

 CheckId: number;
 SugBoxisplayValue: boolean = false;

  public SugClick(values,index) {
    ////console.log("id = ", values.id);
  this.DocExample = values.sugSen[1][index];
  if (this.CheckId == index && this.CheckId2 == values.id) {
    this.SugBoxisplayValue = false;
    this.InfoDisplayNoneVal = false;
    this.CheckId = null;
    this.CheckId2 = null;
    this.mistakeHead = 'Sentence mistake';
    this.suggestionHead = 'Sententia suggestion';
    this.examples = false;
    this.idle.watch();
  }
  else {
    this.CheckId2 = values.id;
    this.CheckId = index;
    this.mistakeHead = 'Sentence mistake';
    this.suggestionHead = 'Sententia suggestion';
    this.examples = true;
    this.SugBoxisplayValue = true;
    this.InfoDisplayNoneVal = true;
    this.examples = true;
    this.DocErr = '';
    this.DocSug = '';
    this.DocErr = values.errSen;
    this.DocSug = values.sugSen[0][index];
    this.idle.watch();
  }
  }

  public SpellClick(values,index) {
    console.log("value, index = ", values, index);
  this.DocExample = values[1];
  if (this.CheckId == index && this.CheckId2 == values.id) {
    this.SugBoxisplayValue = false;
    this.InfoDisplayNoneVal = false;
    this.CheckId = null;
    this.CheckId2 = null;
    this.mistakeHead = 'Spelling mistake';
    this.suggestionHead = 'Suggestion';
    this.examples = false;
    this.idle.watch();
  }
  else {
    this.CheckId2 = values.id;
    this.CheckId = index;
    this.mistakeHead = 'Spelling mistake';
    this.suggestionHead = 'Suggestion';
    this.examples = false;
    this.SugBoxisplayValue = true;
    this.InfoDisplayNoneVal = true;
    this.DocErr = '';
    this.DocSug = '';
    this.DocErr = values[0];
    this.DocSug = values[1];
    this.idle.watch();
  }
  }

  constructor(private http: HttpClient, private idle: Idle) {
  Object.assign(this, this.single);
   }

  ngOnInit() {
    this.userStatus = localStorage.getItem('loginid');
    let Uploadbody = new URLSearchParams();
    Uploadbody.set('usermail', this.userStatus);
    let Uploadoptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')};
      this.http.post(this.apiUploadData, Uploadbody.toString(), Uploadoptions).subscribe((res:any)=> {
       //console.log('Table Data API Response :- ', res);
      for (let i of res) {
        this.userTabData.push(
        new userData(res[this.i].begin, res[this.i].loose, res[this.i].tense, res[this.i].tot_err, res[this.i].buggy, res[this.i].negative, res[this.i].nam, res[this.i].length, res[this.i].comma, res[this.i].words, res[this.i].date, res[this.i].phrase, this.id));
        this.id++;
        this.i++;
      }
      this.TotSen = this.userTabData[0].length;
      this.TotErr = this.userTabData[0].tot_err;
      console.log("this.TotSen => ", this.TotSen, "\n", "this.TotErr => ", this.TotErr);
      this.i=0;
      this.fileId = 0;
      this.id = 0;
      this.documentName = this.userTabData[0].nam;
      this.gaugeVal = Math.floor(100-((this.userTabData[0].tot_err/this.userTabData[0].length)*100));
      this.someFun();
    },
      err => {
       }
    );
     setTimeout(() => {this.GagueDisp = true;}, 500);
     setTimeout(() => {this.DonutDisp = true;}, 600);
      
  }

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

export class sugTabdata {
  constructor(public errSen: any,
        public sugSen: any,
        public id: number = 0){}
}