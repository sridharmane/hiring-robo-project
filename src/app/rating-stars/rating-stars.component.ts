import { Component, OnInit, Input } from '@angular/core';
import { IRoboAssistant } from '../types';

@Component({
    selector: 'app-rating-stars',
    templateUrl: './rating-stars.component.html',
    styleUrls: ['./rating-stars.component.css']
})
export class RatingStarsComponent {
    @Input() rating = 0;
}
