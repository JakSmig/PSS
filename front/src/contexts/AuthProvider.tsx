import React, {
  createContext,
  Dispatch,
  SetStateAction,
  PropsWithChildren,
  useState,
  useEffect,
} from 'react';

export const AuthContext = createContext<{
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
}>({
  token: null,
  setToken: token => token,
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [token, setToken] = useState(
    () => localStorage.getItem('token') ?? null,
  );

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
