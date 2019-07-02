import React, { Component } from "react"
import { Platform, Modal, StyleSheet, View, Text, TouchableOpacity } from "react-native"
import { Icon } from "expo"

// Components
import Button from "../Button"
import CustomInput from "../CustomInput"

// Constants
import Layout from "../../constants/Layout"
import Colors from "../../constants/Colors"

/**
 * Renders Modal to edit/add payment a method
 */
export default class PaymentMethodModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      cardNumber: "",
      month: "",
      year: "",
      cvc: ""
    }
  }

  componentDidMount() {
    const { paymentData } = this.props
    if (paymentData) {
      const { name, cardNumber, month, year, cvc } = paymentData
      this.setState({ name, cardNumber, month, year, cvc })
    }
  }

  render() {
    const prefix = Platform.OS === "ios" ? "ios" : "md",
      { modalVisible, _onPress } = this.props,
      { name, cardNumber, month, year, cvc } = this.state

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
              <Text style={styles.title}>Credit card information</Text>
              <View style={styles.inputs}>
                <Text style={styles.subtitle}>Personal information</Text>
                <CustomInput
                  containerStyles={styles.inputContainer}
                  textStyles={styles.textInput}
                  placeholder={"Full name"}
                  icon={"md-person"}
                  _onChange={name => this.setState({ name })}
                  name={"name"}
                  value={name}
                  iconSize={Layout.fontSize.mainContent}
                  iconColor={Colors.redible.accent}
                />
                <CustomInput
                  containerStyles={styles.inputContainer}
                  textStyles={styles.textInput}
                  placeholder={"Card number"}
                  icon={"md-card"}
                  _onChange={cardNumber => this.setState({ cardNumber })}
                  name={"cardNumber"}
                  value={cardNumber}
                  iconSize={Layout.fontSize.mainContent}
                  iconColor={Colors.redible.accent}
                />
                <View>
                  <Text style={styles.subtitle}>Expiration date</Text>
                  <View style={styles.expirationDate}>
                    <CustomInput
                      containerStyles={{ ...styles.inputContainer, ...styles.dateInput }}
                      textStyles={styles.textInput}
                      placeholder={"Month"}
                      icon={"md-calendar"}
                      _onChange={month => this.setState({ month })}
                      name={"month"}
                      value={month}
                      iconSize={Layout.fontSize.mainContent}
                      iconColor={Colors.redible.accent}
                    />
                    <CustomInput
                      containerStyles={{ ...styles.inputContainer, ...styles.dateInput, marginLeft: 20 }}
                      textStyles={styles.textInput}
                      placeholder={"Year"}
                      icon={"md-calendar"}
                      _onChange={year => this.setState({ year })}
                      name={"year"}
                      value={year}
                      iconSize={Layout.fontSize.mainContent}
                      iconColor={Colors.redible.accent}
                    />
                  </View>
                  <Text style={styles.subtitle}>Security code</Text>
                  <CustomInput
                    containerStyles={styles.inputContainer}
                    textStyles={styles.textInput}
                    placeholder={"CVC"}
                    icon={"md-lock"}
                    _onChange={cvc => this.setState({ cvc })}
                    name={"cvc"}
                    value={cvc}
                    iconSize={Layout.fontSize.mainContent}
                    iconColor={Colors.redible.accent}
                  />
                </View>
              </View>
              <View style={styles.buttonsContainer}>
                <Button
                  iconName={"close"}
                  text={"Cancel"}
                  containerStyles={{ flexDirection: "row", backgroundColor: Colors.redible.raspberry }}
                  textStyles={{ fontSize: Layout.fontSize.mainContent, color: Colors.basic.white }}
                  _onPress={_onPress}
                />
                <Button
                  iconName={"checkmark"}
                  text={"Apply"}
                  containerStyles={{ flexDirection: "row", backgroundColor: Colors.redible.main }}
                  textStyles={{ fontSize: Layout.fontSize.mainContent, color: Colors.basic.white }}
                  _onPress={_onPress}
                />
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
    flex: 1,
    padding: 15,
    backgroundColor: Colors.redible.babyPowder,
    borderRadius: 8,
    shadowColor: Colors.shadow,
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 2,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 20,
    fontSize: Layout.fontSize.title
  },
  subtitle: {
    fontSize: Layout.fontSize.mainContent,
    marginTop: 20,
  },
  expirationDate: {
    flexDirection: "row"
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 30
  },
  inputContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    marginTop: 15,
    padding: 7.5,
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: "rgba(235, 235, 235, 0.8)",
    borderRadius: 8
  },
  dateInput: {
    flex: 1
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: Layout.fontSize.mainContent,
    color: Colors.redible.accent
  },
})