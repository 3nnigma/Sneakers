export interface ICart {
  id?: number;
  user: number;
  sneakers_id: number;
  quantity: number;
}

export interface ICartItem {
  cart: ICart | null;
}
