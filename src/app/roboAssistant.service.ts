import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import { IRoboAssistant, IReview } from './types';
import 'rxjs/add/operator/toPromise'; // !!!!! NOTE: import this in any file you need to add `toPromise` to !!!!!

@Injectable()
export class RoboAssistantService {

  baseUrl = 'http://robo.nyllab.com'; // Base URL of the repo
  authToken = '58fb726b884edb320127f409'; // Auth token for the api
  bots: IRoboAssistant[]; // Stores the list of bots
  models = []; // Stores the uniqe set of model numbers

  constructor(private http: Http) { }

  helloWorld(): Promise<string> {

    // mock an asynchronous request:
    let mockAsyncRequest = new Promise((resolve, reject) => {
      setTimeout(() => resolve("Hello World!"))
    });
    return mockAsyncRequest;
  }

  /**
   * Gets all the Robos from the api
   */
  getAllRoboAssistants(): Promise<IRoboAssistant[]> {
    // TODO: use the http service to fetch from the api

    // Header and RequestOptions classes is provided for setting headers in your request
    // https://angular.io/docs/ts/latest/guide/server-communication.html#!#send-data-to-the-server

    // Set Authoriation token in the header
    const headers = new Headers();
    headers.append('Authorization', this.authToken);

    return this.http.get(this.baseUrl + '/bots', {
      headers: headers
    }).toPromise().then(res => {
      this.bots = res.json();
      this.models = []; // reset models everytime we load a new list of bots
      return this.bots;
    });

  }

  /**
   * Gets a specific robo
   * @param roboId
   */
  getRoboAssisstant(roboId: string):Promise<IRoboAssistant> {
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

/**
 *  Get the reviews of a robo using the reviewID found in the robo details
 * @param reviewId
 */
  getReviews(reviewId: string): Promise<IReview[]> {
    // Set Authoriation token in the header
    const headers = new Headers();
    headers.append('Authorization', this.authToken);

    return this.http.get(this.baseUrl + '/reviews/' + reviewId, {
      headers: headers
    }).toPromise().then(res => {
      return res.json().content;
    });
  }

/**
 * Get all robos whose name contains the searchText
 * @param searchText
 */
  searchByName(searchText: string) {
    return new Promise((resolve, reject) => {
      if (this.bots) {
        const filteredResult = this.bots.filter(bot => {
          return (bot.name.toLowerCase().indexOf(searchText.toLowerCase()) >= 0);
        });
        resolve(filteredResult);
      } else {
        this.getAllRoboAssistants().then(() => {
          const filteredResult = this.bots.filter(bot => {
            return (bot.name.toLowerCase().indexOf(searchText.toLowerCase()) >= 0);
          });
          resolve(filteredResult);
        });
      }
    });
  }

/**
 * Get the list of unique model ids from the current list of bots.
 */
  getAllModels() {
    let modelMap = {}
    this.bots.forEach(bot => {
      if (!modelMap[bot.model]) {
        modelMap[bot.model] = true;
      }
    });
    this.models = Object.keys(modelMap);
    return this.models;
  }

}
