import React from "react"
import { StyleSheet, View, Text } from "react-native"
import { PacmanIndicator } from "react-native-indicators"

// Constants
import Colors from "../constants/Colors"
import Layout from "../constants/Layout"

/**s
 * Renders loading animation before order is confirmed
 */
const WaitConfirmation = () => {

  return (
    <View style={{ ...styles.contentContainer, backgroundColor: Colors.redible.main, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ ...styles.title, color: Colors.basic.white }}>Thank you!</Text>
      <View style={{ margin: 35 }}>
        <Text style={{ ...styles.text, color: Colors.redible.babyPowder, fontStyle: "italic" }}>Please wait a second while we confirm your order</Text>
      </View>
      <PacmanIndicator size={75} color={Colors.basic.white} />
    </View>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15
  },
  title: {
    marginTop: 50,
    fontSize: Layout.fontSize.title,
    color: Colors.basic.black,
    fontWeight: "bold",
    textAlign: "center",
  },
  text: {
    fontSize: Layout.fontSize.mainContent,
    color: Colors.redible.accent,
    marginTop: 15,
    textAlign: "center",
  },
})

export default WaitConfirmation