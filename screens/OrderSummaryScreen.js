import React, { Component } from "react"
import { Platform, StyleSheet, View, Text } from "react-native"
import { Icon } from "expo"

// Components
import WithBackIconHeader from "../components/headers/WithBackIconHeader"
import PaymentMethodModal from "../components/modals/PaymentMethodModal"
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
    this.state = {
      paymentMethodModalVisible: false
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: <WithBackIconHeader text={"Order Summary"} iconName={"arrow-back"} color={Colors.basic.white} navigation={navigation} />
    }
  }

  componentWillUnmount() {
    this._hideModal()
  }

  _setPaymentMethod = type => {
    if (type === "edit") {
      console.log("INSIDE IF")
      this.setState({ name: "Carlos Suito", cardNumber: "3452986447595437", year: "2023", month: "07" })
    }
    this.props.navigation.setParams({ modalVisible: true, name: this.state.name })
  }

  _hideModal = () => {
    this.props.navigation.setParams({ modalVisible: false })
  }

  render() {
    const prefix = Platform.OS === "ios" ? "ios" : "md"

    let modalVisible = this.props.navigation.getParam("modalVisible") || false

    return (
      <View style={styles.container}>

        <PaymentMethodModal
          navigation={this.props.navigation}
          _onPress={this._hideModal}
          modalVisible={modalVisible}
        />

        <View style={styles.pickupInfo}>
          <Text style={styles.title}>Forastera Restaurant</Text>
          <Text style={styles.text}><Icon.Ionicons
            name={`${prefix}-pin`}
            color={Colors.redible.accent}
            size={Layout.fontSize.mainContent}
          />{` Carrer de Sancho de Ávila, 22, 08018 Barcelona`}</Text>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Text style={styles.text}><Icon.Ionicons
              name={`${prefix}-time`}
              color={Colors.redible.accent}
              size={Layout.fontSize.mainContent}
            />{` Pick-up: 20:00 - 22:30`}</Text>
            <Button
              noShadow
              text={"Set time"}
              containerStyles={{ flexDirection: "row", padding: 5, marginTop: 15, backgroundColor: Colors.redible.main }}
              textStyles={{ color: Colors.basic.white }}
            />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Text style={styles.text}><Icon.Ionicons
              name={`${prefix}-card`}
              color={Colors.redible.accent}
              size={Layout.fontSize.mainContent}
            />{` Payment method`}</Text>
            <View style={styles.paymentMethodButtons}>
              <Button
                noShadow
                text={"Edit"}
                containerStyles={{ flexDirection: "row", padding: 5, backgroundColor: Colors.redible.main, marginRight: 15 }}
                textStyles={{ color: Colors.basic.white }}
                _onPress={() => this._setPaymentMethod("edit")}
              />
              <Button
                noShadow
                text={"Add"}
                containerStyles={{ flexDirection: "row", padding: 5, backgroundColor: Colors.redible.main }}
                textStyles={{ color: Colors.basic.white }}
                _onPress={() => this._setPaymentMethod()}
              />
            </View>
          </View>
          <Text style={styles.text}>{`**** **** **** 5437`}</Text>
        </View>
        <Text style={styles.notice}>By placing this order you are helping us reduce food waste</Text>
        <View style={styles.buttonContainer}>
          <Button
            text={"Submit order"}
            containerStyles={{ flexDirection: "row", backgroundColor: Colors.redible.raspberry }}
            textStyles={{ color: Colors.basic.white, fontSize: Layout.fontSize.mainContent }}
            _onPress={() => { this.props.navigation.navigate("Confirmation") }}
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
    backgroundColor: Colors.basic.white
  },
  title: {
    marginTop: 30,
    fontSize: Layout.fontSize.title,
    fontWeight: "bold",
    color: Colors.basic.black
  },
  text: {
    marginTop: 15,
    fontSize: Layout.fontSize.mainContent,
    color: Colors.redible.accent
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
  },
  notice: {
    textAlign: "center",
    fontSize: Layout.fontSize.mediumText,
    color: Colors.redible.accent,
    margin: 30,
    marginBottom: 0,
    fontStyle: "italic",
  }
})