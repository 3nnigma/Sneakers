import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { ICart } from "../components/Cart/cart.interface";
import { IRegister } from "../components/screens/user/auth/auth.interface";
import { CartService } from "../services/Cart.service";

export const useGetCarts = (user: IRegister | undefined) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.prefetchQuery(["cart"], () => CartService.getAll(user?.id));
  }, [user, queryClient]);

  // Проверка, что user и id существуют перед вызовом CartService.getAll
  if (user?.id !== undefined) {
    // Используйте prefetchQuery, чтобы выполнить запрос к бэкенду заранее
    queryClient.prefetchQuery(["cart"], () => CartService.getAll(user.id));

    return useQuery(["cart"], () => CartService.getAll(user.id), {
      select: ({ data }) => data,
    });
  }

  // Можно вернуть заглушку или обработать по своему усмотрению
  return useQuery(["cart"], () => Promise.resolve([] as ICart[]), {
    select: ({ data }) => data,
  });
};

export const useClearCart = (userId: number) => {
  const queryClient = useQueryClient();
  return useMutation(() => CartService.clearCart(userId), {
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
  });
};
