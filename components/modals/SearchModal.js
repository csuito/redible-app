import React, { Component } from "react"
import { Platform, Modal, StyleSheet, View, Text, TouchableOpacity } from "react-native"
import { Icon } from "expo"

// Components
import FiltersList from "../Filters"
import Button from "../Button"

// Constants
import Colors from "../../constants/Colors"
import Layout from "../../constants/Layout"

export default class SearchModal extends Component {
  render() {
    const prefix = Platform.OS === "ios" ? "ios" : "md",
      { modalVisible, _onPress } = this.props

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
            <FiltersList _onPress={_onPress} />
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
})