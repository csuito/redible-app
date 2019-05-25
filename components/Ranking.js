import React from "react"
import { Platform, StyleSheet, View, TouchableWithoutFeedback, Text, Image } from "react-native"
import { Icon } from "expo"

// Constants
import Colors from "../constants/Colors"
import Layout from "../constants/Layout"

const RankingCard = props => {
  const { name, rank, gender, points } = props,
    source = gender === "male" ? require(`../assets/images/hip-male-avatar.png`) : require(`../assets/images/purple-female-avatar.png`)

  return (
    <TouchableWithoutFeedback onPress={() => { }}>
      <View style={styles.container}>
        <View style={{ padding: 5 }}>
          <Image style={styles.image} source={source} />
        </View>

        <View style={styles.textContainer}>
          <View style={{ flex: 1 }}>
            <Text style={styles.text}>{`${rank + 1}.`} {name}</Text>
          </View>

          <View style={styles.points}>
            <Icon.Ionicons
              name={`md-globe`}
              color={Colors.redible.green}
              size={Layout.fontSize.largeIcon}
            />
            <Text>{`${points} points`}</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
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
    height: 75,
    width: 75,
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
    fontSize: Layout.fontSize.mainContent
  },
  points: {
    alignItems: "center",
    justifyContent: "center"
  }
})

export default RankingCard