import React, { Component } from "react"
import { Platform, StyleSheet, View, ScrollView, Text, Image } from "react-native"
import { Icon } from "expo"

// Components
import WithBackIconHeader from "../components/headers/WithBackIconHeader"
import RankingCard from "../components/Ranking"

// Constants
import Colors from "../constants/Colors"
import Layout from "../constants/Layout"
import Users from "../constants/Data/Users"

/**
 * Renders top ranked food savers
 */
export default class RankingScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeDrawer: -1,
      users: Users
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: null // <WithBackIconHeader text={"Ranking"} iconName={"arrow-back"} color={Colors.basic.white} navigation={navigation} />
    }
  }

  _buildRankingList = () => {
    let { users } = this.state

    users = users.sort((a, b) => {
      return a.points < b.points
    })

    let topRanked = []
    for (let i = 0; i < users.length; i++) {
      topRanked.push(<RankingCard key={i} rank={i} _onPress={this.openDrawer} user={users[i]} activeDrawer={this.state.activeDrawer} />)
    }
    return topRanked.map(user => user)
  }

  openDrawer = id => {
    this.setState(prevState => ({
      activeDrawer: prevState.activeDrawer === id ? -1 : id
    }))
  }

  render() {
    const ranking = this._buildRankingList()

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