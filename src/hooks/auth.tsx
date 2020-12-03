import React, {
  createContext,
  useContext,
  useCallback,
  useMemo,
  useState,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { api } from '../services/api';
import { storageToken, storageUser } from '../constants/storage';

export interface ICredentials {
  email: string;
  password: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
  isDriver: boolean;
  driver_id?: string;
}

export interface ISetUser {
  user: IUser;
  token: string;
}

interface IAuthContextData {
  signIn(credentials: ICredentials): Promise<void>;
  setUser(data: ISetUser): void;
  signOut(): void;
  user: IUser;
  token: string;
  loading: boolean;
}

interface IAuthState {
  user: IUser;
  token: string;
}

const AuthContext = createContext({} as IAuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IAuthState>({} as IAuthState);

  useEffect(() => {
    async function loadData(): Promise<void> {
      const user = await AsyncStorage.getItem(storageUser);
      const token = await AsyncStorage.getItem(storageToken);

      if (user && token) {
        setData({ token, user: JSON.parse(user) });
      }

      setLoading(false);
    }

    loadData();
  }, []);

  const signIn = useCallback(async (userData: ICredentials) => {
    setLoading(true);
    const response = await api.post('/users/sessions', userData);
    const { data: result } = response;

    AsyncStorage.multiSet([
      [
        storageUser,
        JSON.stringify({ ...result.user, driver_id: result.driver_id }),
      ],
      [storageToken, result.token],
    ]);

    setData({
      user: { ...result.user, driver_id: result.driver_id },
      token: result.token,
    });

    setLoading(false);
  }, []);

  const setUser = useCallback(({ user, token }: ISetUser) => {
    AsyncStorage.multiSet([
      [storageUser, JSON.stringify(user)],
      [storageToken, token],
    ]);

    setData({ user, token });
  }, []);

  const signOut = useCallback(() => {
    AsyncStorage.multiRemove([storageToken, storageUser]);
    setData({} as IAuthState);
  }, []);

  const value = useMemo(
    () => ({
      signIn,
      signOut,
      setUser,
      user: data.user,
      token: data.token,
      loading,
    }),
    [data, signIn, signOut, setUser, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): IAuthContextData => useContext(AuthContext);

export default AuthProvider;
