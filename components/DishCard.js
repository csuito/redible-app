import React from "react"
import { StyleSheet, View, Image, Text, Platform, TouchableWithoutFeedback } from "react-native"
import { Chip } from "react-native-paper"
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
        <View style={styles.imageContainer}>
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
            <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
              <Chip style={styles.chipContainer}>
                <Text style={styles.chipText}>Seafood</Text>
              </Chip>
              <Chip style={{ ...styles.chipContainer, marginLeft: 5 }}>
                <Text style={styles.chipText}>Gluten-free</Text>
              </Chip>
            </View>
          </View>
          <View style={styles.footer}>
            <Text style={{ ...styles.price, color: Colors.redible.silver, textDecorationLine: "line-through" }}>€ 5.50</Text>
            <Text style={{ ...styles.price, color: Colors.redible.accent }}>
              <Icon.Ionicons
                name={`${iconPrefix}-pricetags`}
                size={Layout.fontSize.mediumText}
                color={Colors.redible.accent}
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
    flex: 1.8,
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20
  },
  imageContainer: {
    flex: 1,
    backgroundColor: Colors.basic.white,
  },
  image: {
    height: undefined,
    width: undefined,
    resizeMode: "cover",
    flex: 1,
  },
  text: {
    marginTop: 10,
    fontSize: Layout.fontSize.medium,
    color: Colors.redible.accent
  },
  dishName: {
    fontSize: Layout.fontSize.mainContent
  },
  chipContainer: {
    marginTop: 10
  },
  chipText: {
    fontSize: Layout.fontSize.smallerText,
    color: Colors.redible.silver
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