import React, { Component } from "react"
import { StyleSheet, View, Text } from "react-native"
import { MapView } from "expo"
const { Marker } = MapView

// Components
import SearchHeader from "../components/headers/SearchHeader"
import DescriptionCard from "../components/MapDescription"

// Constants
import Layout from "../constants/Layout"
import Colors from "../constants/Colors"

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
      },
      showDescription: false
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
    const { mapCenter, restaurantMarker, showDescription } = this.state

    return (
      mapCenter ?
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={mapCenter}
            onRegionChange={this._onRegionChange}>
            <Marker
              coordinate={restaurantMarker}
              title={"Forastera Restaurant"}
              pinColor={Colors.redible.main}
              onPress={() => this.setState({ showDescription: true })}
            />
          </MapView>
          {
            showDescription ?
              <DescriptionCard />
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
