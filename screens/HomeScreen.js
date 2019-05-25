import React, { Component } from "react"
import { ScrollView, StyleSheet, View, Text } from "react-native"
import { Location, Permissions } from "expo"

// Components
import SearchHeader from "../components/headers/SearchHeader"
import SearchModal from "../components/modals/SearchModal"
import RestaurantBanner from "../components/RestaurantBanner"
import RestaurantCard from "../components/RestaurantCard"

// Constants
import Layout from "../constants/Layout"
import Colors from "../constants/Colors"

// Services
import RestaurantService from "../services/restaurant"

/**
 * Renders restaurants list
 */
export default class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userLocation: {},
      restaurants: []
    }
    this.restaurantService = new RestaurantService()
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: <SearchHeader navigation={navigation} />
    }
  }

  componentDidMount() {
    this._addModalSub(this.props.navigation)
    this._getUserLocation()
    this._getAllRestaurants()
  }

	/**
	* Adds modal subscription
	*  @param {Object} navigation
	*/
  _addModalSub = navigation => {
    modalSub = navigation.addListener("willBlur", () => {
      navigation.setParams({ modalVisible: false })
    })
  }

  _hideModal = () => {
    this.props.navigation.setParams({ modalVisible: false })
  }

  _getUserLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION)

    if (status !== "granted") console.log("Gelocation permissions denied")

    const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({})
    const coordinates = { latitude, longitude }

    this.setState({
      userLocation: coordinates
    })
  }


  _getAllRestaurants = async () => {
    const { data } = await this.restaurantService.getAllRestaurants()
    this.setState({ restaurants: data.data })
  }

  _buildFeaturedList = () => {
    const types = ["Top deal", "Top rated", "Healthy", "Trending"]
    let featured = []
    for (let i = 0; i < 4; i++) {
      featured.push(<RestaurantBanner key={i} type={types[i]} navigation={this.props.navigation} userLocation={this.state.userLocation} />)
    }
    return featured.map(restaurant => restaurant)
  }

  _buildRestaurantList = () => {
    const { restaurants, userLocation } = this.state

    return restaurants.map(restaurant => {
      return (
        <RestaurantCard key={restaurant._id}
          navigation={this.props.navigation}
          userLocation={userLocation}
          restaurantData={restaurant} />
      )
    })
  }

  render() {
    const
      featuredList = this._buildFeaturedList(),
      { restaurants } = this.state,
      { navigation } = this.props

    let modalVisible = navigation.getParam("modalVisible") || false

    return (
      <View style={styles.container}>

        <SearchModal
          navigation={navigation}
          _onPress={this._hideModal}
          modalVisible={modalVisible} />

        <ScrollView style={styles.contentContainer}>
          <Text style={{ ...styles.title, marginTop: 15, marginBottom: 0 }}>Recommended</Text>
          <View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              {featuredList}
            </ScrollView>
            <Text style={styles.title}>Restaurants</Text>
            {
              restaurants ?
                this._buildRestaurantList() :
                null
            }
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
  title: {
    marginBottom: 15,
    textAlign: "center",
    color: Colors.redible.accent,
    fontSize: Layout.fontSize.contentTitle,
  },
})
