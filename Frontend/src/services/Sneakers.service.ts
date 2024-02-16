import axios from "axios";
import { ISneakers } from "../components/screens/Home/Shop/Cards/card.interface";
import { ICart } from "../components/Cart/cart.interface";

export const SneakersService = {
  async getAll() {
    return axios.get<ISneakers[]>("http://127.0.0.1:8000/sneakers/", {
      withCredentials: true,
    });
  },
  async addCart(data: ICart) {
    return axios.post<ICart[]>("http://127.0.0.1:8000/api/cart/", data, {
      withCredentials: true,
    });
  },
  async delCart(id: number) {
    return axios.delete<ICart[]>(`http://127.0.0.1:8000/api/cart/${id}/`);
  },
  async changeQuantity(id: number, count: string) {
    if (id !== undefined) {
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/cart/${id}/`,
        {
          quantity: count,
        }
      );

      return response.data; // Return the data from the response
    }

    return {};
  },
};
