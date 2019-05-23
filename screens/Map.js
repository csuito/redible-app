import React, { Component } from "react"
import { StyleSheet, View, Text } from "react-native"
import { MapView, Location, Permissions } from "expo"
const { Marker } = MapView

// Components
import SearchHeader from "../components/headers/SearchHeader"
import SearchModal from "../components/modals/SearchModal"
import DescriptionCard from "../components/MapDescription"

// Constants
import Layout from "../constants/Layout"
import Colors from "../constants/Colors"

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
      restaurantMarker: {
        latitude: 41.397465,
        longitude: 2.188411,
      },
      userMarker: {
        latitude: 0,
        longitude: 0
      },
      showDescription: false,
      modalVisible: false
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: <SearchHeader navigation={navigation} />
    }
  }

  componentDidMount() {
    this._addModalSub(this.props.navigation)
    this._getCurrentLocation()

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

  _onRegionChange = mapCenter => {
    this.setState({ mapCenter })
  }

  render() {
    const { mapCenter, restaurantMarker, userMarker, showDescription } = this.state,
      { latitude, longitude } = mapCenter,
      { navigation } = this.props

    console.log("MAP CENTER:\n", mapCenter, "USER MARKER:\n", userMarker)

    let modalVisible = navigation.getParam("modalVisible") || false

    return (
      latitude && longitude ?
        <View style={styles.mapContainer}>

          <SearchModal
            navigation={navigation}
            _onPress={this._hideModal}
            modalVisible={modalVisible} />

          <MapView
            style={styles.map}
            initialRegion={mapCenter}
            onRegionChange={this._onRegionChange}>

            <Marker
              coordinate={restaurantMarker}
              pinColor={Colors.redible.main}
              onPress={() => this.setState({ showDescription: true })}
            />

            <Marker
              coordinate={userMarker}
              pinColor={Colors.redible.raspberry}
              onPress={() => { }}
            />

          </MapView>
          {
            showDescription ?
              <DescriptionCard navigation={navigation} _onPress={() => this.setState({ showDescription: false })} />
              :
              null
          }
        </View>
        :
        null
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
  },
})
