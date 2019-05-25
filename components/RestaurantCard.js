import React, { Component } from "react"
import { StyleSheet, View, Image, Text, Platform, TouchableWithoutFeedback } from "react-native"
import { Icon } from "expo"

// Constants
import Layout from "../constants/Layout"
import Colors from "../constants/Colors"

/**
 * Restaurant card for main screen
 */
export default class RestaurantCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      restaurants: []
    }
  }

  render() {
    const iconPrefix = Platform.OS === "ios" ? "ios" : "md",
      { navigation, _onPress, userLocation, restaurantData } = this.props
    return (
      <TouchableWithoutFeedback onPress={() => navigation ? navigation.navigate("Details", { userLocation, restaurantData }) : _onPress ? _onPress() : null}>
        <View style={styles.container}>
          <View>
            <Image style={styles.image} source={require("../assets/images/forastera-logo.png")} />
          </View>
          <View style={styles.textContainer}>
            <View>
              <Text style={styles.dishName}>{restaurantData.name}</Text>
              <Text style={styles.text}>
                <Icon.Ionicons
                  name={`${iconPrefix}-pin`}
                  size={Layout.fontSize.mainContent}
                />{` ${restaurantData.address}`}</Text>
              <Text style={styles.text}>
                <Icon.Ionicons
                  name={`${iconPrefix}-time`}
                  size={Layout.fontSize.mainContent}
                />{` Categories...`}
              </Text>
            </View>
            <View style={styles.footer}>
              <Text style={styles.rating}>
                <Icon.Ionicons
                  name={`${iconPrefix}-star`}
                  size={Layout.fontSize.mediumText}
                  color={Colors.redible.star}
                />{` 4.2 Good`}
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
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
  textContainer: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20
  },
  image: {
    height: 150,
    width: 150
  },
  text: {
    marginTop: 10,
    fontSize: Layout.fontSize.medium,
    color: Colors.redible.accent
  },
  dishName: {
    fontSize: Layout.fontSize.mainContent
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