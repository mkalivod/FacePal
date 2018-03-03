import { Component, OnInit } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";
import { WebcamImage } from 'ngx-webcam';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'

@Component({
  selector: 'app-verify-customer',
  templateUrl: './verify-customer.component.html',
  styleUrls: ['./verify-customer.component.css']
})
export class VerifyCustomerComponent {
  data;
  constructor(private httpClient: HttpClient) { }

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();

  // latest snapshot
  public webcamImage: WebcamImage = null;

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info("received webcam image", webcamImage);
    this.webcamImage = webcamImage;
    console.log(this.webcamImage);
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  onSubmit() {

    const corsString: string = 'https://cors-anywhere.herokuapp.com/';
    const urlString: string = 'https://api.kairos.com/enroll';
    // const urlString: string = 'https://api.kairos.com/gallery/list_all';


    const firstName = 'Barack';
    const lastName = 'Obama';
    const profileImage = 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Official_portrait_of_Barack_Obama.jpg';

    // const headers = new HttpHeaders();
    // headers.set('content-Type', 'application/json');
    // headers.set('app_id', '299078c0');
    // headers.set('app_key', '0004235442d8fe37c6a315b2de0a40e8');

    // const params = new HttpParams();
    // params.set('image', profileImage);
    // params.set('subject_id', firstName + lastName);
    // params.set('gallery_name', 'FirstGallery');

    this.data = this.httpClient.get(corsString + urlString, {
      headers: {
        'content-Type': 'application/json',
        'app_id': '299078c0',
        'app_key': '0004235442d8fe37c6a315b2de0a40e8'
      },
      observe: 'response',
      params: {
        'image': profileImage,
        'subject_id': firstName + lastName,
        'gallery_name': 'FirstGallery'
      }
    }).subscribe(
      data => {
        console.log(data);
      }
    );

  }

  onSubmit2() {

    const corsString: string = 'https://cors-anywhere.herokuapp.com/';
    const urlString: string = 'https://developer.nps.gov/api/v1/parks?stateCode=co';


    // let key = 'ZKLb9xO0SnI4KkfXFdoM9fmLuFkJqtfVtXKPpxM0';
    // const headers = new HttpHeaders();
    // headers.set('X-Api-Key', key);


    this.data = this.httpClient.get(corsString + urlString, {
      headers: {
        'content-Type': 'application/json',
        'X-Api-Key': 'ZKLb9xO0SnI4KkfXFdoM9fmLuFkJqtfVtXKPpxM0'
      },
      observe: 'response'
    }).subscribe(
      data => {
        console.log(data);
      }
    );
  }

  onSubmit3() {


    const corsString: string = 'https://cors-anywhere.herokuapp.com/';
    const urlString: string = 'https://developer.nps.gov/api/v1/parks?stateCode=co';


    let key = 'ZKLb9xO0SnI4KkfXFdoM9fmLuFkJqtfVtXKPpxM0';
    const headers = new HttpHeaders();
    headers.set('X-Api-Key', key);


    this.data = this.httpClient.get(corsString + urlString, { headers, observe: 'response' }).subscribe(
      data => {
        console.log(data);
      }
    );
  }

  callAPI(url, body, headers) {

  }

}