import React from "react"
import { Platform, StyleSheet, Text, TouchableOpacity, Image } from "react-native"
import { Icon } from "expo"

// Constants
import Colors from "../constants/Colors"

/**
 * Generic button component
 * @param {Object}
 */
const Button = props => {
  const prefix = Platform.OS === "ios" ? "ios" : "md",
    { text, iconName, image, _onPress, containerStyles, textStyles, noShadow } = props,
    shadowStyles = !noShadow ? {
      shadowColor: Colors.shadow,
      shadowOffset: { height: 2, width: 0 },
      shadowOpacity: 1,
      shadowRadius: 3,
      elevation: 2,
    } : null

  return (
    <TouchableOpacity style={{ ...styles.default, ...containerStyles, ...shadowStyles }} onPress={_onPress}>
      {
        iconName ?
          <Icon.Ionicons
            name={`${prefix}-${iconName}`}
            size={textStyles.fontSize}
            color={textStyles.color} /> :
          null
      }
      {
        image ?
          <Image style={{ height: textStyles.fontSize, width: textStyles.fontSize }} source={image} /> :
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
    borderRadius: 25,
  }
})

export default Button