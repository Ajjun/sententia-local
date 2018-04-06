import { Component, OnInit, ViewChild, AfterViewInit, OnChanges, SimpleChanges, Input, Injectable, ElementRef, forwardRef } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
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
import { QuillEditorModule } from 'ngx-quill-editor';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';
import {Keepalive} from '@ng-idle/keepalive';


@Component({
  selector: 'app-docupload',
  templateUrl: './docupload.component.html',
  styleUrls: ['./docupload.component.css']
})
export class DocuploadComponent implements OnInit {
  public apiUpload = "/api/quick_analysis";
   public apiSignout = "/api/signout";
  userStatus: string;
  uploadLoadingDisplayValue: boolean = true;
  fileInp:number;
  textData: string;
  userid: string;
  uploadDiv: boolean =true;
  quickDiv: boolean = false;
  @ViewChild('fileInp') input: ElementRef;
  //@ViewChild('f') input2: ElementRef;
  //@ViewChild('file_name') input3: ElementRef;

public HandleBrowseClick() {
  ////console.log('clicked');
   var fileinput = document.getElementById("f");
    fileinput.click();
}

public toggleView(){
  this.uploadDiv = false;
  this.quickDiv = true;
}
 public homeView(){
  this.uploadDiv = true;
  this.quickDiv = false;
}

public LoadImg() {
    this.fileInp = this.input.nativeElement.value.length;
    //var FileSize = (<HTMLInputElement>document.getElementById("f")).files[0].size;
    if (this.fileInp == 0) {
      this.uploadLoadingDisplayValue = true;
      alert('No file selected.Please select a file to be uploaded.');
      return false; 
    }
    else {
       this.uploadLoadingDisplayValue = false;
       //console.log('file is ready to upload');
       return true;  
    }
}

 onContentChanged({ quill, html, text }) {
    this.textData = text;
    this.idle.watch();
  }

public quickAnalysis(){
    //console.log("this.textData", this.textData);
  this.userStatus = localStorage.getItem('loginid');
    let body = new URLSearchParams();
    body.set('usermail', this.userStatus);
    body.set('quick', this.textData);
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')};
      this.http.post(this.apiUpload, body.toString(), options).subscribe((res:any)=> {
        this.router.navigateByUrl('/submit');
  },
  err => {
    alert("Error occured on loading Table. Please reload the page.")
  });
}


    public editor;
     public editorContent = '';
     public editorOptions = {
     placeholder: "Maximum 500 words. Formatting will not be saved",
     modules : {
     toolbar: [
     ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
     ['blockquote', 'code-block'],

     [{ 'header': 1 }, { 'header': 2 }],               // custom button values
     [{ 'list': 'ordered'}, { 'list': 'bullet' }],
     [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
     [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
     [{ 'direction': 'rtl' }],                         // text direction

     [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
     [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
     ['clean']                        // link and image, video
   ]}
 };
  constructor(private http: HttpClient,private router: Router, private idle: Idle) { }

  onEditorBlured(quill) {
    ////console.log("Quill blurred");
  }

  onEditorFocused(quill) {
    ////console.log("Quill focused");
  }

  onEditorCreated(quill) {
    this.editor = quill;
    //console.log("Quill created");
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
    this.userStatus = localStorage.getItem('loginid');
    //console.log(this.userStatus);
  }

}
