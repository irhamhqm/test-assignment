import { createContext } from "react";

const auth = {
  accessToken: "",
  setAccessToken: (token: string) => {},
};

const AuthContext = createContext(auth);

export default AuthContext;
