import React from "react"
import { StyleSheet, View, Image, Text, Platform, TouchableWithoutFeedback } from "react-native"
import { Chip } from "react-native-paper"
import { Icon } from "expo"
import PropTypes from "prop-types"

// Constants
import Layout from "../constants/Layout"
import Colors from "../constants/Colors"

/**
 * Renders restaurant card in Home Screen
 * @param {Object} props 
 */
const RestaurantCard = props => {
  const prefix = Platform.OS === "ios" ? "ios" : "md",
    { navigation, _onPress, userLocation, restaurantData } = props

  return (
    <TouchableWithoutFeedback onPress={() => navigation ? navigation.navigate("Details", { userLocation, restaurantData, noShadow: true }) : _onPress ? _onPress() : null}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: restaurantData.logo }} />
        </View>
        <View style={styles.textContainer}>
          <View>
            <Text style={styles.dishName}>{restaurantData.name}</Text>
            <Text style={styles.text}>
              <Icon.Ionicons
                name={`${prefix}-pin`}
                size={Layout.fontSize.mainContent}
              />{` ${restaurantData.address}`}</Text>
            <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
              <Chip style={styles.chipContainer}>
                <Text style={styles.chipText}>Spanish</Text>
              </Chip>
              <Chip style={{ ...styles.chipContainer, marginLeft: 5 }}>
                <Text style={styles.chipText}>Tapas</Text>
              </Chip>
            </View>
          </View>
          <View style={styles.footer}>
            <Text style={styles.rating}>
              <Icon.Ionicons
                name={`${prefix}-star`}
                size={Layout.fontSize.mediumText}
                color={Colors.redible.star}
              />{` ${restaurantData.rating}`}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

RestaurantCard.propTypes = {
  navigation: PropTypes.object,
  _onPress: PropTypes.func,
  userLocation: PropTypes.object,
  restaurantData: PropTypes.object.isRequired
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    flexDirection: "row",
    overflow: "hidden",
    shadowColor: Colors.shadow,
    shadowOffset: { height: 5, width: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
  },
  imageContainer: {
    flex: 1,
    backgroundColor: Colors.basic.white,
  },
  textContainer: {
    flex: 1.75,
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20
  },
  image: {
    height: undefined,
    width: undefined,
    resizeMode: "contain",
    flex: 1,
  },
  text: {
    marginTop: 10,
    fontSize: Layout.fontSize.medium,
    color: Colors.redible.accent
  },
  dishName: {
    fontSize: Layout.fontSize.mainContent
  },
  chipContainer: {
    marginTop: 10
  },
  chipText: {
    fontSize: Layout.fontSize.smallerText,
    color: Colors.redible.silver
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 10
  },
  price: {
    fontSize: Layout.fontSize.medium,
    color: Colors.redible.accent
  },
  rating: {
    fontSize: Layout.fontSize.mediumText,
    color: Colors.redible.star
  }
})

export default RestaurantCard