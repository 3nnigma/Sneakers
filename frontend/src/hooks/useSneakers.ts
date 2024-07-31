import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ICart } from "../components/Cart/cart.interface";
import { SneakersService } from "../services/Sneakers.service";

// export const useSneakers = () => {
//   return useQuery(["sneakers"], () => SneakersService.getAll(), {
//     select: ({ data }) => data,
//   });
// };

export const useSneakers = (sortState: 0 | 1 | 2) => {
  const ordering = sortState === 1 ? 'price' : sortState === 0 ? '-price' : '';
  return useQuery(["sneakers", ordering], () => SneakersService.getAll(ordering), {
    select: ({ data }) => data,
    keepPreviousData: true,
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
    ({ id, count }: { id: number; count: string; }) =>
      SneakersService.changeQuantity(id, count),

    {
      onSuccess: () => {
        queryClient.invalidateQueries(["cart"]);
      },
    }
  );
};
