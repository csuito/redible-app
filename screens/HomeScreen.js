import React, { Component } from "react"
import { ScrollView, StyleSheet, View, Text } from "react-native"

// Components
import SearchHeader from "../components/headers/SearchHeader"
import SearchModal from "../components/modals/SearchModal"
import RestaurantBanner from "../components/RestaurantBanner"
import DishCard from "../components/DishCard"

// Constants
import Layout from "../constants/Layout"
import Colors from "../constants/Colors"

export default class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: <SearchHeader navigation={navigation} />
    }
  }

  componentDidMount() {
    this._addModalSub(this.props.navigation)
  }

  /**
	* Adds modal subscription
	*  @param {Object} navigation
	*/
  _addModalSub = navigation => {
    modalSub = navigation.addListener("willBlur", () => {
      navigation.setParams({ modalVisible: false })
    })
  }

  _hideModal = () => {
    this.props.navigation.setParams({ modalVisible: false })
  }

  _buildFeaturedList = () => {
    const types = ["Featured", "Top rated", "Healthy"]
    let featured = []
    for (let i = 0; i < 3; i++) {
      featured.push(<RestaurantBanner key={i} type={types[i]} />)
    }
    return featured
  }

  _buildDishList = () => {
    let dishList = []
    for (let i = 0; i <= 8; i++) {
      dishList.push(<DishCard key={i} />)
    }
    return dishList
  }

  render() {
    const dishList = this._buildDishList(),
      featuredList = this._buildFeaturedList(),
      { navigation } = this.props

    let modalVisible = navigation.getParam("modalVisible") || false

    return (
      <View style={styles.container}>

        <SearchModal
          navigation={navigation}
          _onPress={this._hideModal}
          modalVisible={modalVisible} />

        <ScrollView style={styles.contentContainer}>
          <View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              {
                featuredList.map(restaurant => restaurant)
              }
            </ScrollView>
            <Text style={styles.subtitle}>Top picks</Text>
            {
              dishList.map(dish => dish)
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
  subtitle: {
    marginBottom: 15,
    textAlign: "center",
    color: Colors.redible.accent,
    fontSize: Layout.fontSize.contentTitle
  },
  filtersContainer: {
    marginBottom: 15,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 8,
    padding: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: Colors.redible.cream
  },
})
