import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import { IRoboAssistant, IReview } from './types';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise'; // !!!!! NOTE: import this in any file you need to add `toPromise` to !!!!!

@Injectable()
export class RoboAssistantService {

  baseUrl = 'http://robo.nyllab.com';
  authToken = '58fb726b884edb320127f409'; // from api
  bots: IRoboAssistant[];

  //   {
  //   "error": false,
  //   "message": "Please use the token as the Authorization header. Happy requesting!",
  //   "info": {
  //     "version": "v2.1",
  //     "token": "58fb726b884edb320127f409",
  //     "referenceID": "28866435879B",
  //     "timeToLive": 9999999999,
  //     "user": {
  //       "name": "Sridhar Mane",
  //       "email": "sridhars4s@gmail.com"
  //     }
  //   }
  // }

  constructor(private http: Http) {
    this.getAllRoboAssistants();
  }

  helloWorld(): Promise<string> {

    // mock an asynchronous request:
    let mockAsyncRequest = new Promise((resolve, reject) => {
      setTimeout(() => resolve("Hello World!"))
    });
    return mockAsyncRequest;
  }

  getAllRoboAssistants() {
    // TODO: use the http service to fetch from the api

    // Header and RequestOptions classes is provided for setting headers in your request
    // https://angular.io/docs/ts/latest/guide/server-communication.html#!#send-data-to-the-server

    const headers = new Headers();
    headers.append('Authorization', this.authToken);

    return this.http.get(this.baseUrl + '/bots', {
      headers: headers
    }).toPromise().then(res => {
      this.bots = res.json();
      return res.json();
    });

  }

  getRoboAssisstant(roboId: string) {
    return new Promise((resolve, reject) => {
      if (this.bots) {
        resolve(this.bots.find(bots => bots.robo_id === roboId));
      } else {
        this.getAllRoboAssistants().then(() => {
          resolve(this.bots.find(bots => bots.robo_id === roboId));
        });
      }

    });
  }

  getReviews(reviewId: string):Promise<IReview[]> {
    console.log('Review Id:', reviewId);
    const headers = new Headers();
    headers.append('Authorization', this.authToken);

    return this.http.get(this.baseUrl + '/reviews/' + reviewId, {
      headers: headers
    }).toPromise().then(res => {
      // console.log(res.json().content);
      return res.json().content;
    });
  }

  searchRoboAssistantsByName(searchText: string) {
    return this.bots.filter(bot => {
      return (bot.name.toLowerCase().indexOf(searchText.toLowerCase()) >= 0);
    });
  }




}
