import React from "react"
import { StyleSheet, View, Text } from "react-native"
import { Icon } from "expo"

// Constants
import Colors from "../constants/Colors"
import Layout from "../constants/Layout"

const RankingCard = props => {
  const { name, rank, gender, points } = props

  return (
    <View>
      <View style={styles.container}>

        {/**
        <View style={{ padding: 7.5, alignItems: "center", justifyContent: "center" }}>
          <Image style={styles.image} source={source} />
        </View>
        */}

        <View style={styles.textContainer}>
          <View style={{ flex: 1 }}>
            <Text style={styles.text}>{`${rank + 1}.`} {name}</Text>
          </View>

          <View style={styles.points}>
            <Icon.Ionicons
              name={"ios-restaurant"}
              color={Colors.redible.silver}
              size={Layout.fontSize.largeIcon}
            />
            <Text style={styles.pointsText}>{`${points} points`}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
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
  image: {
    height: 45,
    width: 45,
  },
  textContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
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
  }
})

export default RankingCard