import React from "react"
import { Platform, StyleSheet, StatusBar, View, TouchableOpacity } from "react-native"
import { Searchbar } from "react-native-paper"
import { Icon } from 'expo'
import PropTypes from "prop-types"

// Constants
import Layout from "../../constants/Layout"
import Colors from "../../constants/Colors"

/**
 * Search header for Home and Map screens
 * @param {Object} props
 */
const SearchHeader = props => {
  const { navigation, noShadow } = props

  const _showModal = navigation => {
    navigation.setParams({ modalVisible: true })
  }
  const prefix = Platform.OS === "ios" ? "ios" : "md"

  const shadowStyles = !navigation.getParam("noShadow") && !noShadow ? {
    shadowColor: Colors.shadow,
    shadowOffset: { height: 5, width: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5
  } : null

  const searchTerm = navigation.getParam("searchTerm")
  const _onChangeText = navigation.getParam("onChangeText")

  return (
    <View style={{ ...styles.container, ...shadowStyles }}>
      <Searchbar
        placeholder="Search restaurants, cuisines..."
        onChangeText={searchTerm => _onChangeText(searchTerm)}
        value={searchTerm}
        style={styles.searchBar}
        inputStyle={styles.searchText}
      />
      <TouchableOpacity style={styles.iconContainer} onPress={() => _showModal(navigation)}>
        <Icon.Ionicons
          name={`${prefix}-options`}
          size={28}
          color={Colors.basic.white} />
      </TouchableOpacity>
    </View>
  )
}

SearchHeader.propTypes = {
  navigation: PropTypes.object.isRequired,
  noShadow: PropTypes.bool
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingTop: 15 + StatusBar.currentHeight,
    paddingLeft: 15,
    paddingRight: 15,
    height: Layout.androidHeaderHeight + StatusBar.currentHeight,
    backgroundColor: Colors.redible.main,
  },
  searchBar: {
    flex: 1,
    padding: 0,
    height: "70%",
    borderRadius: 25
  },
  searchText: {
    fontSize: 16,
    fontFamily: "open-sans",
    padding: 0
  },
  iconContainer: {
    flexDirection: "row",
    height: "70%",
    marginLeft: 15,
    alignItems: "center",
    justifyContent: "flex-end"
  }
})

export default SearchHeader