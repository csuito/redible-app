import React, { Component } from "react"
import { StyleSheet } from "react-native"
import { MapView } from "expo"

export default class MapScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      region: {
        latitude: 41.397465,
        longitude: 2.188411,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }
    }
    this.mapRef = React.createRef()
  }

  componentDidMount() {
    this.mapRef.animateToRegion(this.state.region)
  }

  _onRegionChange = region => {
    console.log("CHANGING REGION \n", region)
    this.setState({ region })
  }

  render() {
    const { region } = this.state
    return (
      region ?
        <MapView
          ref={this.mapRef}
          style={styles.map}
          initialRegion={region}
          onRegionChange={this._onRegionChange}
        /> :
        null
    )
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  }
})