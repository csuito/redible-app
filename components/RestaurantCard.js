import React, { Component } from "react"
import { StyleSheet, StatusBar, View, Image, Text } from "react-native"
import { Searchbar } from "react-native-paper"

// Constants
import Layout from "../constants/Layout"
import Colors from "../constants/Colors"

/**
 * Restaurant card for main screen
 */
export default class RestaurantCard extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Image style={styles.image} source={require("../assets/images/paella.jpg")} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.restaurantTitle}>Forastera Restaurant</Text>
          <Text style={{ ...styles.dishName, ...styles.text }}>Paella Valenciana</Text>
          <Text style={{ ...styles.price, ...styles.text }}>€ 5.50</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    borderRadius: 8,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    flexDirection: "row",
    overflow: "hidden",
    shadowColor: "rgb(0, 0, 0)",
    shadowOffset: { height: 5, width: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
  },
  textContainer: {
    backgroundColor: "white",
    padding: 10,
    paddingLeft: 20,
    flex: 1
  },
  image: {
    height: 125,
    width: 125
  },
  text: {
    marginTop: 10
  },
  restaurantTitle: {
    fontSize: Layout.fontSize.contentTile
  },
  dishName: {
    fontSize: Layout.fontSize.mainContent
  },
  price: {
    fontSize: Layout.fontSize.mainContent,
    color: Colors.redible.accent
  }
})