export interface IRoboAssistant {
    robo_id: string; // | The unique identifire for the robo-assistant.
    name: string; // The human name of the robo-assistast.
    model: string; // The human name of the robo-assistast.
    price: number; // The retail price, in whole dollars.
    avatar: string; // A string with a public link to the robo-assistnts avatar (png)
    reviews: string; // id to the list of reviews
}
export interface IReview {
    rating: number; // A number representing the number of stars in the review. 1-5.
    review: string; // The review (lorem ipsum text)
}
