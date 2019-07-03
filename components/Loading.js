import React, { Component } from "react"
import { StyleSheet, View, Text, Image } from "react-native"
import * as Animatable from "react-native-animatable"

// Constants
import Colors from "../constants/Colors"
import Layout from "../constants/Layout"

/**
 * Renders loading component
 * @param {Object} props 
 */
export default class Loading extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dots: 0
    }
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState(({ dots }) => {
        return { dots: (dots + 1) % 3 }
      })
    }, 400)
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={require("../assets/images/logo.png")} />
        <Text style={{ fontSize: 74, color: Colors.basic.white }}>{new Array(this.state.dots + 2).join(".")}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.redible.main,
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    height: 100,
    width: 100,
    resizeMode: "contain",
  }
})