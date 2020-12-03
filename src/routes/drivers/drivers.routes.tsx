import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import RegisterJob from '../../screens/Driver/RegisterJob';
import UpdateJob from '../../screens/Driver/UpdateJob';
import { themes } from '../../themes';
import TabRoutes from './tab.routes';

const Stack = createStackNavigator();

const DriverRoutes: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={TabRoutes}
      />

      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: themes.colors.background,
            borderBottomWidth: 0,
          },
          headerTitle: '',
          headerTintColor: themes.colors.light,
        }}
        name="Job"
        component={UpdateJob}
      />

      <Stack.Screen
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: themes.colors.background,
            borderBottomWidth: 0,
          },
          headerTitle: '',
          headerTintColor: themes.colors.light,
        }}
        name="RegisterJob"
        component={RegisterJob}
      />
    </Stack.Navigator>
  );
};

export default DriverRoutes;
