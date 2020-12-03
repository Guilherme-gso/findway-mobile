import React from 'react';
import { Text } from 'react-native';
import { useAuth } from '../hooks/auth';
import AuthRoutes from './auth/auth.routes';
import DriverRoutes from './drivers/drivers.routes';
import AppRoutes from './users/app.routes';

const Routes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    <Text>Carregando...</Text>;
  }

  if (!user) {
    return <AuthRoutes />;
  }

  return user.isDriver ? <DriverRoutes /> : <AppRoutes />;
};

export default Routes;
