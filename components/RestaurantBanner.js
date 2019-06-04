import React, { Component } from "react"
import { Platform, StyleSheet, View, Text, ImageBackground, TouchableWithoutFeedback } from "react-native"
import { Icon } from 'expo'

// Constants
import Layout from "../constants/Layout"
import Colors from "../constants/Colors"

// Helpers
import { getIconProperties } from "../helpers/getIconProperties"
import { getRatingTitle } from "../helpers/ratingHelper"

/**
 * Restaurant banner for main screen and details screen
 */
export default class RestaurantBanner extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showDescription: false,
      arrow: "arrow-dropup"
    }
  }

  _toggleDescription = () => {
    const { showDescription, arrow } = this.state,
      arrowName = arrow === "arrow-dropup" ? "arrow-dropdown" : "arrow-dropup"

    this.setState({ showDescription: !showDescription, arrow: arrowName })
  }

  render() {
    const
      iconPrefix = Platform.OS === "ios" ? "ios" : "md",
      { showDescription, arrow } = this.state,
      { type, detail, navigation, userLocation, restaurantData } = this.props,
      { color, iconName } = getIconProperties(type),
      title = getRatingTitle(parseFloat(restaurantData.rating))

    return (
      <ImageBackground style={styles.container} imageStyle={{ resizeMode: "contain" }} source={{ uri: restaurantData.logo }}>
        <TouchableWithoutFeedback onPress={() => navigation ? navigation.navigate("Details", { userLocation, restaurantData, noShadow: true }) : this._toggleDescription()}>
          <View style={styles.contentContainer}>
            <View style={{ ...styles.verticalLine, backgroundColor: color }}></View>
            <View style={styles.textContainer}>
              <View style={styles.ratingContainer}>
                <Text style={styles.rating}>
                  <Icon.Ionicons
                    name={`${iconPrefix}-star`}
                    size={Layout.fontSize.contentTitle} />
                  {` ${restaurantData.rating} ${title}`}</Text>
              </View>
              {
                type && !detail ?
                  <View>
                    <Text style={{ ...styles.bannerTitle, color }}>
                      <Icon.Ionicons
                        name={`${iconPrefix}-${iconName}`}
                        size={Layout.fontSize.contentTitle}
                        color={color}
                      />{` ${type}`}</Text>
                    <Text style={styles.restaurantTitle}>{restaurantData.name}</Text>
                  </View>
                  :
                  <View>
                    <View style={styles.titleContainer}>
                      <Icon.Ionicons
                        name={`md-${arrow}`}
                        color={showDescription ? Colors.redible.main : Colors.redible.lavenderGray}
                        size={Layout.fontSize.largeIcon}
                      />
                      <Text style={{ ...styles.restaurantTitle, marginLeft: 15 }}>{restaurantData.name}</Text>
                    </View>
                    {
                      showDescription ?
                        <View>
                          <Text style={styles.description}>
                            <Icon.Ionicons
                              name={`${iconPrefix}-pin`}
                              color={Colors.redible.accent}
                              size={Layout.fontSize.mediumText}
                            />{` ${restaurantData.address}`}</Text>
                          <Text style={styles.description}>
                            <Icon.Ionicons
                              name={`${iconPrefix}-information-circle-outline`}
                              color={Colors.redible.accent}
                              size={Layout.fontSize.mediumText}
                            />{` Nice place, good vibes and an economically priced lunch menu`}</Text>
                        </View>
                        :
                        null
                    }
                  </View>
              }
            </View>
          </View>
        </TouchableWithoutFeedback>
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
    shadowColor: Colors.shadow,
    shadowOffset: { height: 5, width: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
    backgroundColor: Colors.basic.white
  },
  contentContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "transparent",
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
    backgroundColor: Colors.basic.white,
    position: "relative",
    overflow: "visible",
  },
  ratingContainer: {
    position: "absolute",
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
    shadowColor: Colors.shadow,
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
  titleContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  text: {
    marginTop: 10,
    fontSize: Layout.fontSize.contentTitle
  },
  description: {
    color: Colors.redible.accent,
    fontSize: Layout.fontSize.mediumText,
    marginTop: 10
  },
})