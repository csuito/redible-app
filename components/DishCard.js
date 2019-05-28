import React from "react"
import { StyleSheet, View, Image, Text, Platform, TouchableWithoutFeedback } from "react-native"
import { Icon } from "expo"

// Constants
import Layout from "../constants/Layout"
import Colors from "../constants/Colors"

/**
 * Renders Dish Card on details screen
 */
const DishCard = props => {
  const iconPrefix = Platform.OS === "ios" ? "ios" : "md",
    { _onPress } = props

  return (
    <TouchableWithoutFeedback onPress={() => _onPress ? _onPress() : null}>
      <View style={styles.container}>
        <View>
          <Image style={styles.image} source={require("../assets/images/paella.jpg")} />
        </View>
        <View style={styles.textContainer}>
          <View>
            <Text style={styles.dishName}>
              <Icon.Ionicons
                name={"ios-restaurant"}
                size={Layout.fontSize.contentTitle}
              />{` Paella Valenciana`}</Text>
            <Text style={styles.text}>
              <Icon.Ionicons
                name={`${iconPrefix}-time`}
                size={Layout.fontSize.mainContent}
              />{` Pick-up: 20:00 - 22:30`}
            </Text>
            <Text style={styles.text}>
              <Icon.Ionicons
                name={`${iconPrefix}-pin`}
                size={Layout.fontSize.mainContent}
              />{` Categories...`}</Text>
          </View>
          <View style={styles.footer}>
            <Text style={{ ...styles.price, color: Colors.redible.accent, textDecorationLine: "line-through" }}>€ 5.50</Text>
            <Text style={{ ...styles.price, color: Colors.basic.black }}>
              <Icon.Ionicons
                name={`${iconPrefix}-pricetags`}
                size={Layout.fontSize.mediumText}
                color={Colors.basic.black}
              />{` € 3.25`}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    flexDirection: "row",
    overflow: "hidden",
    shadowColor: Colors.shadow,
    shadowOffset: { height: 5, width: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
  },
  textContainer: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20
  },
  image: {
    height: 150,
    width: 150
  },
  text: {
    marginTop: 10,
    fontSize: Layout.fontSize.medium,
    color: Colors.redible.accent
  },
  dishName: {
    fontSize: Layout.fontSize.mainContent
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10
  },
  price: {
    fontSize: Layout.fontSize.mediumText
  },
})

export default DishCard