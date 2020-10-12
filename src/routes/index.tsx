import React from 'react';
import { Text } from 'react-native';
import AuthRoutes from './auth.routes';
import { useAuth } from '../hooks/auth';
import AppRoutes from './app.routes';

const Routes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    <Text>Carregando...</Text>;
  }

  return user ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
