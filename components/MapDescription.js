import React from "react"
import { StyleSheet, Platform, Text, View } from "react-native"
import { Icon } from "expo"
import PropTypes from "prop-types"

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
const DescriptionCard = props => {
  const prefix = Platform.OS === "ios" ? "ios" : "md",
    { navigation, _onPress, restaurantData, userLocation } = props

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.contentTitle}>
          {`${restaurantData.name}`}
        </Text>
        <Stars prefix={prefix} rating={restaurantData.rating} />
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={{ ...styles.description, marginBottom: 10 }}>
          <Icon.Ionicons
            name={`${prefix}-pin`}
            color={Colors.redible.accent}
            size={Layout.fontSize.mediumText}
          />
          {` ${restaurantData.address}`}</Text>
        <Text style={styles.description}>
          <Icon.Ionicons
            name={`${prefix}-information-circle-outline`}
            color={Colors.redible.accent}
            size={Layout.fontSize.mediumText}
          />{` Nice place, good vibes and an economically priced lunch menu`}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          iconName={"close"}
          text={"Close"}
          containerStyles={{ flexDirection: "row", backgroundColor: Colors.redible.raspberry, width: 100 }}
          textStyles={{ fontSize: Layout.fontSize.smallText, color: Colors.basic.white }}
          _onPress={_onPress}
        />
        <Button
          iconName={"checkmark"}
          text={"Go"}
          containerStyles={{ flexDirection: "row", backgroundColor: Colors.redible.main, width: 100 }}
          textStyles={{ fontSize: Layout.fontSize.smallText, color: Colors.basic.white }}
          _onPress={() => navigation.navigate("Details", { userLocation, restaurantData, noShadow: true })}
        />
      </View>
    </View>
  )
}

DescriptionCard.propTypes = {
  navigation: PropTypes.object.isRequired,
  _onPress: PropTypes.func.isRequired,
  restaurantData: PropTypes.object.isRequired,
  userLocation: PropTypes.object
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
})

export default DescriptionCard