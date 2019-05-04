import React, { Component } from "react"
import { Platform, StyleSheet, Text, TouchableOpacity } from "react-native"
import { Icon } from "expo"

// Constants
import Colors from "../constants/Colors"

export default class FiltersList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: false
    }
  }
  render() {
    const { name, size, color, text } = this.props,
      { selected } = this.state
    prefix = Platform.OS === "ios" ? "ios" : "md"

    return (
      <TouchableOpacity style={styles.container} onPress={() => this.setState({ selected: true })}>
        <Icon.Ionicons
          name={`${prefix}-${name}`}
          size={size}
          color={selected ? Colors.redible.accent : color} />
        <Text style={{ ...styles.textStyle, fontSize: size, color: selected ? Colors.redible.accent : color }}>{text}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
})