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
        <View style={{ position: "absolute", height: 250, backgroundColor: Colors.redible.main, width: Layout.window.width }}></View>
        <Text style={styles.title}>My Account</Text>

        <View style={styles.lifted}>
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
          </View>

        </View>
        <View style={styles.list}>
          <TouchableOpacity style={styles.listItem}>
            <Icon.Ionicons
              name={"md-settings"}
              color={Colors.redible.gray}
              size={Layout.fontSize.mediumText}
            />
            <Text style={styles.listItemText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ ...styles.listItem, ...styles.middleItem }}>
            <Icon.Ionicons
              name={"md-list-box"}
              color={Colors.redible.gray}
              size={Layout.fontSize.mediumText}
            />
            <Text style={styles.listItemText}>Order history</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem}>
            <Icon.Ionicons
              name={"md-log-out"}
              color={Colors.redible.gray}
              size={Layout.fontSize.mediumText}
            />
            <Text style={styles.listItemText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    backgroundColor: Colors.redible.babyPowder,
    paddingTop: Layout.androidHeaderHeight + 15,
    position: "relative"
  },
  lifted: {
    backgroundColor: Colors.basic.white,
    marginTop: 30,
    padding: 20,
    overflow: "hidden",
    shadowColor: Colors.shadow,
    shadowOffset: { height: 5, width: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
    borderRadius: 8,
    marginLeft: 30,
    marginRight: 30
  },
  userInformation: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: Layout.fontSize.title,
    fontWeight: "bold",
    color: Colors.basic.white,
    marginLeft: 30
  },
  name: {
    color: Colors.basic.black,
    fontSize: Layout.fontSize.mainContent,
    marginBottom: 10
  },
  account: {
    fontSize: Layout.fontSize.mediumText,
    color: Colors.redible.accent
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
    color: Colors.redible.gray,
    textAlign: "center"
  },
  contributionItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 5
  },
  list: {
    marginTop: 100,
    backgroundColor: Colors.basic.white,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderTopColor: Colors.redible.lavenderGray,
    borderBottomColor: Colors.redible.lavenderGray
  },
  listItem: {
    flex: 1,
    flexDirection: "row",
    padding: 30,
    alignItems: "center"
  },
  listItemText: {
    marginLeft: 15,
    fontSize: Layout.fontSize.mediumText,
    color: Colors.redible.gray
  }
})