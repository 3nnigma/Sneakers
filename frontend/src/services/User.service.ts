import axios from "axios";
import {
  ILogin,
  IRegister,
} from "../components/screens/user/auth/auth.interface";
import Cookies from "js-cookie";

class UserService {
  async getUser() {
    return axios.get<IRegister>("http://localhost:8000/user/", {
      withCredentials: true,
    });
  }
  async login(data: ILogin) {
    return axios.post<ILogin>("http://localhost:8000/login/", data);
  }
  async logout(data: IRegister) {
    return axios.post<IRegister>("http://localhost:8000/logout/", data);
  }
  async register(data: IRegister) {
    return axios.post<IRegister>("http://localhost:8000/register/", data);
  }
  async balance(newBalance: number) {
    try {
      const response = await axios.patch<number>(
        "http://localhost:8000/user/",
        {
          balance: newBalance,
          token: Cookies.get("jwt"),
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating balance:", error);
      throw error;
    }
  }
}

export default new UserService();
