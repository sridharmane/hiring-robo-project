import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions } from "@angular/http";

import 'rxjs/add/operator/toPromise'; // !!!!! NOTE: import this in any file you need to add `toPromise` to !!!!!

@Injectable()
export class RoboAssistantService {

  constructor(private http: Http) {
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

    return this.http.get("http://URL") //TODO: add the url
      .toPromise()
      .then(res => res.json().data )
  }


}
