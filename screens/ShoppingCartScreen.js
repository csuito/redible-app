import React, { Component } from "react"
import { Platform, StyleSheet, View, ScrollView, Text } from "react-native"
import { Icon } from "expo"

// Components
import WithBackIconHeader from "../components/headers/WithBackIconHeader"
import Button from "../components/Button"

// Constants
import Colors from "../constants/Colors"
import Layout from "../constants/Layout"

/**
 * Renders shopping cart items before checkout
 */
export default class ShoppingCartScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: <WithBackIconHeader text={"Shopping Cart"} iconName={"arrow-back"} color={Colors.basic.white} navigation={navigation} />
    }
  }

  _navigate = (route, params) => {
    this.props.navigation.navigate(route, params)
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scroll}>
          <View style={styles.titleContainer}>
            <Text style={{ ...styles.title, color: Colors.basic.black }}>Ordering from</Text>
            <Text style={{ ...styles.title, color: Colors.redible.accent }}>Forastera Restaurant</Text>
          </View>

          <View style={styles.contentContainer}>


            <View style={styles.buttonsContainer}>
              <Button
                text={"Continue shopping"}
                containerStyles={{ ...styles.button, marginRight: 7.5, backgroundColor: Colors.redible.star }}
                textStyles={{ fontSize: Layout.fontSize.mediumText, color: Colors.basic.white }}
                _onPress={() => { this._navigate("Details") }}
              />
              <Button
                text={"Checkout"}
                containerStyles={{ ...styles.button, marginLeft: 7.5, backgroundColor: Colors.redible.main }}
                textStyles={{ fontSize: Layout.fontSize.mediumText, color: Colors.basic.white }}
                _onPress={() => { this._navigate("Summary") }}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.basic.white
  },
  scroll: {
    flex: 1
  },
  titleContainer: {
    marginTop: 30
  },
  title: {
    fontSize: Layout.fontSize.contentTitle,
    textAlign: "center"
  },
  contentContainer: {
    marginLeft: 15,
    marginRight: 15
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  button: {
    flex: 1,
    marginTop: 30
  }
})
