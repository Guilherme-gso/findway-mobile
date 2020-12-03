import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import TabRoutes from './tab.routes';
import Job from '../../screens/Job';
import Chat from '../../screens/Chat';
import UpdateProfile from '../../screens/Profile/UpdateProfile';

import { themes } from '../../themes';
import Category from '../../screens/Category';

const Stack = createStackNavigator();

const AppRoutes: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={TabRoutes}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: themes.colors.background,
            borderBottomWidth: 0,
          },

          headerTitle: '',
          headerTintColor: themes.colors.light,
        }}
        name="Category"
        component={Category}
      />

      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: themes.colors.background,
            borderBottomWidth: 0,
          },
          headerTintColor: themes.colors.light,
          headerTitle: '',
        }}
        name="Job"
        component={Job}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="Chat"
        component={Chat}
      />

      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: themes.colors.background,
            borderBottomWidth: 0,
          },

          headerTitle: '',
          headerTintColor: themes.colors.light,
        }}
        name="UpdateProfile"
        component={UpdateProfile}
      />
    </Stack.Navigator>
  );
};

export default AppRoutes;
