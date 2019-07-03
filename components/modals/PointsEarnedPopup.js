import React, { Component } from "react"
import { Platform, Modal, StyleSheet, View, Text, TouchableOpacity, Image } from "react-native"
import { Icon } from "expo"
import * as Animatable from "react-native-animatable"

// Constants
import Layout from "../../constants/Layout"
import Colors from "../../constants/Colors"

/**
 * Renders Popup showing users earned points after purchase
 */
export default class PointsEarnedPopup extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    const prefix = Platform.OS === "ios" ? "ios" : "md",
      { modalVisible, _onPress } = this.props,
      earnedPoints = 285,
      nextLevel = 2251,
      totalPoints = 2150,
      width = `${(totalPoints / nextLevel) * 100}%`,
      progress = {
        from: {
          width: "0%"
        },
        to: {
          width
        }
      }

    return (
      modalVisible ?
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          hardwareAccelerated={true}
          onRequestClose={() => { }}
        >
          <View style={styles.container}>
            <TouchableOpacity style={styles.closeButton} onPress={_onPress}>
              <Icon.Ionicons
                name={`${prefix}-close-circle`}
                color={Colors.redible.raspberry}
                size={36}
              />
            </TouchableOpacity>
            <View style={styles.contentContainer}>
              <Text style={styles.title}>Congratulations!</Text>
              <Text style={styles.subtitle}>You have earned <Text style={styles.bold}>{earnedPoints}</Text> points</Text>
              <Image style={styles.image} source={require("../../assets/images/celebration-image.jpg")} />
              <View style={styles.rankingContainer}>
                <Text style={styles.bold}>Level 6: <Text style={styles.level}>Food saving Legend</Text></Text>
                <View style={styles.barContainer}>
                  <Animatable.View delay={300} animation={progress} duration={800} style={{ ...styles.bar, width: "0%" }}></Animatable.View>
                </View>
                <Text style={styles.smallText}>{nextLevel - totalPoints} points to unlock the Food saving Rockstar level</Text>
              </View>
            </View>
          </View>
        </Modal>
        :
        null
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.searchModal,
    padding: 30
  },
  closeButton: {
    alignSelf: "flex-end",
    marginBottom: 30
  },
  contentContainer: {
    padding: 15,
    backgroundColor: Colors.redible.babyPowder,
    borderRadius: 8,
    shadowColor: Colors.shadow,
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 2,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    fontSize: Layout.fontSize.title
  },
  subtitle: {
    textAlign: "center",
    fontSize: Layout.fontSize.mainContent
  },
  rankingContainer: {
    width: "100%"
  },
  level: {
    fontSize: Layout.fontSize.mainContent,
    color: Colors.basic.black,
    fontWeight: "normal",
  },
  bold: {
    fontWeight: "bold",
    fontSize: Layout.fontSize.mainContent,
    color: Colors.redible.star
  },
  image: {
    resizeMode: "contain",
    height: 275,
    width: 275,
    alignSelf: "center",
    marginTop: 25,
    marginBottom: 25
  },
  barContainer: {
    marginTop: 20,
    marginBottom: 10,
    height: 10,
    width: "100%",
    backgroundColor: Colors.redible.cream,
    borderRadius: 2.5
  },
  bar: {
    height: 10,
    backgroundColor: Colors.redible.main,
    borderRadius: 2.5,
  },
  smallText: {
    fontSize: Layout.fontSize.mediumText,
    color: Colors.redible.gray
  }
})