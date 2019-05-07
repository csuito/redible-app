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

  _getIconProperties = type => {
    let color, iconName
    switch (type) {
      case "Featured":
        color = Colors.redible.raspberry; iconName = "flame";
        break
      case "Top rated":
        color = Colors.redible.star; iconName = "star";
        break
      case "Healthy":
        color = Colors.redible.main; iconName = "leaf";
        break
      default:
        null
    }
    return { color, iconName }
  }
  render() {
    const iconPrefix = Platform.OS === "ios" ? "ios" : "md",
      { type } = this.props,
      { color, iconName } = this._getIconProperties(type)

    return (
      <ImageBackground style={styles.container} source={require("../assets/images/paella.jpg")}>
        <View style={styles.contentContainer}>
          <View style={{ ...styles.verticalLine, backgroundColor: color }}></View>
          <View style={styles.textContainer}>
            <View style={styles.ratingContainer}>
              <Text style={styles.rating}>
                <Icon.Ionicons
                  name={`${iconPrefix}-star`}
                  size={Layout.fontSize.contentTitle} />
                {` 4.5 Good`}</Text>
            </View>
            <Text style={{ ...styles.bannerTitle, color }}>
              <Icon.Ionicons
                name={`${iconPrefix}-${iconName}`}
                size={Layout.fontSize.contentTitle}
                color={color}
              />{` ${type}`}</Text>
            <Text style={styles.restaurantTitle}>Forastera Restaurant</Text>
          </View>
        </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: Layout.window.width - 30,
    height: Layout.window.height / 3.25,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 8,
    overflow: "hidden",
    shadowColor: "rgba(0, 0, 0, 0.4)",
    shadowOffset: { height: 5, width: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(255, 255, 255, 0.0)",
    position: "relative"
  },
  verticalLine: {
    position: "absolute",
    width: 15,
    height: "100%",
    top: 0,
    left: 0,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    zIndex: 100,
  },
  textContainer: {
    padding: 10,
    paddingLeft: 25,
    paddingBottom: 15,
    backgroundColor: "rgba(255, 255, 255, 1)",
    position: "relative",
    overflow: "visible",
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
    fontSize: Layout.fontSize.contentTitle,
    overflow: "hidden",
    shadowColor: "rgba(0, 0, 0, 0.4)",
    shadowOffset: { height: 3, width: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 3,
  },
  bannerTitle: {
    fontSize: Layout.fontSize.contentTitle,
  },
  restaurantTitle: {
    fontSize: Layout.fontSize.mainContent,
    fontWeight: "bold"
  },
  text: {
    marginTop: 10,
    fontSize: Layout.fontSize.contentTitle
  },
})