import React, { Component } from "react"
import { Platform, StyleSheet, View, ScrollView, Text } from "react-native"
import { MapView, Icon } from "expo"
import { PacmanIndicator } from "react-native-indicators"
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
        latitudeDelta: 0.0225,
        longitudeDelta: 0.0225,
      },
      restaurantMarker: {},
      restaurantData: {},
      userLocation: {},
      directions: [],
      quantity: 1,
      showAddToCart: false
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
    const userLocation = await this.props.navigation.getParam("userLocation"),
      restaurantData = await this.props.navigation.getParam("restaurantData"),
      restaurantMarker = { latitude: parseFloat(restaurantData.lat), longitude: parseFloat(restaurantData.lng) },
      originString = `${userLocation.latitude},${userLocation.longitude}`,
      destinationString = `${restaurantData.lat},${restaurantData.lng}`

    try {
      const { data } = await this.directionsService.getDirections(originString, destinationString)
      const points = decode(data.data)
      let directions = [
        userLocation,
        ...points,
        restaurantMarker
      ]

      const mapCenter = { ...this.state.mapCenter, ...restaurantMarker }

      this.setState({ userLocation, directions, restaurantData, mapCenter, restaurantMarker })
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
      { mapCenter, restaurantData, restaurantMarker, quantity, directions, showAddToCart, userLocation } = this.state,
      prefix = Platform.OS === "ios" ? "ios" : "md"

    return (
      <View style={styles.container}>

        <CartButton _onPress={() => this.props.navigation.navigate("Cart")} prefix={prefix} />
        <ScrollView style={styles.contentContainer}>
          <RestaurantBanner data={restaurantData} />

          <View style={styles.mapContainer}>
            {
              mapCenter.latitude && mapCenter.longitude ?
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
                <PacmanIndicator size={48} color={Colors.redible.main} />
            }
          </View>

          <Text style={styles.subtitle}>Meals</Text>
          {dishList}
        </ScrollView>
        {
          showAddToCart ?
            <View style={styles.addToCart}>
              <Text style={styles.dishText}>{`Paella Valenciana`}</Text>
              <View style={styles.row}>
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
                {
                  quantity > 0 ?
                    <Button
                      iconName={"cart"}
                      text={"Add to cart"}
                      containerStyles={{ flexDirection: "row", backgroundColor: Colors.redible.main }}
                      textStyles={{ fontSize: Layout.fontSize.mediumText, color: Colors.basic.white }}
                      _onPress={() => this.setState({ showAddToCart: false, quantity: 1 })} />
                    :
                    <Button
                      iconName={"close"}
                      text={"Cancel"}
                      containerStyles={{ flexDirection: "row", backgroundColor: Colors.redible.raspberry }}
                      textStyles={{ fontSize: Layout.fontSize.mediumText, color: Colors.basic.white }}
                      _onPress={() => this.setState({ showAddToCart: false, quantity: 1 })} />
                }
              </View>
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
    shadowColor: Colors.basic.black,
    backgroundColor: Colors.basic.white,
    shadowOffset: { height: 5, width: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
  },
  row: {
    flex: 1,
    backgroundColor: Colors.basic.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  dishText: {
    fontSize: Layout.fontSize.mainContent,
    color: Colors.redible.accent,
    textAlign: "center",
    marginBottom: 10,
  },
  addToText: {
    fontSize: Layout.fontSize.mainContent,
    color: Colors.redible.accent
  }
})