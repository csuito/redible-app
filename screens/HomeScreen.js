import React, { Component } from "react"
import { ScrollView, StyleSheet, View, Text, RefreshControl } from "react-native"
import { PacmanIndicator } from "react-native-indicators"
import { Location, Permissions } from "expo"

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
      allRestaurants: [],
      restaurants: [],
      searchTerm: "",
      loading: true,
      refreshing: false,
      activeId: "",
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
    navigation.setParams({ noShadow: true, onChangeText: this._onChangeText, searchTerm: this.state.searchTerm })
    this._addModalSub(navigation)

    this._loadComponentData()
  }

  /**
   * Loads user location and restaurant data
   */
  _loadComponentData = async () => {
    const userLocation = this._getUserLocation(),
      restaurants = this._getAllRestaurants()

    try {
      const data = await Promise.all([userLocation, restaurants])

      this.setState({ userLocation: data[0], allRestaurants: data[1], restaurants: data[1], loading: false }, () => {
        this.props.navigation.setParams({ noShadow: false })
      })
    } catch (err) {
      this.setState({ error: true, message: "Unable to get current location" })
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

  /**
   * Gets current user coordinates
   */
  _getUserLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION)

    if (status !== "granted") console.log("Gelocation permissions denied")

    const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({})
    const coordinates = { latitude, longitude }

    return coordinates
  }

  /**
   * Returns list of restaurants from api
   */
  _getAllRestaurants = async () => {
    const { data } = await this.restaurantService.getAllRestaurants()
    return data
  }

  /**
   * Handles text change event on search header
   * @params {String} searchTerm
   */
  _onChangeText = searchTerm => {
    this.props.navigation.setParams({ searchTerm })
    let { restaurants, allRestaurants } = this.state

    if (searchTerm === "") {
      return this.setState({ restaurants: allRestaurants })
    }

    restaurants = allRestaurants.filter(restaurant => {
      return restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
    })

    this.setState({
      searchTerm,
      restaurants
    })
  }

  _buildFeaturedList = () => {
    const types = ["Top deal", "Top rated", "Trending"],
      { allRestaurants, userLocation } = this.state

    return allRestaurants.map((restaurant, i) => {
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

    if (!restaurants) return <Text style={styles.noResult}>No se han encontrado restaurantes</Text>

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

  /**
   * Sets active filter in SearchModal
   * @param {string}
   */
  _selectFilter = id => {
    this.setState(prevState => ({
      activeId: id === prevState.activeId ? "" : id
    }))
  }

  /**
   * Reloads restaurants list
   */
  _onRefresh = async () => {
    this.setState({ refreshing: true })
    const allRestaurants = await this._getAllRestaurants()
    this.props.navigation.setParams({ searchTerm: "" })
    this.setState({ searchTerm: "", allRestaurants, restaurants: allRestaurants, refreshing: false })
  }

  render() {
    const { loading, refreshing, activeId, restaurants, searchTerm } = this.state

    let modalVisible = this.props.navigation.getParam("modalVisible") || false

    return (
      <View style={styles.container}>

        <SearchModal
          _onPress={this._hideModal}
          modalVisible={modalVisible}
          _selectFilter={this._selectFilter}
          activeId={activeId} />

        <ScrollView style={styles.contentContainer}
          refreshControl={
            <RefreshControl
              onRefresh={this._onRefresh}
              refreshing={refreshing} />
          }>

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
                    restaurants.length > 0 ?
                      <View>
                        {
                          this._buildRestaurantList()
                        }
                      </View>
                      :
                      <View style={styles.noResultsContainer}>
                        <Text style={styles.title}>Sorry!</Text>
                        <Text style={styles.noResult}>We couldn't find any restaurants for {searchTerm}</Text>
                      </View>
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
  noResultsContainer: {
    flex: 1,
    marginLeft: 45,
    marginRight: 45
  },
  title: {
    marginTop: 30,
    marginBottom: 15,
    textAlign: "center",
    color: Colors.redible.mainDark,
    fontSize: Layout.fontSize.contentTitle,
    fontWeight: "bold"
  },
  noResult: {
    textAlign: "center",
    color: Colors.redible.accent,
    fontSize: Layout.fontSize.mainContent
  }
})

