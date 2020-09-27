import { PlaceLocation } from './placeLocation';
import { TastingRating } from './tastingRating';

export class Coffee {
  public _id: string; //primary key created by our db
  public type: string;
  public rating: number;
  public notes: string;
  public tastingRating: TastingRating;

  public constructor(
    public name: string = '',
    public place: string = '',
    public location: PlaceLocation = null
  ) {
    this.location = new PlaceLocation();
  }
}
