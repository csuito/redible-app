import React, { Component } from "react"
import { StyleSheet, View, Text } from "react-native"
import { Icon } from "expo"
import { PacmanIndicator } from "react-native-indicators"

// Components
import WithBackIconHeader from "../components/headers/WithBackIconHeader"
import Button from "../components/Button"

// Constants
import Colors from "../constants/Colors"
import Layout from "../constants/Layout"

/**
 * Renders order confirmation screen
 */
export default class OrderConfirmationScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isConfirmed: false
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: <WithBackIconHeader _onPress={() => navigation.navigate("Home")} iconName={"home"} text={"Order Confirmation"} color={Colors.basic.white} navigation={navigation} />
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isConfirmed: true }, () => {
        this.props.navigation.setParams({ noShadow: false })
      })
    }, 3500)
  }

  render() {
    const { isConfirmed } = this.state

    return (
      <View style={styles.container}>
        {
          isConfirmed ?
            <View style={styles.contentContainer}>
              <Text style={styles.title}>Congratulations!</Text>
              <View style={styles.iconContainer}>
                <Icon.Ionicons
                  name={"md-checkmark-circle"}
                  color={Colors.redible.main}
                  size={72}
                />
              </View>
              <View style={styles.bottomTextContainer}>
                <Text style={styles.text}>Your order</Text>
                <Text style={{ ...styles.text, ...styles.highlighted }}># 37963429</Text>
                <Text style={styles.text}>has been confirmed by</Text>
                <Text style={{ ...styles.text, ...styles.highlighted, marginBottom: 15 }}>Forastera Restaurant</Text>
              </View>
              <Button
                text={"Pick-up"}
                containerStyles={{ flexDirection: "row", backgroundColor: Colors.redible.star, margin: 35 }}
                textStyles={{ color: Colors.basic.white, fontSize: Layout.fontSize.mainContent }}
                _onPress={() => { this.props.navigation.navigate("Pickup", { noShadow: true }) }}
              />
            </View>
            :
            <View style={{ ...styles.contentContainer, backgroundColor: Colors.redible.main, alignItems: "center", justifyContent: "center" }}>
              <Text style={{ ...styles.title, color: Colors.basic.white }}>Thank you!</Text>
              <View style={{ margin: 35 }}>
                <Text style={{ ...styles.text, color: Colors.redible.babyPowder, fontStyle: "italic" }}>Please wait a second while we confirm your order</Text>
              </View>
              <PacmanIndicator size={75} color={Colors.basic.white} />
            </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.basic.white
  },
  contentContainer: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15
  },
  title: {
    marginTop: 50,
    fontSize: Layout.fontSize.title,
    color: Colors.basic.black,
    fontWeight: "bold",
    textAlign: "center",
  },
  iconContainer: {
    margin: 35,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: Layout.fontSize.mainContent,
    color: Colors.redible.accent,
    marginTop: 15,
    textAlign: "center",
  },
  highlighted: {
    color: Colors.redible.mainDark
  }
})