
export class ArtWork {
  public _id: string; //primary key created by our db
  public description: string;
  public medium: string;
  public size?:string;
  public completionDate: string;

  public constructor(
    public name: string = '',
    public price: number,
  ) {
  }
}
