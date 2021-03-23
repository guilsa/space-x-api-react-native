import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createSharedElementStackNavigator } from 'react-navigation-shared-element'

import VehiclesScreen from '../screens/VehiclesScreen'
import MissionsScreen from '../screens/MissionsScreen'
import DetailScreen from '../screens/DetailScreen'
import MissionsDetailScreen from '../screens/MissionsDetailScreen'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const Tab = createBottomTabNavigator()
const Stack = createSharedElementStackNavigator()

const options = {
  headerBackTitleVisible: false,
  cardStyleInterpolator: ({ current: { progress } }) => {
    return {
      cardStyle: {
        opacity: progress,
      },
    }
  },
}

function TabNavigator() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: {
          fontSize: 16,
          marginBottom: 22,
        },
        activeTintColor: 'white',
        inactiveTintColor: '#d9d9d9',
        style: {
          borderTopColor: '#0f0f0f',
          backgroundColor: '#0f0f0f',
        },
      }}
    >
      <Tab.Screen
        name="Vehicles"
        component={VehiclesScreen}
        options={() => options}
      />
      <Tab.Screen
        name="Missions"
        component={MissionsScreen}
        options={() => options}
      />
    </Tab.Navigator>
  )
}

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="TabNavigator">
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
        <Stack.Screen
          name="DetailScreen"
          component={DetailScreen}
          options={() => options}
        />
        <Stack.Screen
          name="MissionsDetailScreen"
          component={MissionsDetailScreen}
          options={() => options}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
