import React from "react"
import { Platform } from "react-native"
import { createStackNavigator, createBottomTabNavigator } from "react-navigation"

// Screens
import HomeScreen from "../screens/HomeScreen"
import DetailsScreen from "../screens/DetailsScreen"
import ShoppingCartScreen from "../screens/ShoppingCartScreen"
import OrderSummaryScreen from "../screens/OrderSummaryScreen"
import OrderConfirmationScreen from "../screens/OrderConfirmationScreen"
import OrderPickupScreen from "../screens/OrderPickupScreen"

import MapScreen from "../screens/Map"

import RankingScreen from "../screens/RankingScreen"

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
  Summary: OrderSummaryScreen,
  Confirmation: OrderConfirmationScreen,
  Pickup: OrderPickupScreen
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
  Details: DetailsScreen,
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

const RankingStack = createStackNavigator({
  Ranking: RankingScreen,
})

RankingStack.navigationOptions = {
  tabBarLabel: "Ranking",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={`${prefix}-trending-up`}
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
  RankingStack,
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
