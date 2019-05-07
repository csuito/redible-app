import React, { Component } from "react"
import { Platform, StyleSheet, Text, View, TouchableOpacity } from "react-native"
import { Icon } from "expo"

// Constants
import Colors from "../constants/Colors"
import Layout from "../constants/Layout"

/**
 * Generic button component
 */
export default class Button extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const { row, margins, text, name, fontSize, fontColor, backgroundColor, _onPress } = this.props,
      flexDirection = row ? "row" : "column",
      prefix = Platform.OS === "ios" ? "ios" : "md"

    return (
      <TouchableOpacity style={{ ...styles.container, flexDirection, margins, backgroundColor, fontWeight: "bold" }} onPress={_onPress}>
        {
          name && fontSize && fontColor ?
            <Icon.Ionicons
              name={`${prefix}-${name}`}
              size={fontSize}
              color={fontColor} /> :
            null
        }
        <Text style={{ fontSize, color: fontColor }}>{` ${text}`}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    shadowColor: "rgba(0, 0, 0, 0.4)",
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 2,
    borderRadius: 25,
    marginBottom: 15
  },
})