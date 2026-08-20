import { createContext, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { AUTH_STORAGE_KEY } from "../utils/constants";
import { setAuthToken } from "../services/api";
import { loginUser, registerUser } from "../services/auth.service";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null, token: null });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const storedAuth = JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY) || "null");

    if (storedAuth?.token) {
      setAuth(storedAuth);
      setAuthToken(storedAuth.token);
    }

    setReady(true);
  }, []);

  const persistAuth = (payload) => {
    setAuth(payload);
    setAuthToken(payload?.token || null);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(payload));
  };

  const handleAuthSuccess = (data, message) => {
    const nextAuth = {
      user: data?.user || null,
      token: data?.token || null,
    };

    persistAuth(nextAuth);
    toast.success(message || "Welcome back");
    return nextAuth;
  };

  const login = async (payload) => {
    const response = await loginUser(payload);
    return handleAuthSuccess(response.data, response.data?.message);
  };

  const register = async (payload) => {
    const response = await registerUser(payload);
    return handleAuthSuccess(response.data, response.data?.message || "Account created");
  };

  const logout = () => {
    setAuth({ user: null, token: null });
    setAuthToken(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    toast.success("Logged out successfully");
  };

  const value = useMemo(
    () => ({
      user: auth.user,
      token: auth.token,
      isAuthenticated: Boolean(auth.token),
      ready,
      login,
      register,
      logout,
      setAuth: persistAuth,
    }),
    [auth.user, auth.token, ready]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used inside AuthProvider");
  }

  return context;
};

export default AuthContext;