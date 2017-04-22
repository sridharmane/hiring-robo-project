import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { RoboAssistantService } from '../roboAssistant.service';
import { IRoboAssistant, IReview } from '../types';

@Component({
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})

export class DetailComponent implements OnInit {
  bot: Promise<IRoboAssistant>;
  reviews: Promise<IReview[]>;

  constructor(private roboAssistantService: RoboAssistantService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.roboId) {
        this.bot = this.roboAssistantService.getRoboAssisstant(params.roboId);
        console.log('Robot Assistant', this.bot);
        this.bot.then(bot => {
          console.log('Bot: ', bot);
          this.reviews = this.roboAssistantService.getReviews(bot.reviews);
        });
      }
    });
    // https://angular.io/docs/ts/latest/guide/lifecycle-hooks.html
    // https://angular.io/docs/ts/latest/api/core/index/OnInit-class.html

    //TODO: Inject the RoboAssistantsService and use to fetch and display the profile of a RoboAssistant.
  }

}
