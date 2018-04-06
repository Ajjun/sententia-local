import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpModule } from '@angular/http';

@Component({
  selector: 'app-my-learning',
  templateUrl: './my-learning.component.html',
  styleUrls: ['./my-learning.component.css']
})
export class MyLearningComponent implements OnInit {

  public loginid :string;
    
  category1:string;
  category2 : string ;

  public mylearningApi = "/api/my_learning"

  learningArray: any;
  learningValues:any;
  videos1: any;
  books1: any;
  links1: any;
  apps1: any;
  online1: any;
  audio1: any;
  videoData1: videoData1[] = [];
  bookData1: videoData1[] = [];
  linksData1: videoData1[] = [];
  appsData1: videoData1[] = [];
  onlineData1: videoData1[] = [];
  audioData1: videoData1[] = []; 
  videos2: any;
  books2: any;
  links2: any;
  apps2: any;
  online2: any;
  audio2: any;
  videoData2: videoData1[] = [];
  bookData2: videoData1[] = [];
  linksData2: videoData1[] = [];
  appsData2: videoData1[] = [];
  onlineData2: videoData1[] = [];
  audioData2: videoData1[] = [];
  token: string;

  cat1: boolean = false;
  cat2: boolean =false;

  constructor(private http:HttpClient) { }
  
  
  ngOnInit() {


    this.loginid = localStorage.getItem('loginid');
    this.token = localStorage.getItem('token');
   

   let mylearningBody = new URLSearchParams();
       mylearningBody.append('usermail', this.loginid);
        
   let mylearningoptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')}; 
      this.http.post(this.mylearningApi, mylearningBody.toString(), mylearningoptions).subscribe((res:any)=> {
        
        this.category1 = Object.keys(res)[0];
        this.category2 = Object.keys(res)[1];
        //console.log("cat1 cat2",this.category1, this.category2)
        console.log("res",res)
        console.log("category1",this.category1)
        console.log("category2",this.category2)
        
        this.learningArray = res;
       
        for (let j of (Object.keys(this.learningArray))){
           console.log("learningArray---------",j)

          if (j == this.category1 ){
            this.cat1 = true;
             console.log("res--------------------------",j)
          this.learningValues =(Object.values(this.learningArray));
          this.videos1 = this.learningValues[0][0];
          this.books1 = this.learningValues[0][1];
          this.links1 = this.learningValues[0][2];
          this.apps1 = this.learningValues[0][3];
          this.online1 = this.learningValues[0][4];
          this.audio1 = this.learningValues[0][5];
          
          for (let key in this.videos1){
            
           this.videoData1.push(
             new videoData1(key, this.videos1[key]));
           }

           for (let key in this.books1){
            
           this.bookData1.push(
             new bookData1(key, this.books1[key]));
           }

           for (let key in this.links1){
             this.linksData1.push(
             new linksData1(key, this.links1[key]));
           }

           for (let key in this.apps1){
            
           this.appsData1.push(
             new appsData1(key, this.apps1[key]));
           }

           for (let key in this.online1){
            
           this.onlineData1.push(
             new onlineData1(key, this.online1[key]));
           }

           for (let key in this.audio1){
            
           this.audioData1.push(
             new audioData1(key, this.audio1[key]));
           }
          }

           if(j == this.category2 ){
             this.cat2=true;
           console.log("res================================",j)
          this.learningValues =(Object.values(this.learningArray));
          this.videos2 = this.learningValues[1][0];
          this.books2 = this.learningValues[1][1];
          this.links2 = this.learningValues[1][2];
          this.apps2 = this.learningValues[1][3];
          this.online2 = this.learningValues[1][4];
          this.audio2 = this.learningValues[1][5];
          
          for (let key in this.videos2){
            
           this.videoData2.push(
             new videoData2(key, this.videos2[key]));
           }

           for (let key in this.books2){
           
           this.bookData2.push(
             new bookData2(key, this.books2[key]));
           }

           for (let key in this.links2){
            
           this.linksData2.push(
             new linksData2(key, this.links2[key]));
           }

           for (let key in this.apps2){
            
           this.appsData2.push(
             new appsData2(key, this.apps2[key]));
           }

           for (let key in this.online2){
            
           this.onlineData2.push(
             new onlineData2(key, this.online2[key]));
           }

           for (let key in this.audio2){
           
           this.audioData2.push(
             new audioData2(key, this.audio2[key]));
           }
          }
        
        }
        
       
      },
    
      err => {
         console.log("error occured");
       }
      );
  }

}


export class videoData1 {
  constructor(public key: any,
              public value: any){}
}
export class bookData1 {
  constructor(public key: any,
              public value: any){}
}
export class linksData1 {
  constructor(public key: any,
              public value: any){}
}
export class appsData1 {
  constructor(public key: any,
              public value: any){}
}
export class onlineData1 {
  constructor(public key: any,
              public value: any){}
}
export class audioData1 {
  constructor(public key: any,
              public value: any){}
}

export class videoData2 {
  constructor(public key: any,
              public value: any){}
}
export class bookData2 {
  constructor(public key: any,
              public value: any){}
}
export class linksData2 {
  constructor(public key: any,
              public value: any){}
}
export class appsData2 {
  constructor(public key: any,
              public value: any){}
}
export class onlineData2 {
  constructor(public key: any,
              public value: any){}
}
export class audioData2 {
  constructor(public key: any,
              public value: any){}
}