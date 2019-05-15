import React from "react"
import { Platform, StyleSheet, StatusBar, View, TouchableOpacity, Text } from "react-native"
import { Icon } from 'expo'

// Constants
import Layout from "../../constants/Layout"
import Colors from "../../constants/Colors"

/**
 * Back Icon Header
 */
const WithBackIconHeader = props => {
  const prefix = Platform.OS === "ios" ? "ios" : "md",
    { iconName, text, color, navigation, noShadow, bgColor } = props

  const shadowStyles = !noShadow ? {
    shadowColor: Colors.shadow,
    shadowOffset: { height: 5, width: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5
  } : null

  const backgroundColor = bgColor ? bgColor : Colors.redible.main

  return (
    <View style={{ ...styles.container, ...shadowStyles, backgroundColor }}>
      <TouchableOpacity style={styles.icon} onPress={() => navigation.goBack(null)}>
        <Icon.Ionicons
          name={`${prefix}-${iconName}`}
          color={color}
          size={28}
        />
      </TouchableOpacity>
      <Text style={{ ...styles.title, color }}>{text}</Text>
      <View style={{ flex: 1 }}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 15 + StatusBar.currentHeight,
    paddingLeft: 15,
    paddingRight: 15,
    height: Layout.androidHeaderHeight + StatusBar.currentHeight,
  },
  icon: {
    textAlign: "left",
    flex: 1,
  },
  title: {
    flex: 2,
    fontSize: Layout.fontSize.largeText,
    textAlign: "center",
    fontWeight: "bold",
  }
})

export default WithBackIconHeader