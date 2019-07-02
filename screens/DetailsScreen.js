import React, { Component } from "react"
import { Platform, StyleSheet, View, ScrollView, Text } from "react-native"
import { MapView, Icon } from "expo"
import { PacmanIndicator } from "react-native-indicators"
const { Marker, Polyline } = MapView

// Constants
import Colors from "../constants/Colors"
import Layout from "../constants/Layout"

// Helpers
import { decode } from "../helpers/decodeDirections"

// Components
import BasketModal from "../components/modals/BasketModal"
import RestaurantBanner from "../components/RestaurantBanner"
import DishCard from "../components/DishCard"
import WithBackIconHeader from "../components/headers/WithBackIconHeader"
import CartButton from "../components/CartButton"
import AddDish from "../components/AddDish"

// Services
import DirectionsService from "../services/directions"

/**
 * Details Screen for restaurants or dishes
 */
export default class DetailsScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      mapCenter: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      },
      restaurantMarker: {},
      restaurantData: {},
      userLocation: {},
      directions: [],
      duration: "",
      quantity: 1,
      showAddToCart: false,
      showSuccessMessage: false,
      loading: true,
      rating: 0,
      error: false,
      animation: "fadeInUp",
      showModal: false
    }
    this.directionsService = new DirectionsService()
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: <WithBackIconHeader text={"Restaurant"} iconName={"arrow-back"} color={Colors.basic.white} navigation={navigation} />
    }
  }

  componentDidMount() {
    this._getDirections()
  }

  _getDirections = async () => {
    const
      userLocation = await this.props.navigation.getParam("userLocation"),
      restaurantData = await this.props.navigation.getParam("restaurantData"),
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

      const durationTime = parseInt(duration.substring(0, 2).trim()),
        mapZoom = durationTime >= 40 ? 0.03 : durationTime >= 30 ? 0.025 : durationTime >= 20 ? 0.02 : 0.01

      const mapCenter = {
        latitude: (userLocation.latitude + restaurantMarker.latitude) / 2,
        longitude: (userLocation.longitude + restaurantMarker.longitude) / 2,
        latitudeDelta: mapZoom,
        longitudeDelta: mapZoom
      }

      this.setState({ userLocation, directions, duration, restaurantData, mapCenter, restaurantMarker, loading: false }, () => {
        this.props.navigation.setParams({ noShadow: false })
      })
    } catch (err) {
      this.setState({ error: true })
    }
  }

  _buildDishList = () => {
    let dishList = []
    for (let i = 0; i <= 5; i++) {
      dishList.push(<DishCard key={i} _onPress={this._resetState} />)
    }
    return dishList.map(dish => dish)
  }

  _resetState = () => {
    this.setState({ showAddToCart: true, quantity: 1, showSuccessMessage: false, animation: "fadeInUp" })
  }

  _hideAddToBasket = (success = false) => {
    if (success) {
      this.setState({ showSuccessMessage: true }, () => {
        setTimeout(() => {
          this.setState({ animation: "fadeOutDown" })
        }, 1800)
      })
    } else {
      this.setState({ showAddToCart: false })
    }
  }

  _changeQuantity = type => {
    if (type === "add") return this.setState(prevState => ({ quantity: prevState.quantity + 1 }))
    else if (type === "remove") return this.setState(prevState => ({ quantity: prevState.quantity - 1 }))
  }

  _goToCheckout = () => {
    this.setState({ showModal: false }, () => {
      this.props.navigation.navigate("Summary")
    })
  }

  render() {
    const dishList = this._buildDishList(),
      { showModal, mapCenter, restaurantData, restaurantMarker, quantity, directions, duration, showAddToCart, userLocation, showSuccessMessage, loading, animation } = this.state,
      prefix = Platform.OS === "ios" ? "ios" : "md"

    return (
      !loading ?
        <View style={styles.container}>

          <BasketModal
            modalVisible={showModal}
            _close={() => this.setState({ showModal: false })}
            _goToCheckout={this._goToCheckout}
          />

          <CartButton _onPress={() => this.setState({ showModal: true })} prefix={prefix} />
          <ScrollView style={styles.contentContainer}>
            {
              restaurantData ?
                <RestaurantBanner restaurantData={restaurantData} /> :
                null
            }

            <View style={styles.mapContainer}>
              {
                duration && mapCenter.latitude && mapCenter.longitude && directions ?
                  <View style={styles.durationContainer}>
                    <Icon.Ionicons
                      name={`md-walk`}
                      color={Colors.basic.black}
                      size={Layout.fontSize.mainContent}
                    />
                    <Text style={styles.durationText}>{` ${duration}`}</Text>
                  </View>
                  :
                  null
              }
              {
                mapCenter.latitude && mapCenter.longitude && directions ?
                  <MapView
                    style={styles.map}
                    initialRegion={mapCenter}
                    onRegionChange={() => null}>

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

            <Text style={styles.subtitle}>Today's Offers</Text>
            {dishList}
          </ScrollView>
          {
            showAddToCart ?
              <AddDish animation={animation} quantity={quantity} dishAdded={showSuccessMessage} _hideAddToBasket={this._hideAddToBasket} _changeQuantity={this._changeQuantity} />
              :
              null
          }
        </View>
        :
        <View style={styles.loading}>
          <PacmanIndicator size={75} color={Colors.basic.white} />
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.basic.white,
    position: "relative"
  },
  mapContainer: {
    width: Layout.window.width - 30,
    height: Layout.window.height / 3.25,
    margin: 15,
    borderRadius: 8,
    overflow: "hidden",
    position: "relative"
  },
  map: {
    flex: 1,
  },
  durationContainer: {
    position: "absolute",
    zIndex: 1000,
    right: 5,
    bottom: 5,
    backgroundColor: Colors.searchModal,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10
  },
  durationText: {
    fontSize: Layout.fontSize.mainContent
  },
  subtitle: {
    marginBottom: 15,
    textAlign: "center",
    color: Colors.basic.black,
    fontWeight: "bold",
    fontSize: Layout.fontSize.mainContent,
  },
  loading: {
    height: Layout.window.height,
    width: Layout.window.width,
    backgroundColor: Colors.redible.main
  }
})
