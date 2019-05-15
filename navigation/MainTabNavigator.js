import React from "react"
import { Platform } from "react-native"
import { createStackNavigator, createBottomTabNavigator } from "react-navigation"

// Screens
import HomeScreen from "../screens/HomeScreen"
import DetailsScreen from "../screens/DetailsScreen"
import ShoppingCartScreen from "../screens/ShoppingCartScreen"
import OrderSummaryScreen from "../screens/OrderSummaryScreen"

import MapScreen from "../screens/Map"

import FavoritesScreen from "../screens/FavoritesScreen"

import ProfileScreen from "../screens/Profile"

// Components
import TabBarIcon from "../components/TabBarIcon"

// Constants
import Colors from "../constants/Colors"

const prefix = Platform.OS === "ios" ? "ios" : "md"

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Details: DetailsScreen,
  Cart: ShoppingCartScreen,
  Summary: OrderSummaryScreen
})

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={`${prefix}-home`}
    />
  ),
}

const MapStack = createStackNavigator({
  Map: MapScreen,
})

MapStack.navigationOptions = {
  tabBarLabel: "Near me",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={`${prefix}-map`}
    />
  ),
}

const FavoritesStack = createStackNavigator({
  Favorites: FavoritesScreen,
})

FavoritesStack.navigationOptions = {
  tabBarLabel: "Favorites",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={`${prefix}-heart`}
    />
  ),
}

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen
})

ProfileStack.navigationOptions = {
  tabBarLabel: "Profile",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={`${prefix}-person`}
    />
  )
}

export default createBottomTabNavigator({
  HomeStack,
  MapStack,
  FavoritesStack,
  ProfileStack
}, {
    tabBarOptions: {
      showLabel: false,
      activeTintColor: Colors.redible.main,
      inactiveTintColor: Colors.redible.lavenderGray,
      style: {
        backgroundColor: Colors.redible.babyPowder,
        borderTopWidth: 0,
        shadowColor: Colors.shadow,
        shadowOffset: { height: 5, width: 0 },
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 5,
      }
    }
  })
