import React from "react"
import { StyleSheet, Platform, Text, View, TouchableWithoutFeedback } from "react-native"
import { Icon } from "expo"

// Components
import StarRow from "./StarRow"
import Button from "./Button"

// Constants
import Layout from "../constants/Layout"
import Colors from "../constants/Colors"

const DescriptionCard = props => {
  const prefix = Platform.OS === "ios" ? "ios" : "md",
    { navigation, _onPress } = props

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.contentTitle}>
          {`Forastera Restaurant`}
        </Text>
        <StarRow prefix={prefix} rating={4.3} />
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={{ ...styles.description, marginBottom: 10 }}>
          <Icon.Ionicons
            name={`${prefix}-pin`}
            color={Colors.redible.accent}
            size={Layout.fontSize.mediumText}
          />
          {` Carrer de Sancho de Ávila, 22, 08018 Barcelona`}</Text>
        <Text style={styles.description}>
          <Icon.Ionicons
            name={`${prefix}-information-circle-outline`}
            color={Colors.redible.accent}
            size={Layout.fontSize.mediumText}
          />{` Nice place, good vibes and an economically priced lunch menu`}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          iconName={"close"}
          text={"Close"}
          containerStyles={{ flexDirection: "row", backgroundColor: Colors.redible.raspberry, width: 100 }}
          textStyles={{ fontSize: Layout.fontSize.smallText, color: Colors.basic.white }}
          _onPress={_onPress}
        />
        <Button
          iconName={"checkmark"}
          text={"Go"}
          containerStyles={{ flexDirection: "row", backgroundColor: Colors.redible.main, width: 100 }}
          textStyles={{ fontSize: Layout.fontSize.smallText, color: Colors.basic.white }}
          _onPress={() => navigation.navigate("Details")}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 35,
    left: 15,
    right: 15,
    backgroundColor: Colors.basic.white,
    borderRadius: 8,
    shadowColor: Colors.shadow,
    shadowOffset: { height: 5, width: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
  },
  titleContainer: {
    flexDirection: "row",
    backgroundColor: Colors.redible.main,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  contentTitle: {
    fontSize: Layout.fontSize.mainContent,
    color: Colors.basic.white,
    fontWeight: "bold"
  },
  descriptionContainer: {
    padding: 15
  },
  description: {
    color: Colors.redible.accent,
    fontSize: Layout.fontSize.mediumText
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginLeft: 15,
    marginRight: 15,
    paddingBottom: 15
  },
})

export default DescriptionCard