import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Platform } from 'react-native';
import Dashboard from '../screens/Dashboard';
import Profile from '../screens/Profile';
import Search from '../screens/Search';
import { themes } from '../themes';

const Tab = createBottomTabNavigator();

const TabRoutes: React.FC = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          borderTopWidth: 0,
          height: Platform.OS === 'android' ? 60 : 85,
          backgroundColor: themes.colors.background,
        },
        labelStyle: {
          fontFamily: themes.fonts.medium,
        },
        activeTintColor: themes.colors.primary,
        inactiveTintColor: themes.colors.secondary,
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="home" size={25} color={themes.colors.light} />
          ),
          title: 'Início',
        }}
        name="Home"
        component={Dashboard}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <MaterialIcons
              name="search"
              size={25}
              color={themes.colors.light}
            />
          ),
          title: 'Busca',
        }}
        name="Search"
        component={Search}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <MaterialIcons
              name="account-circle"
              size={25}
              color={themes.colors.light}
            />
          ),
          title: 'Busca',
        }}
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
};

export default TabRoutes;
