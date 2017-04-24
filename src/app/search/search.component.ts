import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RoboAssistantService } from '../roboAssistant.service';
import { IRoboAssistant } from '../types';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

  searchResults: Promise<IRoboAssistant[]>; // You can update the search results array as data is fetched.

  searchText: string = ''; // You can two-way bind this to the textbox input for searches
  isSearching = false;
  roboModels = {};

  constructor(
    private roboAssistantService: RoboAssistantService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.roboModels = this.roboAssistantService.models;
    this.route.queryParams.subscribe(params => {
      if (params.searchText) {
        this.searchText = params.searchText;
        this.sendSearch();
      }
    });

  }


  sendSearch() {
    // bind this to the click event in your "search" button. Fetch
    const searchText = this.searchText.trim();
    if (searchText.length > 0) {
      this.isSearching = true;
      this.searchResults = this.roboAssistantService.searchByName(this.searchText);
      this.searchResults.then(() => {
        this.isSearching = false;
      });
      this.router.navigate(['./search'], {
        queryParams: {
          searchText: this.searchText
        }
      });
    }
  }

  showDetail(roboId: string) {
    this.router.navigate(['/detail', roboId]);
  }

}
