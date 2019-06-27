import React from "react"
import { Icon } from "expo"
import PropTypes from "prop-types"

// Constants
import Colors from "../constants/Colors"

/**
 * Renders TabBarIcon in
 * @param {Object} props 
 */
const TabBarIcon = props => {
  const { name, focused } = props

  return (
    <Icon.Ionicons
      name={name}
      size={26}
      style={{ marginBottom: -3 }}
      color={focused ? Colors.redible.main : Colors.redible.lavenderGray}
    />
  )
}

TabBarIcon.propTypes = {
  name: PropTypes.string.isRequired,
  focused: PropTypes.bool
}

export default TabBarIcon