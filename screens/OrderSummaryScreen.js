import React, { Component } from "react"
import { Platform, StyleSheet, View, Text, ScrollView } from "react-native"
import { Icon } from "expo"

// Components
import WithBackIconHeader from "../components/headers/WithBackIconHeader"
import Button from "../components/Button"

// Constants
import Colors from "../constants/Colors"
import Layout from "../constants/Layout"

/**
 * Renders order summary 
 */
export default class OrderSummaryScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  static navigationOptions = ({ navigation }) => {
    return {
      header: <WithBackIconHeader text={"Order Summary"} iconName={"arrow-back"} color={Colors.basic.white} navigation={navigation} noShadow />
    }
  }

  render() {
    const prefix = Platform.OS === "ios" ? "ios" : "md"
    return (
      <View style={styles.container}>
        <View style={styles.pickupInfo}>
          <Text style={styles.title}>Forastera Restaurant</Text>
          <Text style={styles.text}><Icon.Ionicons
            name={`${prefix}-pin`}
            color={Colors.basic.white}
            size={Layout.fontSize.mainContent}
          />{` Carrer de Sancho de Ávila, 22, 08018 Barcelona`}</Text>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Text style={styles.text}><Icon.Ionicons
              name={`${prefix}-time`}
              color={Colors.basic.white}
              size={Layout.fontSize.mainContent}
            />{` Pick-up: 20:00 - 22:30`}</Text>
            <Button
              noShadow
              text={"Set time"}
              containerStyles={{ flexDirection: "row", padding: 5, marginTop: 15, backgroundColor: Colors.redible.grape }}
              textStyles={{ color: Colors.basic.white }}
            />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Text style={styles.text}><Icon.Ionicons
              name={`${prefix}-card`}
              color={Colors.basic.white}
              size={Layout.fontSize.mainContent}
            />{` Payment method`}</Text>
            <View style={styles.paymentMethodButtons}>
              <Button
                noShadow
                text={"Edit"}
                containerStyles={{ flexDirection: "row", padding: 5, backgroundColor: Colors.redible.grape, marginRight: 15 }}
                textStyles={{ color: Colors.basic.white }}
              />
              <Button
                noShadow
                text={"Add"}
                containerStyles={{ flexDirection: "row", padding: 5, backgroundColor: Colors.redible.grape }}
                textStyles={{ color: Colors.basic.white }}
              />
            </View>
          </View>
          <Text style={styles.text}>**** **** **** 5437</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            text={"Submit order"}
            containerStyles={{ flexDirection: "row", backgroundColor: Colors.redible.raspberry }}
            textStyles={{ color: Colors.basic.white, fontSize: Layout.fontSize.mainContent }}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pickupInfo: {
    padding: 15,
    paddingBottom: 30,
    backgroundColor: Colors.redible.main
  },
  title: {
    marginTop: 30,
    fontSize: Layout.fontSize.title,
    fontWeight: "bold",
    color: Colors.basic.white
  },
  text: {
    marginTop: 15,
    fontSize: Layout.fontSize.mainContent,
    color: Colors.basic.white
  },
  paymentMethodButtons: {
    flexDirection: "row",
    marginTop: 15,
    alignItems: "center",
    justifyContent: "space-between"
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 30
  }
})