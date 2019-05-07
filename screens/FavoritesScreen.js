import React, { Component } from "react"
import { Platform, StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native"
import { Icon } from 'expo'

// Components
import WithBackIconHeader from "../components/headers/WithBackIconHeader"
import RestaurantCard from "../components/RestaurantCard"

// Constants
import Layout from "../constants/Layout"
import Colors from "../constants/Colors"


export default class FavoritesScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static navigationOptions = ({ navigation }) => {
    const prefix = Platform.OS === "ios" ? "ios" : "md"

    return {
      header: <WithBackIconHeader text={"Favorites"} iconName={"arrow-back"} color={Colors.basic.white} />
    }
  }

  _buildRestaurantList = () => {
    let restaurantList = []
    for (let i = 0; i <= 8; i++) {
      restaurantList.push(<RestaurantCard key={i} />)
    }
    return restaurantList
  }

  render() {
    const restaurantList = this._buildRestaurantList()

    return (
      <View style={styles.container}>
        <ScrollView style={styles.contentContainer}>
          {restaurantList.map(restaurant => restaurant)}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.basic.white,
    paddingTop: 30,
    paddingBottom: 30
  },
  contentContainer: {
    backgroundColor: Colors.basic.white
  },
})