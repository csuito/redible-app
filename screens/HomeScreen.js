import React from "react"
import {
  Platform,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from "react-native"
import { Icon } from "expo"

// Components
import SearchHeader from "../components/headers/SearchHeader"
import RestaurantBanner from "../components/RestaurantBanner"
import RestaurantCard from "../components/RestaurantCard"
import FiltersList from "../components/Filters"

// Constants
import Layout from "../constants/Layout"
import Colors from "../constants/Colors"

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filtersVisible: false
    }
  }
  static navigationOptions = {
    header: <SearchHeader />
  }

  _buildFeaturedList = () => {
    let featured = []
    for (let i = 0; i < 3; i++) {
      featured.push(<RestaurantBanner key={i} />)
    }
    return featured
  }

  _buildRestaurantList = () => {
    let restaurantList = []
    for (let i = 0; i <= 8; i++) {
      restaurantList.push(<RestaurantCard key={i} />)
    }
    return restaurantList
  }

  render() {
    const restaurantList = this._buildRestaurantList(),
      featuredList = this._buildFeaturedList(),
      { filtersVisible } = this.state

    return (
      <View style={styles.container}>
        <ScrollView style={styles.contentContainer}>
          <View>
            <ScrollView horizontal={true}>
              {
                featuredList.map(restaurant => restaurant)
              }
            </ScrollView>
            <TouchableOpacity style={styles.filterButton} onPress={() => this.setState({ filtersVisible: !filtersVisible })}>
              <Icon.Ionicons
                name={"md-funnel"}
                size={Layout.fontSize.contentTitle}
                color={Colors.basic.white} />
              <Text style={styles.filterButtonText}>{` Top rated`}</Text>
            </TouchableOpacity>
            {
              filtersVisible ?
                <View style={styles.filtersContainer}>
                  <FiltersList />
                </View> :
                null
            }
            {
              restaurantList.map(restaurant => restaurant)
            }
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.basic.white,
  },
  contentContainer: {
    backgroundColor: Colors.basic.white
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 7.5,
    shadowColor: "rgb(0, 0, 0)",
    shadowOffset: { height: 5, width: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
    backgroundColor: Colors.redible.raspberry,
    borderRadius: 25,
    marginLeft: Layout.window.width / 4,
    marginRight: Layout.window.width / 4,
    marginBottom: 15
  },
  filterButtonText: {
    fontSize: Layout.fontSize.mainContent,
    color: Colors.basic.white,
  },
  filtersContainer: {
    marginBottom: 15,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 8,
    padding: 20,
    backgroundColor: Colors.redible.cream
  },
})
