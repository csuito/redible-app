import React from "react"
import { StyleSheet, TouchableOpacity } from "react-native"
import { Icon } from "expo"
import PropTypes from "prop-types"

// Constants
import Colors from "../constants/Colors"
import Layout from "../constants/Layout"

/**
 * Renders basket  floating button on Details Screen
 * @param {Object} props 
 */
const CartButton = props => {
  const { _onPress, prefix } = props

  return (
    <TouchableOpacity style={styles.container} onPress={_onPress}>
      <Icon.Ionicons
        name={`${prefix}-basket`}
        color={Colors.basic.white}
        size={Layout.fontSize.largeIcon}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 65,
    left: Layout.window.width - 65,
    height: 50,
    width: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.redible.raspberry,
    zIndex: 10000,
    padding: 5,
    shadowColor: Colors.shadow,
    shadowOffset: { height: 5, width: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
  }
})

CartButton.propTypes = {
  _onPress: PropTypes.func.isRequired,
  prefix: PropTypes.string
}

export default CartButton