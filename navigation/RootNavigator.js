import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createSharedElementStackNavigator } from 'react-navigation-shared-element'

import VehiclesScreen from '../screens/VehiclesScreen'
import MissionsScreen from '../screens/MissionsScreen'
import DetailScreen from '../screens/DetailScreen'

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

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode='none' initialRouteName='Home'>
        <Stack.Screen name='VehiclesScreen' component={VehiclesScreen} />
        <Stack.Screen name='MissionsScreen' component={MissionsScreen} options={() => options} />
        <Stack.Screen name='DetailScreen' component={DetailScreen} options={() => options} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
