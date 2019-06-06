import React, { Component } from "react"
import { Platform, Modal, StyleSheet, View, TouchableOpacity } from "react-native"
import { Icon } from "expo"
import PropTypes from "prop-types"

// Components
import FiltersList from "../Filters"

// Constants
import Colors from "../../constants/Colors"

/**
 * Renders SearchModal in Home and Map Screens
 * @param {Object} props 
 */
const SearchModal = props => {
  const prefix = Platform.OS === "ios" ? "ios" : "md",
    { modalVisible, _onPress, _selectFilter, activeId } = props

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
          <FiltersList _onPress={_onPress} activeId={activeId} _selectFilter={_selectFilter} />
        </View>
      </Modal>
      :
      null
  )
}

SearchModal.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  _onPress: PropTypes.func.isRequired,
  _selectFilter: PropTypes.func.isRequired,
  activeId: PropTypes.string
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

export default SearchModal