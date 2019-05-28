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
    this.state = {}
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: null // <WithBackIconHeader text={"Ranking"} iconName={"arrow-back"} color={Colors.basic.white} navigation={navigation} />
    }
  }

  _buildRankingList = () => {
    const usersList = ["Monica", "Viktor", "Vanessa", "Pedro", "Alessandro", "Tue", "Aycha", "Stefano"],
      gender = ["female", "male", "female", "male", "male", "female", "female", "male"],
      points = [3850, 2900, 2850, 2525, 2010, 1765, 1600, 1250]

    let topRanked = []
    for (let i = 0; i < 8; i++) {
      topRanked.push(<RankingCard key={i} rank={i} name={usersList[i]} gender={gender[i]} points={points[i]} />)
    }
    return topRanked.map(user => user)
  }

  render() {
    const ranking = this._buildRankingList(),
      prefix = Platform.OS === "ios" ? "ios" : "md"

    return (
      <View style={styles.container}>
        <ScrollView style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <Icon.Ionicons
              name={`${prefix}-trending-up`}
              size={72}
              color={Colors.redible.main}
            />
            <Text style={styles.title}>Redible's Top Food Savers</Text>
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
    marginTop: 30,
    marginBottom: 30
  },
  title: {
    fontSize: Layout.fontSize.title,
    color: Colors.redible.accent,
    textAlign: "center"
  },
  listContainer: {
    marginTop: 15,
    marginBottom: 15
  }
})