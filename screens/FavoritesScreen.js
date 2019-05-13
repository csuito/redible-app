import React, { Component } from "react"
import { StyleSheet, View, ScrollView } from "react-native"

// Components
import WithBackIconHeader from "../components/headers/WithBackIconHeader"
import RestaurantBanner from "../components/RestaurantBanner"

// Constants
import Colors from "../constants/Colors"


export default class FavoritesScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: <WithBackIconHeader text={"Favorites"} iconName={"arrow-back"} color={Colors.basic.white} navigation={navigation} />
    }
  }

  _buildRestaurantList = () => {
    let restaurantList = []
    for (let i = 0; i <= 8; i++) {
      restaurantList.push(<RestaurantBanner key={i} navigation={this.props.navigation} type={"Favorite"} />)
    }
    return restaurantList.map(restaurant => restaurant)
  }

  render() {
    const restaurantList = this._buildRestaurantList()

    return (
      <View style={styles.container}>
        <ScrollView style={styles.contentContainer}>
          <View style={styles.listContainer}>
            {restaurantList}
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