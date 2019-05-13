import React, { Component } from "react"
import { StyleSheet, View, Image, Text, Platform, TouchableWithoutFeedback } from "react-native"
import { Icon } from "expo"

// Constants
import Layout from "../constants/Layout"
import Colors from "../constants/Colors"

/**
 * Restaurant card for main screen
 */
export default class DishCard extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const iconPrefix = Platform.OS === "ios" ? "ios" : "md",
      { navigation, _onPress } = this.props

    return (
      <TouchableWithoutFeedback onPress={() => navigation ? navigation.navigate("Details") : _onPress ? _onPress() : null}>
        <View style={styles.container}>
          <View>
            <Image style={styles.image} source={require("../assets/images/paella.jpg")} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.dishName}>
              <Icon.Ionicons
                name={`${iconPrefix}-restaurant`}
                size={Layout.fontSize.contentTitle}
              />{` Paella Valenciana`}</Text>
            <Text style={styles.text}>
              <Icon.Ionicons
                name={`${iconPrefix}-pin`}
                size={Layout.fontSize.mainContent}
              />{` Forastera Restaurant`}</Text>
            <Text style={styles.text}>
              <Icon.Ionicons
                name={`${iconPrefix}-time`}
                size={Layout.fontSize.mainContent}
              />{` Pick-up: 20:00 - 22:30`}
            </Text>
            <View style={styles.footer}>
              <Text style={styles.price}>€ 5.50</Text>
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
    fontSize: Layout.fontSize.mainContent,
    color: Colors.redible.accent
  },
  dishName: {
    fontSize: Layout.fontSize.contentTitle
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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