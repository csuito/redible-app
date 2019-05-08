import React from "react"
import { Platform, StyleSheet, Text, TouchableOpacity } from "react-native"
import { Icon } from "expo"

// Constants
import Colors from "../constants/Colors"

/**
 * Generic button component
 */
const Button = props => {
  const prefix = Platform.OS === "ios" ? "ios" : "md",
    { text, iconName, _onPress, containerStyles, textStyles } = props

  return (
    <TouchableOpacity style={{ ...styles.default, ...containerStyles }} onPress={_onPress}>
      {
        iconName ?
          <Icon.Ionicons
            name={`${prefix}-${iconName}`}
            size={textStyles.fontSize}
            color={textStyles.color} /> :
          null
      }
      <Text style={{ ...textStyles }}>{` ${text}`}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  default: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    shadowColor: Colors.shadow,
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 2,
    borderRadius: 25,
  }
})

export default Button