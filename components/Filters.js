import React, { Component } from "react"
import { StyleSheet, View, Text } from "react-native"

// Constants
import Colors from "../constants/Colors"
import Layout from "../constants/Layout"

// Components
import FilterIcon from "./FilterIcon"

export default class FiltersList extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.subtitle}>Sort by</Text>
        <View style={{ ...styles.container, flexDirection: "row", marginBottom: 10 }}>
          <FilterIcon name={"locate"} text={"Distance"} size={Layout.fontSize.contentTitle} color={Colors.redible.lavenderGray} />
          <FilterIcon name={"star"} text={"Rating"} size={Layout.fontSize.contentTitle} color={Colors.redible.lavenderGray} />
          <FilterIcon name={"time"} text={"Time"} size={Layout.fontSize.contentTitle} color={Colors.redible.lavenderGray} />
        </View>
        <Text style={styles.subtitle}>Filter by category</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subtitle: {
    fontSize: Layout.fontSize.mainContent,
    color: Colors.redible.accent,
    textAlign: "center",
    marginTop: 15,
    marginBottom: 15
  }
})