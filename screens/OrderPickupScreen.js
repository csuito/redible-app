import React, { Component } from "react"
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native"
import { PacmanIndicator } from "react-native-indicators"
import { MapView, Location, Permissions } from "expo"
const { Marker, Polyline } = MapView

// Components
import WithBackIconHeader from "../components/headers/WithBackIconHeader"
import PickupDescription from "../components/PickupDescription"

// Constants
import Colors from "../constants/Colors"

// Helpers
import { decode } from "../helpers/decodeDirections"

// Services
import DirectionsService from "../services/directions"

/**
 * Renders order pickup screen
 */
export default class OrderPickupScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mapCenter: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      },
      userLocation: {},
      restaurantMarker: {},
      directions: [],
      duration: "",
      loading: true,
      restaurantData: {}
    }
    this.directionsService = new DirectionsService()
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: <WithBackIconHeader _onPress={() => navigation.navigate("Home")} iconName={"home"} text={"Order pick-up"} color={Colors.basic.white} navigation={navigation} />
    }
  }

  componentDidMount() {
    this._getDirections()
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
   * Gets directions for user location and restaurant
   * renders polyline on map component
   */
  _getDirections = async () => {
    const
      restaurantData = this.props.navigation.getParam("restaurantData"),
      userLocation = await this._getUserLocation(),
      restaurantMarker = { latitude: parseFloat(restaurantData.lat), longitude: parseFloat(restaurantData.lng) },
      originString = `${userLocation.latitude},${userLocation.longitude}`,
      destinationString = `${restaurantData.lat},${restaurantData.lng}`

    try {
      const { data } = await this.directionsService.getDirections(originString, destinationString)
      const points = decode(data.points)
      let directions = [
        userLocation,
        ...points,
        restaurantMarker
      ]

      const { duration } = data

      const
        durationTime = parseInt(duration.substring(0, 2).trim()),
        mapZoom = durationTime >= 40 ? 0.0332 : durationTime >= 30 ? 0.0275 : durationTime >= 20 ? 0.0225 : 0.0155

      const mapCenter = {
        latitude: (userLocation.latitude + restaurantMarker.latitude) / 2,
        longitude: (userLocation.longitude + restaurantMarker.longitude) / 2,
        latitudeDelta: mapZoom,
        longitudeDelta: mapZoom
      }

      this.setState({ userLocation, directions, duration, mapCenter, restaurantData, restaurantMarker, loading: false }, () => {
        this.props.navigation.setParams({ noShadow: false })
      })
    } catch (err) {
      this.setState({ error: true })
    }
  }

  render() {
    const { loading, mapCenter, userLocation, restaurantData, restaurantMarker, duration, directions } = this.state

    return (
      <View style={styles.container}>
        {
          !loading ?
            <View style={styles.mapContainer}>
              <View style={{ flex: 1 }}>
                {
                  duration ?
                    <PickupDescription restaurantData={restaurantData} duration={duration} /> :
                    null
                }
                {
                  mapCenter.latitude && mapCenter.longitude && directions ?
                    <MapView
                      style={styles.map}
                      initialRegion={mapCenter}
                      onRegionChange={() => { }}>

                      <Polyline
                        coordinates={directions}
                        strokeWidth={3}
                        strokeColor={Colors.redible.main}
                      />

                      {
                        userLocation.latitude && userLocation.longitude ?
                          <Marker
                            coordinate={userLocation}
                            pinColor={Colors.redible.raspberry}
                            onPress={() => { }}
                          /> :
                          null
                      }
                      {
                        restaurantMarker.latitude && restaurantMarker.longitude ?
                          <Marker
                            coordinate={restaurantMarker}
                            tracksViewChanges={false}
                            tracksInfoWindowChanges={false}
                            pinColor={Colors.redible.main} /> :
                          null
                      }
                    </MapView>
                    :
                    null
                }
              </View>
            </View>
            :
            <View style={{ flex: 1, backgroundColor: Colors.redible.main }}>
              <PacmanIndicator size={75} color={Colors.basic.white} />
            </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
    overflow: "hidden",
    position: "relative"
  },
})