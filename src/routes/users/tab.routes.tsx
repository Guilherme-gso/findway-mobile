import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import ChatList from '../../screens/ChatList';
import Dashboard from '../../screens/Dashboard';
import Profile from '../../screens/Profile';
import Search from '../../screens/Search';
import { themes } from '../../themes';

const Tab = createBottomTabNavigator();

const TabRoutes: React.FC = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          borderTopWidth: 0.1,
          height: 60,
          backgroundColor: themes.colors.background,
        },
        tabStyle: {
          alignItems: 'center',
          justifyContent: 'center',
        },
        iconStyle: {
          flex: 1,
          width: 18,
          height: 18,
        },
        labelStyle: {
          fontFamily: themes.fonts.light,
          fontSize: 14,
        },
        activeTintColor: themes.colors.primary,
        inactiveTintColor: themes.colors.secondary,
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Feather
              name="home"
              size={size}
              color={focused ? themes.colors.primary : themes.colors.light}
            />
          ),
          title: 'Início',
        }}
        name="Home"
        component={Dashboard}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Feather
              name="search"
              size={size}
              color={focused ? themes.colors.primary : themes.colors.light}
            />
          ),
          title: 'Busca',
        }}
        name="Search"
        component={Search}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Feather
              name="user"
              size={size}
              color={focused ? themes.colors.primary : themes.colors.light}
            />
          ),
          title: 'Perfil',
        }}
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
};

export default TabRoutes;
