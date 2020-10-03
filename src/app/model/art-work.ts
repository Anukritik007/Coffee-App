import { MEDIA_TYPE } from './enums';
import { PlaceLocation } from './placeLocation';

export class ArtWork {
  public _id: string; //primary key created by our db
  public description: string;
  public mediaUrl:string;
  public mediaType:MEDIA_TYPE;
  public size?:string;
  public completionDate: string;
  public rating:number;
  public comments:string;
  public location: PlaceLocation = null;

  public constructor(
    public name: string = '',
    public creator:string='',
    public price: number = 200,
  ) {
    this.location = new PlaceLocation();
  }
}
