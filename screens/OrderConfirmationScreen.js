import React, { Component } from "react"
import { StyleSheet, View } from "react-native"

// Components
import WithBackIconHeader from "../components/headers/WithBackIconHeader"
import PointsEarnedPopup from "../components/modals/PointsEarnedPopup"
import OrderConfirmed from "../components/OrderConfirmed"
import WaitConfirmation from "../components/WaitConfirmation"

// Constants
import Colors from "../constants/Colors"

/**
 * Renders order confirmation screen
 */
export default class OrderConfirmationScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isConfirmed: false,
      modalVisible: false,
      restaurantData: {}
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: <WithBackIconHeader _onPress={() => navigation.navigate("Home")} iconName={"home"} text={"Confirmation"} color={Colors.basic.white} navigation={navigation} />
    }
  }

  async componentDidMount() {
    const restaurantData = this.props.navigation.getParam("restaurantData")

    await setTimeout(() => {
      this.setState({ isConfirmed: true, restaurantData }, () => {
        this.props.navigation.setParams({ noShadow: false })
      })
    }, 2500)

    setTimeout(() => {
      this.setState({ modalVisible: true })
    }, 3000)
  }

  render() {
    const { isConfirmed, modalVisible, restaurantData } = this.state

    return (
      <View style={styles.container}>
        {
          isConfirmed && modalVisible ?
            <PointsEarnedPopup
              modalVisible={modalVisible}
              _onPress={() => { this.setState({ modalVisible: false }) }}
            />
            :
            null
        }
        {
          isConfirmed ?
            <OrderConfirmed navigation={this.props.navigation} restaurantData={restaurantData} />
            :
            <WaitConfirmation />
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.basic.white
  }
})