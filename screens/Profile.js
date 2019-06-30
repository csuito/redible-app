import React, { Component } from "react"
import { StyleSheet, View } from "react-native"

// Components
import Login from "../components/Login"
import AccountDetails from "../components/AccountDetails"

// Constants
import Colors from "../constants/Colors"

/**
 * Renders user profile screen or login screen for not logged users
 */
export default class ProfileScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedUser: true
    }
  }

  static navigationOptions = {
    header: null
  }

  render() {
    const { isLoggedUser } = this.state

    return (
      <View style={styles.container}>
        {
          !isLoggedUser ?
            <Login />
            :
            <AccountDetails />
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.basic.white,
  }
})