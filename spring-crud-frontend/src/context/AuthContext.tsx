import { createContext, ReactElement, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface AuthContextValue {
  token: string;
  setToken: any;
}

const AuthContext = createContext<AuthContextValue>({
  token: "",
  setToken: () => null,
});

interface AuthProviderProps {
  children: ReactElement;
}

const AuthProvider = (props: AuthProviderProps) => {
  const [token, setToken] = useLocalStorage("token", "");

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

const useAuth = () => {
  const { token, setToken } = useContext(AuthContext);

  return { token, setToken };
};

export default useAuth;
