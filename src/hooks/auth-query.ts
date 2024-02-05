import {
  LoginPayload,
  RegisterAndBuyNubPayload,
  login,
  logout,
  registerAndBuyNub,
} from "@/api/auth";
import { useMutation } from "@tanstack/react-query";

export const useRegisterAndBuyNub = () => {
  return useMutation({
    mutationFn: (payload: RegisterAndBuyNubPayload) =>
      registerAndBuyNub(payload),
    mutationKey: ["register-and-buy-nub"],
    onSuccess: ({ data }) => {
      // might need better alternative
      window.location.assign(data.transaction.data.payment_url);
    },
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
    mutationKey: ["login"],
    onSuccess: ({ data }) => {
      console.log(data);
      // do something, redirect and save access token
    },
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: () => logout(),
    mutationKey: ["logout"],
    onSuccess: () => {
      // do something, logout
    },
  });
};
