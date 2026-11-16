/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { IAuthResponse } from '../types/IAuth';

export type User = IAuthResponse['data'];

interface IUserContextProps {
  user: User | null;
  saveUser: (user: User) => void;
  logout: () => void;
}

const UserContext = createContext<IUserContextProps | undefined>(undefined);

const getStoredUser = (): User | null => {
  const stored = localStorage.getItem('token');
  if (!stored) return null;

  try {
    return JSON.parse(stored)?.data ?? null;
  } catch {
    return null;
  }
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(getStoredUser);

  const saveUser = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = useMemo(() => ({ user, saveUser, logout }), [user]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): IUserContextProps => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUserContext deve ser usado dentro de um UserProvider');
  }

  return context;
};
