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
  averageRating = 0;

  constructor(private roboAssistantService: RoboAssistantService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.robo_id) {
        this.bot = this.roboAssistantService.getRoboAssisstant(params.robo_id);
        // console.log('Robot Assistant', this.bot);
        this.bot.then(bot => {
          // console.log('Bot: ', bot);
          this.reviews = this.roboAssistantService.getReviews(bot.reviews);
          this.reviews.then(reviews => {
            // Calculate the average rating
            reviews.forEach(review => {
              this.averageRating = (this.averageRating + review.rating) / 2;
            });
          });
        });
      }
    });
    // https://angular.io/docs/ts/latest/guide/lifecycle-hooks.html
    // https://angular.io/docs/ts/latest/api/core/index/OnInit-class.html

    // TODO: Inject the RoboAssistantsService and use to fetch and display the profile of a RoboAssistant.
  }

}
