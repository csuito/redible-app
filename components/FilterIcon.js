import React from "react"
import { Platform, StyleSheet, Text, TouchableOpacity } from "react-native"
import { Icon } from "expo"
import PropTypes from "prop-types"

// Constants
import Colors from "../constants/Colors"

/**
 * Renders FilterIcon at Search Modal
 * @param {Object} props 
 */
const FilterIcon = props => {
  const { activeId, name, size, color, text, _onPress } = props
  prefix = Platform.OS === "ios" ? "ios" : "md"

  const selected = name === activeId

  return (
    <TouchableOpacity style={styles.container} onPress={() => _onPress(name)}>
      <Icon.Ionicons
        name={`${prefix}-${name}`}
        size={size}
        color={selected ? Colors.redible.accent : color} />
      <Text style={{ ...styles.textStyle, fontSize: size, color: selected ? Colors.redible.accent : color }}>{text}</Text>
    </TouchableOpacity>
  )
}

FilterIcon.propTypes = {
  activeId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  _onPress: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
})

export default FilterIcon