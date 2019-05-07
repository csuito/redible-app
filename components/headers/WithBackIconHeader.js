import React, { Component } from "react"
import { Platform, StyleSheet, StatusBar, View, TouchableOpacity, Text } from "react-native"
import { Icon } from 'expo'

// Constants
import Layout from "../../constants/Layout"
import Colors from "../../constants/Colors"

/**
 * Back Icon Header
 */
export default class WithBackIconHeader extends Component {
  render() {
    const prefix = Platform.OS === "ios" ? "ios" : "md",
      { iconName, text, color } = this.props

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.icon}>
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
    shadowColor: "rgba(0, 0, 0, 0.4)",
    shadowOffset: { height: 5, width: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
  },
  icon: {
    flex: 1,
    textAlign: "left"
  },
  title: {
    flex: 1,
    fontSize: Layout.fontSize.title,
    fontWeight: "bold",
    textAlign: "center"
  }
})