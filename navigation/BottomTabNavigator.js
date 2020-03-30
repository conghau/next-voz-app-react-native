import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import LinksScreen from '../screens/LinksScreen';
import ForumChildScreen from "../screens/ForumChild";
import Forums from "../screens/Forums";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Forums"
        component={Forums}
        options={{
          title: 'Forums',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused}
                                                   name="md-menu"/>,
        }}
      />

      <BottomTab.Screen
        name="News"
        options={{
          title: 'Điểm báo',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused}
                                                   name="md-basketball"/>,
        }}
      >
        {
          props => <ForumChildScreen
            {...props}
            route={{ params: { id: 33 } }}
            hasBottomNavigation={true}
          />
        }
      </BottomTab.Screen>

      <BottomTab.Screen
        name="Favor"
        component={LinksScreen}
        options={{
          title: 'Mục yêu thích',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused}
                                                   name="md-heart-empty"/>,
        }}
      />
      <BottomTab.Screen
        name="Setting"
        component={LinksScreen}
        options={{
          title: 'Cài đặt',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused}
                                                   name="ios-settings"/>,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'News':
      return 'Điểm báo';
    case 'Favor':
      return 'Mục yêu thích';
    case 'Setting':
      return 'Cài đặt';
    case 'Forums':
      return 'Forum';
  }
}
