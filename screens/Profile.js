import React, { Component } from "react"
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from "react-native"
import { Icon } from "expo"

// Components
import CustomInput from "../components/CustomInput"
import Button from "../components/Button"

// Constants
import Layout from "../constants/Layout"
import Colors from "../constants/Colors"

/**
 * Renders user profile screen or login screen for not logged users
 */
export default class ProfileScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedUser: true,
      email: "",
      password: ""
    }
  }

  static navigationOptions = {
    header: null
  }

  render() {
    const { isLoggedUser, email, password } = this.state

    return (
      <View style={styles.container}>
        {
          !isLoggedUser ?
            <View style={styles.contentContainer}>
              <View style={styles.topContainer}>
                <Image style={styles.logo} source={require("../assets/images/logo.png")} />
                <Text style={styles.title}>Love food? Let's <Text style={{ ...styles.title, fontStyle: "italic" }}>save</Text> eat!</Text>
              </View>
              <View style={styles.bottomContainer}>
                <View>
                  <CustomInput
                    containerStyles={styles.inputContainer}
                    textStyles={styles.textInput}
                    placeholder={"Email"}
                    icon={"md-create"}
                    _onChange={email => this.setState({ email })}
                    name={email}
                    value={email}
                    iconSize={Layout.fontSize.mainContent}
                    iconColor={Colors.redible.accent}
                  />
                  <CustomInput
                    containerStyles={styles.inputContainer}
                    textStyles={styles.textInput}
                    placeholder={"Password"}
                    icon={"md-create"}
                    _onChange={password => this.setState({ password })}
                    name={password}
                    value={password}
                    iconSize={Layout.fontSize.mainContent}
                    iconColor={Colors.redible.accent}
                  />
                  <Button
                    text={"Login"}
                    containerStyles={{ flexDirection: "row", backgroundColor: Colors.redible.raspberry, marginTop: 35, marginLeft: 25, marginRight: 25 }}
                    textStyles={{ color: Colors.basic.white, fontSize: Layout.fontSize.mainContent }}
                  />
                  <Button
                    text={"Login with Facebook"}
                    containerStyles={{ flexDirection: "row", backgroundColor: Colors.facebookBlue, marginTop: 20, marginLeft: 25, marginRight: 25 }}
                    textStyles={{ color: Colors.basic.white, fontSize: Layout.fontSize.mainContent }}
                  />
                </View>
                <View style={styles.footer}>
                  <TouchableOpacity><Text style={{ ...styles.passwordRecovery, marginRight: 25 }}>Forgot password?</Text></TouchableOpacity>
                  <TouchableOpacity><Text style={{ ...styles.passwordRecovery, marginLeft: 25 }}>Sign up</Text></TouchableOpacity>
                </View>
              </View>
            </View>
            :
            <View style={styles.profileContainer}>

            </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.basic.white,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center"
  },
  topContainer: {
    flex: 1.25,
    backgroundColor: Colors.redible.main,
    paddingLeft: 30,
    paddingRight: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    marginTop: 30,
    width: 150,
    height: 150,
    resizeMode: "contain"
  },
  title: {
    fontSize: Layout.fontSize.contentTitle,
    color: Colors.basic.white,
    marginTop: 30
  },
  bottomContainer: {
    flex: 1,
    color: Colors.basic.white,
    paddingLeft: 30,
    paddingRight: 30,
    alignItems: "center",
    justifyContent: "space-between"
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
  textInput: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: Layout.fontSize.mainContent,
    color: Colors.redible.accent
  },
  footer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  passwordRecovery: {
    color: Colors.redible.accent,
    fontSize: Layout.fontSize.mediumText,
    marginBottom: 15,
  },
  profileContainer: {
    flex: 1,
    backgroundColor: Colors.redible.main

  }
})