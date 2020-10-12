import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';

import Login from '../screens/Login';
import Register from '../screens/Register';

const AuthRoutes: React.FC = () => {
  const Stack = createStackNavigator();

  const screenOptions: StackNavigationOptions = {
    headerShown: false,
  };

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen component={Login} name="Login" />
      <Stack.Screen component={Register} name="Register" />
    </Stack.Navigator>
  );
};

export default AuthRoutes;
