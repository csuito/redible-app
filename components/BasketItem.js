import React from "react"
import { StyleSheet, View, Text } from "react-native"
import PropTypes from "prop-types"

// Constants
import Colors from "../constants/Colors"
import Layout from "../constants/Layout"

/**
 * Renders basket list item
 * @param {Object} props 
 */
const BasketItem = props => {
  const { name, quantity, price, header } = props,
    isTotal = name === "Total",
    color = isTotal ? Colors.basic.black : Colors.redible.accent,
    borderStyles = isTotal ? {
      borderTopWidth: 1,
      borderColor: Colors.redible.accent
    } : null

  return (
    header ?
      <View style={styles.container}>
        <View style={styles.containerItem}>
          <Text style={styles.headerText}>{"Item"}</Text>
        </View>
        <View style={styles.containerItem}>
          <Text style={styles.headerText}>{"Qty"}</Text>
          <Text style={styles.headerText}>{"Price"}</Text>
        </View>
      </View>
      :
      <View style={{ ...styles.container, ...borderStyles }}>
        <View style={styles.containerItem}>
          <Text style={{ ...styles.text, color }}>{name}</Text>
        </View>
        <View style={styles.containerItem}>
          <Text style={{ ...styles.text, color }}>{quantity ? `x ${quantity}` : null}</Text>
          <Text style={{ ...styles.text, color }}>{`€ ${price}`}</Text>
        </View>
      </View>
  )
}

BasketItem.propTypes = {
  name: PropTypes.string,
  quantity: PropTypes.number,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  total: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  header: PropTypes.bool
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.basic.white,
    paddingTop: 10,
    paddingBottom: 10
  },
  containerItem: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between"
  },
  headerText: {
    fontSize: Layout.fontSize.mainContent,
    color: Colors.basic.black,
  },
  text: {
    fontSize: Layout.fontSize.mainContent,
  }
})

export default BasketItem