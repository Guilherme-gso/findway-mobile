import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';

import Login from '../../screens/Login';
import Register from '../../screens/Register';
import Welcome from '../../screens/Driver/Welcome';
import Steps from '../../screens/Driver/Steps';
import { themes } from '../../themes';

const AuthRoutes: React.FC = () => {
  const Stack = createStackNavigator();

  const screenOptions: StackNavigationOptions = {
    headerShown: false,
  };

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen component={Login} name="Login" />
      <Stack.Screen component={Register} name="Register" />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: '',
          headerStyle: {
            backgroundColor: themes.colors.background,
            borderBottomWidth: 0,
          },
          headerTintColor: themes.colors.light,
        }}
        component={Welcome}
        name="WelcomeDriver"
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: '',
          headerStyle: {
            backgroundColor: themes.colors.background,
            borderBottomWidth: 0,
          },
          headerTintColor: themes.colors.light,
        }}
        component={Steps}
        name="Steps"
      />
    </Stack.Navigator>
  );
};

export default AuthRoutes;
