import create from "zustand";

export type User = {
  email: string;
  id: number;
  password: string;
  sessiontoken: string;
  username: string;
};

type TokenState = {
  token: string | null;
  user: User | null;
  setToken: (t: string) => void;
  setUser: (user: User | null) => void;
};

// const token = localStorage.getItem("token");

export const useStore = create<TokenState>()((set) => ({
  token: null,
  user: null,
  setUser: (user) => set({ user }),
  setToken: (token) => {
    localStorage.setItem("token", token);
    return set({ token });
  },
}));
