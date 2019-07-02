import React, { Component } from "react"
import { Platform, Modal, StyleSheet, View, Text, TouchableOpacity, Image } from "react-native"
import { Icon } from "expo"
import * as Animatable from "react-native-animatable"

// Components
import BasketItem from "../BasketItem"
import Button from "../Button"

// Constants
import Layout from "../../constants/Layout"
import Colors from "../../constants/Colors"
import Facts from "../../constants/Data/FoodFacts"

/**
 * Renders Popup showing users earned points after purchase
 */
export default class BasketModal extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const prefix = Platform.OS === "ios" ? "ios" : "md",
      { modalVisible, _close, _goToCheckout } = this.props

    return (
      modalVisible ?
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          hardwareAccelerated={true}
          onRequestClose={() => { }}
        >
          <View style={styles.container}>
            <TouchableOpacity style={styles.closeButton} onPress={_close}>
              <Icon.Ionicons
                name={`${prefix}-close-circle`}
                color={Colors.redible.raspberry}
                size={36}
              />
            </TouchableOpacity>

            <View style={styles.contentContainer}>
              <Text style={styles.title}>My basket</Text>

              <Text style={{ ...styles.smallText, marginBottom: 5 }}>Did you know?</Text>
              <Text style={{ ...styles.smallText, marginBottom: 30 }}>{Facts[Math.floor(Math.random() * Facts.length)]}</Text>

              <View style={styles.listContainer}>
                <BasketItem header />
                <BasketItem name={"Paella Valenciana"} quantity={2} price={3.75} />
                <BasketItem name={"Total"} price={"7.50"} />
              </View>

              <View style={styles.buttonsContainer}>
                <Button
                  text={"Checkout"}
                  containerStyles={{ ...styles.button, marginLeft: 30, marginRight: 30, backgroundColor: Colors.redible.main }}
                  textStyles={{ fontSize: Layout.fontSize.mediumText, color: Colors.basic.white }}
                  _onPress={_goToCheckout}
                />
              </View>
            </View>
          </View>
        </Modal>
        :
        null
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.searchModal,
    padding: 30
  },
  closeButton: {
    alignSelf: "flex-end",
    marginBottom: 30
  },
  contentContainer: {
    padding: 15,
    backgroundColor: Colors.redible.babyPowder,
    borderRadius: 8,
    shadowColor: Colors.shadow,
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 2,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    fontSize: Layout.fontSize.title
  },
  smallText: {
    textAlign: "center",
    fontSize: Layout.fontSize.mediumText,
    color: Colors.redible.accent,
    fontStyle: "italic",
  },
  buttonsContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  button: {
    flex: 1,
    marginTop: 30
  }
})