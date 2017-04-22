import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoboAssistantService } from "../roboAssistant.service";
import { IRoboAssistant } from '../types';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent {

  searchResults: IRoboAssistant[]; // You can update the search results array as data is fetched.

  searchText: string = ''; // You can two-way bind this to the textbox input for searches

  constructor(private roboAssistantService: RoboAssistantService, private router: Router) { }


  sendSearch() {
    // bind this to the click event in your "search" button. Fetch
    const searchText = this.searchText.trim();
    if (searchText.length > 0) {
      this.searchResults = this.roboAssistantService.searchRoboAssistantsByName(this.searchText);
    }
  }

  showDetail(roboId: string) {
    this.router.navigate(['/detail', roboId]);
  }

}
