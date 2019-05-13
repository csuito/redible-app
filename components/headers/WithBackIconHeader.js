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
    { iconName, text, color, navigation } = props

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.icon} onPress={() => navigation.goBack(null)}>
        <Icon.Ionicons
          name={`${prefix}-${iconName}`}
          color={color}
          size={28}
        />
      </TouchableOpacity>
      <Text style={{ ...styles.title, color }}>{text}</Text>
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
    backgroundColor: Colors.redible.main,
    shadowColor: Colors.shadow,
    shadowOffset: { height: 5, width: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
  },
  icon: {
    textAlign: "left",
  },
  title: {
    flex: 1,
    fontSize: Layout.fontSize.largeText,
    textAlign: "center",
  }
})

export default WithBackIconHeader