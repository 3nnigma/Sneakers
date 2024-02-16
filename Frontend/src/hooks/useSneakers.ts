import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SneakersService } from "../services/Sneakers.service";
import { ICart } from "../components/Cart/cart.interface";

export const useSneakers = () => {
  return useQuery(["sneakers"], () => SneakersService.getAll(), {
    select: ({ data }) => data,
  });
};

export const useAddCart = () => {
  return useMutation((data: ICart) => SneakersService.addCart(data));
};
export const useDelCart = () => {
  const queryClient = useQueryClient();
  return useMutation((id: number) => SneakersService.delCart(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
  });
};

export const useQuantity = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, count }: { id: number; count: string }) =>
      SneakersService.changeQuantity(id, count), // Pass an object as the argument

    {
      onSuccess: () => {
        queryClient.invalidateQueries(["cart"]);
      },
    }
  );
};
