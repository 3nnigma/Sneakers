import axios from "axios";
import { ICart } from "../components/Cart/cart.interface";

export const CartService = {
  async getAll(user: number | undefined) {
    if (user !== undefined) {
      return axios.get<ICart[]>(
        "http://127.0.0.1:8000/api/cart/?user=" + user,
        {
          withCredentials: true,
        }
      );
    }
    return {};
  },
  async clearCart(userId: number) {
    return axios.delete('http://127.0.0.1:8000/api/cart/clear/', {
      data: { user_id: userId },
      withCredentials: true,
    });
  },

  async delCart(id: number | undefined) {
    return axios.delete<ICart>(`http://127.0.0.1:8000/api/cart/${id}/`, {
      withCredentials: true,
    });
  }
};
