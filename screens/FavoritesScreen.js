import React, { Component } from "react"
import { Platform, StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native"
import { Icon } from 'expo'

// Components
import WithBackIconHeader from "../components/headers/WithBackIconHeader"
import DishCard from "../components/DishCard"

// Constants
import Colors from "../constants/Colors"


export default class FavoritesScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: <WithBackIconHeader text={"Favorites"} iconName={"arrow-back"} color={Colors.basic.white} />
    }
  }

  _buildRestaurantList = () => {
    let restaurantList = []
    for (let i = 0; i <= 8; i++) {
      restaurantList.push(<DishCard key={i} />)
    }
    return restaurantList
  }

  render() {
    const restaurantList = this._buildRestaurantList()

    return (
      <View style={styles.container}>
        <ScrollView style={styles.contentContainer}>
          <View style={styles.listContainer}>
            {restaurantList.map(restaurant => restaurant)}
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.basic.white,
  },
  contentContainer: {
    backgroundColor: Colors.basic.white,
  },
  listContainer: {
    marginTop: 15,
    marginBottom: 15
  }
})