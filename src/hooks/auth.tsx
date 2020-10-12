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

interface ICredentials {
  email: string;
  password: string;
}

interface IUser {
  id: string;
  name: string;
  email: string;
}

interface IAuthContextData {
  signIn(credentials: ICredentials): Promise<void>;
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
    const response = await api.post<IAuthState>('/users/sessions', userData);
    const { token, user } = response.data;

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
      user: data.user,
      token: data.token,
      loading,
    }),
    [data, signIn, signOut, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): IAuthContextData => useContext(AuthContext);

export default AuthProvider;
