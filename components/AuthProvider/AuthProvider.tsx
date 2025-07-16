"use client";

// import { error } from "console";
import { checkSession, getMe } from "../../lib/api/clientApi";
import { useAuth } from "../../lib/store/authStore";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const setUser = useAuth((state) => state.setUser);
  const clearIsAuthenticated = useAuth((state) => state.clearIsAuthenticated);

  useEffect(() => {
    const fetchUser = async () => {
      // Перевіряємо сесію
      try {
        await checkSession();
        const user = await getMe();
        if (user) setUser(user);
      } catch (error) {
        clearIsAuthenticated();
        console.log(error);
      }

      // Якщо сесія валідна — отримуємо користувача

      // Якщо сесія невалідна — чистимо стан
    };
    fetchUser();
  }, [setUser, clearIsAuthenticated]);

  return children;
};

export default AuthProvider;
