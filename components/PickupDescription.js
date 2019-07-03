import React from "react"
import { StyleSheet, Platform, Text, View, TouchableOpacity } from "react-native"
import { Icon } from "expo"
import * as Animatable from "react-native-animatable"

// Components
import Stars from "./StarRow"
import Button from "./Button"

// Constants
import Layout from "../constants/Layout"
import Colors from "../constants/Colors"

/**
 * Renders restaurant description on Map Screen
 * @param {Object} props 
 */
const PickupDescription = props => {
  const prefix = Platform.OS === "ios" ? "ios" : "md",
    { restaurantData, duration } = props

  return (
    <View style={styles.container}>

      <View style={styles.titleContainer}>
        <Text style={styles.restaurantName}>{`${restaurantData.name}`}</Text>
        <Text style={styles.time}>
          <Icon.Ionicons
            name={`md-list-box`}
            color={Colors.redible.star}
            size={Layout.fontSize.smallText}
          />
          {` 37963429`}</Text>
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={{ ...styles.description, marginBottom: 10 }}>
          <Icon.Ionicons
            name={`${prefix}-pin`}
            color={Colors.redible.accent}
            size={Layout.fontSize.mediumText}
          />
          {` ${restaurantData.address}`}</Text>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Text style={{ ...styles.description, textAlign: "center" }}>
            <Icon.Ionicons
              name={`${prefix}-walk`}
              color={Colors.redible.accent}
              size={Layout.fontSize.mediumText}
            />
            {` Distance: ${duration}`}</Text>
          <Text style={styles.description}>
            <Icon.Ionicons
              name={`${prefix}-time`}
              color={Colors.redible.accent}
              size={Layout.fontSize.mediumText}
            />
            {` Pick-up time: 20:15`}</Text>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          text={"Done"}
          containerStyles={{ flexDirection: "row", backgroundColor: Colors.redible.main, paddingLeft: 35, paddingRight: 35 }}
          textStyles={{ fontSize: Layout.fontSize.smallText, color: Colors.basic.white, fontWeight: "bold" }}
          _onPress={() => { }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 35,
    left: 15,
    right: 15,
    backgroundColor: Colors.basic.white,
    borderRadius: 8,
    shadowColor: Colors.shadow,
    shadowOffset: { height: 5, width: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
    zIndex: 1000
  },
  titleContainer: {
    flexDirection: "row",
    backgroundColor: Colors.redible.main,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  contentTitle: {
    fontSize: Layout.fontSize.mainContent,
    color: Colors.basic.white,
    fontWeight: "bold"
  },
  descriptionContainer: {
    padding: 15
  },
  restaurantName: {
    color: Colors.basic.white,
    fontSize: Layout.fontSize.mediumText,
    fontWeight: "bold"
  },
  time: {
    color: Colors.redible.star,
    fontSize: Layout.fontSize.smallText,
    fontWeight: "bold"
  },
  description: {
    color: Colors.redible.accent,
    fontSize: Layout.fontSize.mediumText
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginLeft: 15,
    marginRight: 15,
    paddingBottom: 15
  },
  pickup: {
    position: "absolute",
    flexDirection: "row",
    backgroundColor: Colors.redible.mainDark,
    alignItems: "center",
    justifyContent: "space-between",
    bottom: 0,
    left: 15,
    right: 15,
    padding: 10,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    shadowColor: Colors.shadow,
    shadowOffset: { height: 5, width: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
  }
})

export default PickupDescription