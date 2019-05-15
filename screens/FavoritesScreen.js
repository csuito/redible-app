import React, { Component } from "react"
import { StyleSheet, View, ScrollView, Text } from "react-native"
import { Icon } from "expo"

// Components
import WithBackIconHeader from "../components/headers/WithBackIconHeader"
import FavoriteCard from "../components/Favorite"
import Button from "../components/Button"

// Constants
import Colors from "../constants/Colors"
import Layout from "../constants/Layout"

/**
 * Renders user favorite restaurants
 */
export default class FavoritesScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showMessage: false
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: <WithBackIconHeader text={"Favorites"} iconName={"arrow-back"} color={Colors.basic.white} navigation={navigation} />
    }
  }

  _buildRestaurantList = () => {
    let restaurantList = []
    for (let i = 0; i <= 8; i++) {
      restaurantList.push(<FavoriteCard key={i} navigation={this.props.navigation} name={"Forastera Restaurant"} _onPress={() => this._remove()} />)
    }
    return restaurantList.map(restaurant => restaurant)
  }

  _remove = () => {
    this.setState({
      showMessage: true
    }, () => {
      setTimeout(() => {
        this.setState({
          showMessage: false
        })
      }, 3000)
    })
  }

  render() {
    const { showMessage } = this.state,
      restaurantList = this._buildRestaurantList()

    return (
      <View style={styles.container}>
        <ScrollView style={styles.contentContainer}>
          <View style={styles.listContainer}>
            {restaurantList}
          </View>
        </ScrollView>

        {
          showMessage ?
            <View style={styles.messageContainer}>
              <View style={{ flex: 1, marginRight: 15 }}>
                <Text style={styles.message}>
                  <Icon.Ionicons
                    name={"md-information-circle-outline"}
                    color={Colors.redible.raspberry}
                    size={Layout.fontSize.mediumText}
                  />
                  {` Forastera Restaurant removed from favorites`}</Text>
              </View>
              <Button
                iconName={"undo"}
                text={"UNDO"}
                containerStyles={{ flexDirection: "row", backgroundColor: Colors.redible.main }}
                textStyles={{ fontSize: Layout.fontSize.smallText, color: Colors.basic.white }}
                _onPress={() => this.setState({ showMessage: false })} />
            </View>
            :
            null
        }
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
  },
  messageContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    position: "absolute",
    width: Layout.window.width,
    bottom: 0,
    backgroundColor: Colors.basic.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    shadowColor: Colors.basic.black,
    shadowOffset: { height: 5, width: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
  },
  message: {
    fontSize: Layout.fontSize.mediumText,
    color: Colors.redible.raspberry
  }
})