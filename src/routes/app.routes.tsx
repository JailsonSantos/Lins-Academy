import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs'

import { Home } from '@screens/Home';
import { History } from '@screens/History';
import { Profile } from '@screens/Profile';
import { Exercise } from '@screens/Exercise';

type AppRoutes = {
  home: undefined;
  exercise: undefined;
  profile: undefined;
  history: undefined;
}

export type AppNavigatorRouesProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
  return (
    <Navigator>
      <Screen name="home" component={Home} />
      <Screen name="profile" component={Profile} />
      <Screen name="history" component={History} />
      <Screen name="exercise" component={Exercise} />
    </Navigator>
  )
}