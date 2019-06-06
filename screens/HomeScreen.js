import React, { Component } from "react"
import { ScrollView, StyleSheet, View, Text, RefreshControl } from "react-native"
import { Location, Permissions } from "expo"
import { PacmanIndicator } from "react-native-indicators"

// Components
import SearchHeader from "../components/headers/SearchHeader"
import SearchModal from "../components/modals/SearchModal"
import RestaurantBanner from "../components/RestaurantBanner"
import RestaurantCard from "../components/RestaurantCard"

// Constants
import Layout from "../constants/Layout"
import Colors from "../constants/Colors"

// Helpers
import { getRandomRating } from "../helpers/ratingHelper"

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
      restaurants: [],
      loading: true,
      refreshing: false,
      error: false
    }
    this.restaurantService = new RestaurantService()
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: <SearchHeader navigation={navigation} />
    }
  }

  componentDidMount() {
    const { navigation } = this.props
    navigation.setParams({ noShadow: true })
    this._addModalSub(navigation)

    this._loadComponentData()
  }

  componentWillUnmount() {
    this._hideModal()
  }

  _loadComponentData = async () => {
    const userLocation = this._getUserLocation(),
      restaurants = this._getAllRestaurants()

    try {
      const data = await Promise.all([userLocation, restaurants])

      this.setState({ userLocation: data[0], restaurants: data[1], loading: false }, () => {
        this.props.navigation.setParams({ noShadow: false })
      })
    } catch (err) {
      this.setState({ error: true })
    }
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

    return coordinates
  }

  _getAllRestaurants = async () => {
    const { data } = await this.restaurantService.getAllRestaurants()
    return data
  }

  _buildFeaturedList = () => {
    const types = ["Top deal", "Top rated", "Trending"],
      { restaurants, userLocation } = this.state

    return restaurants.map((restaurant, i) => {
      restaurant.rating = getRandomRating(4.2)
      return (
        i >= types.length ? null :
          (
            <RestaurantBanner
              restaurantData={restaurant}
              key={restaurant._id}
              type={types[i]}
              navigation={this.props.navigation}
              userLocation={userLocation} />
          )
      )
    })
  }

  _buildRestaurantList = () => {
    const { restaurants, userLocation } = this.state

    return restaurants.map(restaurant => {
      restaurant.rating = getRandomRating()
      return (
        <RestaurantCard
          key={restaurant._id}
          navigation={this.props.navigation}
          userLocation={userLocation}
          restaurantData={restaurant} />
      )
    })
  }

  _onRefresh = async () => {
    this.setState({ refreshing: true })
    const restaurants = await this._getAllRestaurants()
    this.setState({ restaurants, refreshing: false })
  }

  render() {
    const { loading, refreshing } = this.state,
      { navigation } = this.props

    let modalVisible = navigation.getParam("modalVisible") || false

    return (
      <View style={styles.container}>

        <SearchModal
          navigation={navigation}
          _onPress={this._hideModal}
          modalVisible={modalVisible} />

        <ScrollView style={styles.contentContainer}
          refreshControl={
            <RefreshControl
              onRefresh={this._onRefresh}
              refreshing={refreshing}
            />
          }
        >
          <View>
            {
              !loading ?
                <View>
                  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {
                      this._buildFeaturedList()
                    }
                  </ScrollView>
                  {
                    this._buildRestaurantList()
                  }
                </View>
                :
                <View style={{ height: Layout.window.height, width: Layout.window.width, backgroundColor: Colors.redible.main }}>
                  <PacmanIndicator size={75} color={Colors.basic.white} />
                </View>
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

