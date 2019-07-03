import React from "react"
import { StyleSheet, View, Text } from "react-native"
import { Icon } from "expo"

// Components
import Button from "./Button"

// Constants
import Colors from "../constants/Colors"
import Layout from "../constants/Layout"

/**
 * Renders Order Confirmation 
 */
const OrderConfirmed = props => {
  const { navigation, restaurantData } = props

  return (
    <View style={styles.contentContainer}>
      <Text style={styles.title}>Congratulations!</Text>
      <View style={styles.iconContainer}>
        <Icon.Ionicons
          name={"md-checkmark-circle"}
          color={Colors.redible.main}
          size={72}
        />
      </View>
      <View style={styles.bottomTextContainer}>
        <Text style={styles.text}>Your order</Text>
        <Text style={{ ...styles.text, ...styles.highlighted }}># 37963429</Text>
        <Text style={styles.text}>has been confirmed by</Text>
        <Text style={{ ...styles.text, ...styles.highlighted, marginBottom: 15 }}>{restaurantData.name}</Text>
      </View>
      <Button
        text={"Pick-up"}
        containerStyles={{ flexDirection: "row", backgroundColor: Colors.redible.star, margin: 35 }}
        textStyles={{ color: Colors.basic.white, fontSize: Layout.fontSize.mainContent }}
        _onPress={() => { navigation.navigate("Pickup", { noShadow: true, restaurantData }) }}
      />
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
  iconContainer: {
    margin: 35,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: Layout.fontSize.mainContent,
    color: Colors.redible.accent,
    marginTop: 15,
    textAlign: "center",
  },
  highlighted: {
    color: Colors.redible.mainDark
  }
})

export default OrderConfirmed