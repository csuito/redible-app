import React from "react"
import { StyleSheet, View, TouchableWithoutFeedback, TouchableOpacity, Text, Image } from "react-native"
import { Icon } from "expo"

// Constants
import Colors from "../constants/Colors"
import Layout from "../constants/Layout"

const FavoriteCard = props => {
  const { name, navigation, _onPress } = props

  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate("Details")}>
      <View style={styles.container}>
        <View>
          <Image style={styles.image} source={require("../assets/images/forastera-logo.png")} />
        </View>

        <View style={styles.textContainer}>
          <View style={{ flex: 1 }}>
            <Text style={styles.text}>{name}</Text>
          </View>

          <View style={styles.button}>
            <TouchableOpacity onPress={_onPress}>
              <Icon.Ionicons
                name={"md-heart"}
                color={Colors.redible.raspberry}
                size={Layout.fontSize.largeIcon}
              />
            </TouchableOpacity>
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
  button: {
    height: 50,
    width: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center"
  }
})

export default FavoriteCard