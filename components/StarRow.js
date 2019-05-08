import React from "react"
import { StyleSheet, Platform, View } from "react-native"
import { Icon } from "expo"

// Constants
import Layout from "../constants/Layout"
import Colors from "../constants/Colors"

const StarRow = props => {
  const { rating, prefix } = props,
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

  if (ratingDecimal < 5) {
    return (
      <View style={styles.container}>
        {buildStars(numStars)}
        <Icon.Ionicons name={`${prefix}-star-half`} color={Colors.redible.star} size={Layout.fontSize.mainContent} />
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        {buildStars(numStars)}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row"
  }
})

export default StarRow