import React, { Component } from "react"
import { Platform, StyleSheet, View, ScrollView, Text, Image } from "react-native"
import { Icon } from "expo"

// Components
import WithBackIconHeader from "../components/headers/WithBackIconHeader"
import RankingCard from "../components/Ranking"

// Constants
import Colors from "../constants/Colors"
import Layout from "../constants/Layout"

/**
 * Renders top ranked food savers
 */
export default class RankingScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeDrawer: -1
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: null // <WithBackIconHeader text={"Ranking"} iconName={"arrow-back"} color={Colors.basic.white} navigation={navigation} />
    }
  }

  _buildRankingList = () => {
    const usersList = ["Monica", "Viktor", "Vanessa", "Pedro", "Alessandro", "Tue", "Aycha", "Stefano"],
      points = [3850, 2900, 2750, 2525, 2010, 1765, 1600, 1250]

    let topRanked = []
    for (let i = 0; i < 8; i++) {
      const width = `${(points[i] / points[0]) * 100}%`
      topRanked.push(<RankingCard key={i} rank={i} _onPress={this.openDrawer} name={usersList[i]} points={points[i]} width={width} activeDrawer={this.state.activeDrawer} />)
    }
    return topRanked.map(user => user)
  }

  openDrawer = id => {
    this.setState(prevState => ({
      activeDrawer: prevState.activeDrawer === id ? -1 : id
    }), () => {
      console.log(id, this.state.activeDrawer, typeof id, typeof this.state.activeDrawer)
    })
  }

  render() {
    const ranking = this._buildRankingList(),
      prefix = Platform.OS === "ios" ? "ios" : "md"

    return (
      <View style={styles.container}>
        <ScrollView style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            {/**
            <Icon.Ionicons
              name={`${prefix}-trending-up`}
              size={72}
              color={Colors.redible.main}
            />
             */}
            <Text style={styles.title}>Redible's Top Food Savers</Text>
            <Image source={require("../assets/images/happy.jpg")} style={styles.image} />
          </View>
          <View style={styles.listContainer}>
            {ranking}
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
    paddingTop: 50
  },
  contentContainer: {
    backgroundColor: Colors.basic.white,
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  title: {
    fontSize: Layout.fontSize.title,
    fontWeight: "bold",
    color: Colors.redible.star,
    textAlign: "center"
  },
  image: {
    height: 275,
    width: 275,
    resizeMode: "contain"
  },
  listContainer: {
    marginTop: 15,
    marginBottom: 15
  }
})