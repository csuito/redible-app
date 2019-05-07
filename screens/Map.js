import React, { Component } from "react"
import { StyleSheet, View } from "react-native"
import { MapView } from "expo"

// Components
import SearchHeader from "../components/headers/SearchHeader"

export default class MapScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mapCenter: {
        latitude: 41.397465,
        longitude: 2.188411,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      restaurantMarker: {
        latitude: 41.397465,
        longitude: 2.188411,
      }
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: <SearchHeader navigation={navigation} />
    }
  }

  _onRegionChange = mapCenter => {
    this.setState({ mapCenter })
  }

  render() {
    const { mapCenter, restaurantMarker } = this.state

    return (
      mapCenter ?
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={mapCenter}
            onRegionChange={this._onRegionChange}>
            <MapView.Marker
              coordinate={restaurantMarker}
              title={"Forastera Restaurant"}
            />
          </MapView>
        </View>
        :
        null
    )
  }
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  }
})
