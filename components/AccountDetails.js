import React, { Component } from "react"
import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import { Icon } from "expo"
import * as Animatable from "react-native-animatable"

// Constants
import Colors from "../constants/Colors"
import Layout from "../constants/Layout"

/**
 * Renders Account Details on Profile Screen
 */
export default class AccountDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const nextLevel = 1750,
      totalPoints = 1375 + 285,
      width = `${(totalPoints / nextLevel) * 100}%`,
      progress = {
        from: {
          width: "0%"
        },
        to: {
          width
        }
      }

    return (
      <View style={styles.profileContainer}>
        <Text style={styles.title}>My Account</Text>

        <View style={styles.userInformation}>
          <View style={styles.accountContainer}>
            <Text style={styles.name}>{`Vanessa`}</Text>
            <Text style={styles.account}>{`vanessa.higasi@bts.tech`}</Text>
          </View>
          <View style={{ alignItems: "center", justifyContent: "center", height: 100, width: 100, borderRadius: 50, backgroundColor: Colors.redible.star }}>
            <Text style={{ textAlign: "center", color: Colors.basic.white, fontWeight: "bold", fontSize: Layout.fontSize.title }}>{totalPoints}</Text>
            <Text style={{ textAlign: "center", color: Colors.basic.white, fontWeight: "bold", fontSize: Layout.fontSize.title }}>points</Text>
          </View>
        </View>

        <View style={styles.rankingContainer}>
          <Text style={styles.bold}>Level 6: <Text style={styles.level}>Food saving Master</Text></Text>

          <View style={styles.barContainer}>
            <Animatable.View delay={300} animation={progress} duration={800} style={{ ...styles.bar, width: "0%" }}></Animatable.View>
          </View>

          <View style={{ flexDirection: "row" }}>
            <View style={styles.contributionItem}>
              <Icon.Ionicons
                name={"md-trending-up"}
                size={Layout.fontSize.largeIcon}
                color={Colors.redible.lavenderGray}
              />
              <Text style={styles.smallText}><Text style={{ fontWeight: "bold" }}>{nextLevel - totalPoints}</Text> points for next level</Text>
            </View>
            <View style={{ ...styles.contributionItem, borderLeftColor: Colors.redible.lavenderGray, borderLeftWidth: 2 }}>
              <Icon.Ionicons
                name={"md-globe"}
                size={Layout.fontSize.largeIcon}
                color={Colors.redible.lavenderGray}
              />
              <Text style={styles.smallText}><Text style={{ fontWeight: "bold" }}>17</Text> meals saved</Text>
            </View>
          </View>

          <View style={styles.list}>
            <TouchableOpacity style={{ flex: 1, flexDirection: "row", paddingTop: 25, paddingBottom: 25, alignItems: "center" }}>
              <Icon.Ionicons
                name={"md-settings"}
                color={Colors.redible.gray}
                size={Layout.fontSize.mainContent}
              />
              <Text style={{ marginLeft: 15, fontSize: Layout.fontSize.mainContent, color: Colors.redible.gray }}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, flexDirection: "row", paddingTop: 25, paddingBottom: 25, alignItems: "center" }}>
              <Icon.Ionicons
                name={"md-list-box"}
                color={Colors.redible.gray}
                size={Layout.fontSize.mainContent}
              />
              <Text style={{ marginLeft: 15, fontSize: Layout.fontSize.mainContent, color: Colors.redible.gray }}>Order history</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, flexDirection: "row", paddingTop: 25, paddingBottom: 25, alignItems: "center" }}>
              <Icon.Ionicons
                name={"md-log-out"}
                color={Colors.redible.gray}
                size={Layout.fontSize.mainContent}
              />
              <Text style={{ marginLeft: 15, fontSize: Layout.fontSize.mainContent, color: Colors.redible.gray }}>Logout</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    backgroundColor: Colors.basic.white,
    paddingTop: Layout.androidHeaderHeight + 15,
    paddingLeft: 30,
    paddingRight: 30
  },
  userInformation: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 30
  },
  title: {
    fontSize: Layout.fontSize.title,
    fontWeight: "bold"
  },
  name: {
    color: Colors.basic.black,
    fontSize: Layout.fontSize.mainContent,
    marginBottom: 10
  },
  account: {
    fontSize: Layout.fontSize.mediumText,
    color: Colors.redible.lavenderGray
  },
  rankingContainer: {
    width: "100%",
    marginTop: 30
  },
  level: {
    fontSize: Layout.fontSize.mainContent,
    color: Colors.basic.black,
    fontWeight: "normal",
  },
  bold: {
    fontWeight: "bold",
    fontSize: Layout.fontSize.mainContent,
    color: Colors.redible.star
  },
  barContainer: {
    marginTop: 20,
    marginBottom: 20,
    height: 10,
    width: "100%",
    backgroundColor: Colors.redible.cream,
    borderRadius: 2.5
  },
  bar: {
    height: 10,
    backgroundColor: Colors.redible.main,
    borderRadius: 2.5,
  },
  smallText: {
    fontSize: Layout.fontSize.mediumText,
    color: Colors.redible.gray
  },
  contributionItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10
  },
  list: {
    marginTop: 100
  }
})