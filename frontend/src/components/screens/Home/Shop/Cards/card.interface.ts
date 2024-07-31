export interface ISneakers {
  id: number;
  title: string;
  image: string;
  content: string;
  price: number;
  cat: number;
}

export interface ISneakerItem {
  sneaker: ISneakers;
}
