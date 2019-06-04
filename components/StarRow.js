import React from "react"
import { StyleSheet, View, Text } from "react-native"
import { Icon } from "expo"
import PropTypes from "prop-types"

// Constants
import Layout from "../constants/Layout"
import Colors from "../constants/Colors"

/**
 * Renders restaurant rating
 * @param {Object} props 
 */
const Stars = props => {
  const { rating, prefix, row } = props,
    numStars = Math.round(rating),
    ratingDecimal = rating.toString().includes(".") ? rating.toString()[2] : 10

  const buildStars = numStars => {
    let stars = []
    for (let i = 0; i < numStars; i++) {
      stars.push(
        <Icon.Ionicons
          key={i}
          name={`${prefix}-star`}
          color={Colors.redible.star}
          size={Layout.fontSize.mainContent}
        />
      )
    }
    return stars.map(star => star)
  }

  return (
    !row ?
      <View style={styles.container}>
        <Text style={styles.text}>
          {`${rating} `}
          <Icon.Ionicons name={`${prefix}-star`} color={Colors.redible.star} size={Layout.fontSize.mainContent} />
        </Text>
      </View>
      :
      ratingDecimal < 5 ?
        <View style={styles.container}>
          {buildStars(numStars)}
          <Icon.Ionicons name={`${prefix}-star-half`} color={Colors.redible.star} size={Layout.fontSize.mainContent} />
        </View>
        :
        <View style={styles.container}>
          {buildStars(numStars)}
        </View>
  )
}

Stars.propTypes = {
  prefix: PropTypes.string.isRequired,
  rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  row: PropTypes.bool
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row"
  },
  text: {
    fontSize: Layout.fontSize.mainContent,
    color: Colors.redible.star,
    fontWeight: "bold"
  }
})

export default Stars