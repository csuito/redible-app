import React, { Component } from "react"
import { StyleSheet, View } from "react-native"
import { PacmanIndicator } from "react-native-indicators"
import { MapView, Location, Permissions } from "expo"
const { Marker } = MapView

// Components
import SearchHeader from "../components/headers/SearchHeader"
import SearchModal from "../components/modals/SearchModal"
import DescriptionCard from "../components/MapDescription"

// Constants
import Colors from "../constants/Colors"

// Services
import RestaurantService from "../services/restaurant"

/**
 * Renders Map Screen
 */
export default class MapScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mapCenter: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      restaurantMarkers: [],
      restaurantData: "",
      userMarker: {},
      showDescription: false,
      modalVisible: false,
      loading: true
    }
    this.restaurantService = new RestaurantService()
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: <SearchHeader navigation={navigation} />
    }
  }

  async componentDidMount() {
    this._addModalSub(this.props.navigation)
    await this._getCurrentLocation()
    await this._getRestaurantMarkers()

    this.setState({ loading: false })
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

  _getCurrentLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION)

    if (status !== "granted") console.log("Gelocation permissions denied")

    const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({})
    const coordinates = { latitude, longitude }

    this.setState(prevState => ({
      mapCenter: {
        ...prevState.mapCenter,
        ...coordinates
      },
      userMarker: {
        ...coordinates
      }
    }))
  }

  _hideModal = () => {
    this.props.navigation.setParams({ modalVisible: false })
  }

  /** On region change function really slows down map performance */
  _onRegionChange = mapCenter => {
    this.setState({ mapCenter })
  }

  _getRestaurantMarkers = async () => {
    const { data } = await this.restaurantService.getAllRestaurants()

    const restaurants = data.data

    let restaurantMarkers = []

    for (let i = 0; i < restaurants.length; i++) {
      restaurantMarkers.push(
        {
          coordinates: { latitude: parseFloat(restaurants[i].lat), longitude: parseFloat(restaurants[i].lng) },
          ...restaurants[i]
        }
      )
    }
    this.setState({ restaurantMarkers })
  }

  _buildRestaurantLocations = restaurants => {
    return restaurants.map(restaurantData => {
      return (
        <Marker
          key={restaurantData._id}
          coordinate={restaurantData.coordinates}
          tracksViewChanges={false}
          tracksInfoWindowChanges={false}
          pinColor={Colors.redible.main}
          onPress={() => this.setState({ showDescription: true, restaurantData })}
        />
      )
    })
  }

  render() {
    const { mapCenter, restaurantMarkers, restaurantData, userMarker, showDescription, loading } = this.state,
      { latitude, longitude } = mapCenter,
      { navigation } = this.props

    let modalVisible = navigation.getParam("modalVisible") || false

    return (
      latitude && longitude && !loading ?
        <View style={styles.mapContainer}>

          <SearchModal
            navigation={navigation}
            _onPress={this._hideModal}
            modalVisible={modalVisible} />

          <MapView
            style={styles.map}
            initialRegion={mapCenter}
            onRegionChange={() => { }}>

            {
              restaurantMarkers ?
                this._buildRestaurantLocations(restaurantMarkers)
                :
                null
            }

            <Marker
              coordinate={userMarker}
              pinColor={Colors.redible.raspberry}
              onPress={() => { }}
            />

          </MapView>
          {
            userMarker && showDescription ?
              <DescriptionCard navigation={navigation} userLocation={userMarker} restaurantData={restaurantData} _onPress={() => this.setState({ showDescription: false })} />
              :
              null
          }
        </View>
        :
        <View style={{ flex: 1, backgroundColor: Colors.redible.main }}>
          <PacmanIndicator size={75} color={Colors.basic.white} />
        </View>
    )
  }
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    position: "relative"
  },
  map: {
    flex: 1,
  }
})
