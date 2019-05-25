import React, { Component } from "react"
import { Platform, StyleSheet, View, ScrollView, Text } from "react-native"
import { MapView, Icon } from "expo"
const { Marker } = MapView,
  { Polyline } = MapView

// Constants
import Colors from "../constants/Colors"
import Layout from "../constants/Layout"

// Helpers
import { decode } from "../helpers/decodeDirections"

// Components
import RestaurantBanner from "../components/RestaurantBanner"
import DishCard from "../components/DishCard"
import WithBackIconHeader from "../components/headers/WithBackIconHeader"
import Button from "../components/Button"
import CartButton from "../components/CartButton"

// Services
import RestaurantService from "../services/restaurant"
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
        latitude: 41.397465,
        longitude: 2.188411,
        latitudeDelta: 0.0225,
        longitudeDelta: 0.0225,
      },
      restaurantMarker: {
        latitude: 41.397465,
        longitude: 2.188411,
      },
      directions: [],
      quantity: 1,
      showAddToCart: false
    }
    this.restaurantService = new RestaurantService()
    this.directionsService = new DirectionsService()
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: <WithBackIconHeader text={"Restaurant"} iconName={"arrow-back"} color={Colors.basic.white} navigation={navigation} />
    }
  }

  componentDidMount() {
    this._getRestaurant()
    this._getDirections()
  }

  _getRestaurant = async () => {
    const response = await this.restaurantService.getRestaurantById("5ce3da166f52243cfd2a2bb1")
    console.log("RESTAURANT: \n", response.data)
  }

  _getDirections = async () => {
    try {
      const { data } = await this.directionsService.getDirections("41.39735779999999,2.1885515", "41.3936707,2.1459476")
      console.log("DIRECTIONS: \n", data)
      const points = decode(data.data)
      console.log("DECODED:\n", points)
      let directions = [
        { latitude: 41.39735779999999, longitude: 2.1885515 },
        ...points,
        { latitude: 41.3936707, longitude: 2.1459476 }
      ]
      this.setState({ directions })
    } catch (err) {
      console.log(err)
    }
  }

  _buildDishList = () => {
    let dishList = []
    for (let i = 0; i <= 5; i++) {
      dishList.push(<DishCard key={i} _onPress={() => this.setState({ showAddToCart: true })} />)
    }
    return dishList.map(dish => dish)
  }

  render() {
    const dishList = this._buildDishList(),
      { mapCenter, restaurantMarker, quantity, directions, showAddToCart } = this.state,
      prefix = Platform.OS === "ios" ? "ios" : "md"

    return (
      <View style={styles.container}>

        <CartButton _onPress={() => this.props.navigation.navigate("Cart")} prefix={prefix} />
        <ScrollView style={styles.contentContainer}>
          <RestaurantBanner />

          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              initialRegion={mapCenter}
              onRegionChange={() => null}>

              {
                directions ?
                  <Polyline
                    coordinates={directions}
                    strokeWidth={3}
                    strokeColor={Colors.redible.main}
                  /> :
                  null
              }


              <Marker
                coordinate={restaurantMarker}
                title={"Forastera Restaurant"}
                pinColor={Colors.redible.main} />
            </MapView>
          </View>

          <Text style={styles.subtitle}>Meals</Text>
          {dishList}
        </ScrollView>
        {
          showAddToCart ?
            <View style={styles.addToCart}>
              <Text style={styles.addToText}>{`Quantity `}</Text>
              <Icon.Ionicons
                onPress={() => this.setState(prevState => {
                  return { quantity: prevState.quantity - 1 >= 0 ? prevState.quantity - 1 : 0 }
                })}
                name={`${prefix}-remove-circle-outline`}
                color={Colors.redible.lavenderGray}
                size={Layout.fontSize.largeIcon}
              />
              <Text style={styles.addToText}>{quantity}</Text>
              <Icon.Ionicons
                onPress={() => this.setState(prevState => {
                  return { quantity: prevState.quantity + 1 }
                })}
                name={`${prefix}-add-circle-outline`}
                color={Colors.redible.main}
                size={Layout.fontSize.largeIcon}
              />
              <Button
                iconName={"cart"}
                text={"Add to cart"}
                containerStyles={{ flexDirection: "row", backgroundColor: Colors.redible.main }}
                textStyles={{ fontSize: Layout.fontSize.mediumText, color: Colors.basic.white }}
                _onPress={() => this.setState({ showAddToCart: false, quantity: 1 })} />
            </View>
            :
            null
        }
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
    overflow: "hidden"
  },
  map: {
    flex: 1
  },
  subtitle: {
    marginBottom: 15,
    textAlign: "center",
    color: Colors.redible.accent,
    fontSize: Layout.fontSize.contentTitle
  },
  addToCart: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    position: "absolute",
    width: Layout.window.width,
    bottom: 0,
    backgroundColor: Colors.basic.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    shadowColor: Colors.basic.black,
    shadowOffset: { height: 5, width: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
  },
  addToText: {
    fontSize: Layout.fontSize.mainContent,
    color: Colors.redible.accent
  }
})