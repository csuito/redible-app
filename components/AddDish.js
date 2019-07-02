import React from "react"
import { StyleSheet, View, Text } from "react-native"
import { Icon } from "expo"
import * as Animatable from "react-native-animatable"

// Components
import Button from "./Button"

// Constants
import Colors from "../constants/Colors"
import Layout from "../constants/Layout"

/**
 * Renders AddDish footer on details screen
 * @param {Object} props 
 */
const AddDish = props => {
  const { dishAdded, quantity, _changeQuantity, _hideAddToBasket, animation } = props

  return (
    <View>
      {
        dishAdded ?
          <Animatable.View animation={animation} duration={200} style={styles.addToCart}>
            <Text style={styles.dishText}>{`Paella Valenciana`}</Text>
            <View style={styles.row}>
              <Text style={{ ...styles.dishText, color: Colors.redible.main }}>Added to the basket!</Text>
            </View>
          </Animatable.View>
          :
          <Animatable.View animation={"fadeInUp"} duration={200} style={styles.addToCart}>
            <Text style={styles.dishText}>{`Paella Valenciana`}</Text>
            <View style={styles.row}>
              <Text style={styles.addToText}>{`Quantity `}</Text>
              <Icon.Ionicons
                onPress={() => _changeQuantity("remove")}
                name={`md-remove-circle-outline`}
                color={Colors.redible.lavenderGray}
                size={Layout.fontSize.largeIcon}
              />
              <Text style={styles.addToText}>{quantity}</Text>
              <Icon.Ionicons
                onPress={() => _changeQuantity("add")}
                name={`md-add-circle-outline`}
                color={Colors.redible.main}
                size={Layout.fontSize.largeIcon}
              />
              {
                quantity > 0 ?
                  <Button
                    iconName={"basket"}
                    text={"Add to basket"}
                    containerStyles={{ flexDirection: "row", backgroundColor: Colors.redible.main }}
                    textStyles={{ fontSize: Layout.fontSize.mediumText, color: Colors.basic.white }}
                    _onPress={() => _hideAddToBasket(true)} />
                  :
                  <Button
                    iconName={"close"}
                    text={"Cancel"}
                    containerStyles={{ flexDirection: "row", backgroundColor: Colors.redible.raspberry }}
                    textStyles={{ fontSize: Layout.fontSize.mediumText, color: Colors.basic.white }}
                    _onPress={() => _hideAddToBasket()} />
              }
            </View>
          </Animatable.View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  addToCart: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    position: "absolute",
    width: Layout.window.width,
    bottom: 0,
    shadowColor: Colors.basic.black,
    backgroundColor: Colors.basic.white,
    shadowOffset: { height: 5, width: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
  },
  row: {
    flex: 1,
    backgroundColor: Colors.basic.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  dishText: {
    fontSize: Layout.fontSize.mainContent,
    color: Colors.redible.accent,
    textAlign: "center",
    marginBottom: 10,
  },
  addToText: {
    fontSize: Layout.fontSize.mainContent,
    color: Colors.redible.accent
  }
})

export default AddDish