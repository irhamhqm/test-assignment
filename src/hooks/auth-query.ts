import { RegisterAndBuyNubPayload, registerAndBuyNub } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { redirect } from "next/navigation";

export const useRegisterAndBuyNub = () => {
  return useMutation({
    mutationFn: (payload: RegisterAndBuyNubPayload) =>
      registerAndBuyNub(payload),
    mutationKey: ["register-and-buy-nub"],
    onSuccess: ({ data }) => {
      redirect(data.transaction.data.payment_url);
    },
  });
};
