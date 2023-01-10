import { api } from "@services/api";
import { UserDTO } from "@dtos/UserDTO";
import { createContext, ReactNode, useEffect, useState } from "react";
import { storageUserSave, storageUserGet, storageUserRemove } from "@storage/storageUser";
import { storageAuthTokenSave, storageAuthTokenGet, storageAuthTokenRemove } from '@storage/storageAuthToken';

export type AuthContextDataProps = {
  user: UserDTO;
  refreshedToken: string;
  signOut: () => Promise<void>;
  isLoadingUserStorageData: boolean;
  updateUserProfile: (userUpdated: UserDTO) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {

  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [refreshedToken, setRefreshedToken] = useState('');
  const [isLoadingUserStorageData, setLoadingUserStorageData] = useState(true);

  async function userAndTokenUpdate(userData: UserDTO, token: string) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(userData);
  }

  async function storageUserAndTokenSave(userData: UserDTO, token: string) {
    try {
      setLoadingUserStorageData(true);

      await storageUserSave(userData);
      await storageAuthTokenSave(token);
    } catch (error) {
      throw error;

    } finally {
      setLoadingUserStorageData(false);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', { email, password });

      if (data.user && data.token) {
        await storageUserAndTokenSave(data.user, data.token);

        userAndTokenUpdate(data.user, data.token);
      }

    } catch (error) {
      throw error
    }
  }

  async function signOut() {
    try {
      setLoadingUserStorageData(true);

      setUser({} as UserDTO);
      await storageUserRemove();
      await storageAuthTokenRemove();

    } catch (error) {
      throw error;

    } finally {
      setLoadingUserStorageData(false);
    }
  }

  async function updateUserProfile(userUpdated: UserDTO) {
    try {
      setUser(userUpdated);

      await storageUserSave(userUpdated);

    } catch (error) {
      throw error;
    }
  }

  async function loadUserData() {
    try {
      setLoadingUserStorageData(true);

      const userLogged = await storageUserGet();
      const token = await storageAuthTokenGet();

      if (token && userLogged) {
        userAndTokenUpdate(userLogged, token);
      }

    } catch (error) {
      throw error;

    } finally {
      setLoadingUserStorageData(false);
    }
  }

  function refreshTokenUpdated(newToken: string) {
    setRefreshedToken(newToken);
  }

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager({ signOut, refreshTokenUpdated });

    return () => {
      subscribe()
    }
  }, [signOut]);


  return (
    <AuthContext.Provider value={
      {
        user,
        signIn,
        signOut,
        refreshedToken,
        updateUserProfile,
        isLoadingUserStorageData
      }
    }>
      {children}
    </AuthContext.Provider>
  )
}