import {
  LoginPayload,
  RegisterAndBuyNubPayload,
  login,
  logout,
  registerAndBuyNub,
} from "@/api/auth";
import { useAuthContext } from "@/context/auth";
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
  const { setAccessToken } = useAuthContext();
  return useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
    mutationKey: ["login"],
    onSuccess: ({ data }) => {
      // do something, redirect and save access token
      setAccessToken(data.token);
    },
  });
};

export const useLogout = () => {
  const { accessToken, setAccessToken } = useAuthContext();
  return useMutation({
    mutationFn: () => logout({ token: accessToken }),
    mutationKey: ["logout"],
    onSuccess: () => {
      // do something, logout
      setAccessToken("");
    },
  });
};
