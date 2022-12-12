import create from 'zustand';

import { User } from '../lib/types';

export type AuthStore = {
  token: string | null;
  user: User | null;
  setToken: (t: string) => void;
  setUser: (user: User | null) => void;
};

export const useAuthStore = create<AuthStore>()(set => {
  const token = localStorage.getItem('token');
  return {
    token,
    user: null,
    setUser: user => set({ user }),
    setToken: token => {
      if (token) {
        localStorage.setItem('token', token);
      } else {
        localStorage.removeItem('token');
      }
      return set({ token });
    },
  };
});
