import React from "react"
import { StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native"
import { Icon } from "expo"
import PropTypes from "prop-types"
import * as Animatable from "react-native-animatable"

// Constants
import Colors from "../constants/Colors"
import Layout from "../constants/Layout"
import Levels from "../constants/Data/Levels"

/**
 * Renders ranking list item
 * @param {Object} props 
 */
const RankingCard = props => {
  const { rank, user, _onPress, activeDrawer } = props

  let level, levelName, nextLevel, pointsForNext, width
  for (let i = 0; i < Levels.length; i++) {
    if (user.points > Levels[i].from && user.points <= Levels[i].to) {
      level = Levels[i].level
      levelName = Levels[i].levelName
      nextLevel = Levels[i].nextLevel
      pointsForNext = (Levels[i].to + 1) - user.points
      width = `${(user.points / Levels[i + 1].from) * 100}%`
    }
  }

  const progress = {
    from: {
      width: "0%"
    },
    to: {
      width
    }
  }

  return (
    <TouchableWithoutFeedback style={styles.touchable} onPress={() => _onPress(rank)}>
      <View style={styles.container}>

        {/**
        <View style={{ padding: 7.5, alignItems: "center", justifyContent: "center" }}>
          <Image style={styles.image} source={source} />
        </View>
        */}

        <View style={styles.textContainer}>
          <View style={{ flex: 1 }}>
            <Text style={styles.text}>{`${rank + 1}.`} {user.name}</Text>
            <Text style={{ ...styles.pointsText, marginTop: 5 }}><Text style={{ ...styles.pointsText, fontWeight: "bold", color: Colors.redible.star }}>Level{` ${level}`}:</Text>{` ${levelName}`}</Text>
          </View>

          <View style={styles.points}>
            <Icon.Ionicons
              name={"ios-restaurant"}
              color={Colors.redible.silver}
              size={Layout.fontSize.largeIcon}
            />
            <Text style={styles.pointsText}>{`${user.points} points`}</Text>
          </View>
        </View>
        {
          rank === activeDrawer ?
            <View style={styles.drawer}>
              <Animatable.View animation={"slideInDown"} delay={50} duration={200}>
                <Text style={styles.drawerText}>
                  <Icon.Ionicons
                    name={"md-globe"}
                    size={Layout.fontSize.mediumText}
                    color={Colors.redible.lavenderGray}
                  />{` ${user.mealsSaved} meals saved`}</Text>
                <View style={styles.barContainer}>
                  <Animatable.View delay={300} animation={progress} duration={800} style={{ ...styles.bar, width: "0%" }}></Animatable.View>
                </View>
                {
                  nextLevel ?
                    <Text style={styles.drawerText}>
                      <Icon.Ionicons
                        name={"md-trending-up"}
                        size={Layout.fontSize.smallText}
                        color={Colors.redible.lavenderGray}
                      />{` ${pointsForNext} points for ${nextLevel} level `}</Text>
                    :
                    null
                }
              </Animatable.View>
            </View>
            : null
        }
      </View>
    </TouchableWithoutFeedback>
  )
}

RankingCard.propTypes = {
  user: PropTypes.object.isRequired
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.basic.white,
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: Colors.shadow,
    shadowOffset: { height: 3, width: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 3,
    overflow: "hidden",
    marginLeft: 15,
    marginRight: 15,
  },
  barContainer: {
    marginTop: 10,
    height: 10,
    width: "100%",
    backgroundColor: Colors.redible.cream,
    borderRadius: 2.5
  },
  bar: {
    height: 10,
    backgroundColor: Colors.redible.main,
    borderRadius: 2.5
  },
  image: {
    height: 45,
    width: 45,
  },
  textContainer: {
    flex: 1,
    backgroundColor: Colors.basic.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 8,
    shadowColor: Colors.shadow,
    shadowOffset: { height: 3, width: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 3,
    overflow: "hidden",
    padding: 15
  },
  text: {
    fontSize: Layout.fontSize.mainContent,
    color: Colors.basic.black
  },
  points: {
    alignItems: "center",
    justifyContent: "center"
  },
  pointsText: {
    color: Colors.basic.black,
    fontSize: Layout.fontSize.mediumText
  },
  drawer: {
    width: "100%",
    padding: 15
  },
  drawerText: {
    color: Colors.redible.gray,
    fontSize: Layout.fontSize.mediumText,
    marginTop: 7.5
  }
})

export default RankingCard