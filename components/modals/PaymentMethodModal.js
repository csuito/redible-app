import React, { Component } from "react"
import { Platform, Modal, StyleSheet, View, TouchableOpacity } from "react-native"
import { Icon } from "expo"

// Components
import Button from "../Button"

// Constants
import Layout from "../../constants/Layout"
import Colors from "../../constants/Colors"

/**
 * Renders Modal to edit/add payment a method
 */
export default class PaymentMethodModal extends Component {
  render() {
    const prefix = Platform.OS === "ios" ? "ios" : "md",
      { modalVisible, _onPress, paymentData } = this.props

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
            <TouchableOpacity style={styles.closeButton} onPress={_onPress}>
              <Icon.Ionicons
                name={`${prefix}-close-circle`}
                color={Colors.redible.raspberry}
                size={36}
              />
            </TouchableOpacity>
            <View style={styles.contentContainer}>

              <View style={styles.buttonsContainer}>
                <Button
                  iconName={"close"}
                  text={"Cancel"}
                  containerStyles={{ flexDirection: "row", backgroundColor: Colors.redible.raspberry }}
                  textStyles={{ fontSize: Layout.fontSize.mainContent, color: Colors.basic.white }}
                  _onPress={_onPress}
                />
                <Button
                  iconName={"checkmark"}
                  text={"Apply"}
                  containerStyles={{ flexDirection: "row", backgroundColor: Colors.redible.main }}
                  textStyles={{ fontSize: Layout.fontSize.mainContent, color: Colors.basic.white }}
                  _onPress={_onPress}
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
    flex: 1
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 30
  }
})