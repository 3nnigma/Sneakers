import { useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  ILogin,
  IRegister,
} from "../components/screens/user/auth/auth.interface";
import UserService from "../services/User.service";
import { useNavigate } from "react-router-dom";

export const useLogin = (reset: () => void) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation((data: ILogin) => UserService.login(data), {
    onSuccess: (response) => {
      reset();
      const token = response.data.jwt;

      if (token) {
        Cookies.set("jwt", token, {
          expires: 1,
          secure: true,
          sameSite: "strict",
        });
        queryClient.invalidateQueries(["user"]);
        setTimeout(() => {
          navigate("/");
        }, 500);
      }
    },
  });
};
export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation((data: IRegister) => UserService.logout(data), {
    onSuccess: () => {
      Cookies.remove("jwt");
      queryClient.invalidateQueries(["user"]);
      setTimeout(() => {
        navigate("/");
      }, 500);
    },
  });
};

export const useRegister = (reset: () => void) => {
  const navigate = useNavigate();

  return useMutation((data: IRegister) => UserService.register(data), {
    onSuccess: () => {
      reset();

      setTimeout(() => {
        navigate("/login");
      }, 700);
    },
  });
};

export const useGetUser = () => {
  return useQuery(["user"], () => UserService.getUser(), {
    select: ({ data }) => data,
  });
};

export const useBalance = () => {
  const queryClient = useQueryClient();
  return useMutation((newBalance: number) => UserService.balance(newBalance), {
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });
};
