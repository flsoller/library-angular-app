export class Book {
  constructor(
    public title: string,
    public author: string,
    public pages: number,
    public isFav: boolean,
    public isLoaned: boolean,
    public isReading: boolean
  ) {}
}
