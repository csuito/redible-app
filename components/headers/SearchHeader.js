import React, { Component } from "react"
import { StyleSheet, StatusBar, View } from "react-native"
import { Searchbar } from "react-native-paper"

// Constants
import Layout from "../../constants/Layout"
import Colors from "../../constants/Colors"

/**
 * Search header for main screen
 */
export default class SearchHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchTerm: ""
    }
  }
  render() {
    const { searchTerm } = this.state
    return (
      <View style={styles.container}>
        <Searchbar
          placeholder="Search Redible"
          onChangeText={searchTerm => this.setState({ searchTerm })}
          value={searchTerm}
          style={styles.searchBar}
          inputStyle={styles.searchText}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 15 + StatusBar.currentHeight,
    paddingLeft: 15,
    paddingRight: 15,
    height: Layout.androidHeaderHeight + StatusBar.currentHeight,
    backgroundColor: Colors.redible.main,
    shadowColor: "rgb(0, 0, 0)",
    shadowOffset: { height: 5, width: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
  },
  searchBar: {
    padding: 0,
    height: "70%"
  },
  searchText: {
    fontSize: 16,
    padding: 0
  }
})