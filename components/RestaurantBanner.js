import React, { Component } from "react"
import { Platform, StyleSheet, View, Image, Text, ImageBackground, TouchableOpacity } from "react-native"
import { Icon } from 'expo'

// Constants
import Layout from "../constants/Layout"
import Colors from "../constants/Colors"

/**
 * Restaurant banner for main screen
 */
export default class RestaurantBanner extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const iconPrefix = Platform.OS === "ios" ? "ios" : "md"
    return (
      <ImageBackground style={styles.container} source={require("../assets/images/paella.jpg")}>
        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <View style={styles.ratingContainer}>
              <Text style={styles.rating}>
                <Icon.Ionicons
                  name={`${iconPrefix}-star`}
                  size={Layout.fontSize.contentTitle} />
                {` 4.5 Good`}</Text>
            </View>
            <Text style={styles.restaurantTitle}>Forastera Restaurant</Text>
            <TouchableOpacity>
              <Text style={styles.text}>
                <Icon.Ionicons
                  name={`${iconPrefix}-return-right`}
                  size={Layout.fontSize.mediumText} />
                {` Go to Forastera`}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: Layout.window.width,
    height: Layout.window.height / 3.25,
    marginBottom: 15,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(255, 255, 255, 0.0)"
  },
  textContainer: {
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    position: "relative",
    overflow: "visible"
  },
  ratingContainer: {
    position: "absolute",
    zIndex: 1000,
    top: -20,
    right: 15,
    backgroundColor: Colors.basic.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 25,
    fontSize: Layout.fontSize.contentTitle
  },
  restaurantTitle: {
    fontSize: Layout.fontSize.largeText,
    fontWeight: "bold"
  },
  text: {
    marginTop: 10,
    fontSize: Layout.fontSize.contentTitle
  },
})