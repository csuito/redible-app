import React from "react"
import { View, TextInput } from "react-native"
import { Icon } from "expo"
import PropTypes from "prop-types"

/**
 * Custom input component
 * @param {Object} props 
 */
const CustomInput = props => {
  const { containerStyles, textStyles, placeholder, icon, iconSize, iconColor, _onChange, name, value, mode } = props

  return (
    <View style={containerStyles}>
      {
        icon ?
          <Icon.Ionicons
            name={icon}
            color={iconColor}
            size={iconSize}
          />
          :
          null
      }
      <TextInput
        placeholder={placeholder}
        onChangeText={_onChange}
        mode={mode || "outlined"}
        value={value}
        style={textStyles}
      />
    </View>
  )
}

CustomInput.propTypes = {
  containerStyles: PropTypes.object,
  textStyles: PropTypes.object,
  placeholder: PropTypes.string,
  icon: PropTypes.string,
  _onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  mode: PropTypes.string
}

export default CustomInput