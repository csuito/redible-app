import React, { Component } from "react"
import { StyleSheet, Image, View, Text, TouchableOpacity } from "react-native"
import { Icon } from "expo"
import * as Animatable from "react-native-animatable"

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
    const { isLoggedUser, email, password } = this.state,
      nextLevel = 1750,
      totalPoints = 1375 + 285,
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
              <Text style={styles.title}>My Account</Text>
              <View style={styles.userInformation}>
                <View style={styles.accountContainer}>
                  <Text style={styles.name}>{`Vanessa`}</Text>
                  <Text style={styles.account}>{`vanessa.higasi@bts.tech`}</Text>
                </View>
                <View>
                  <Text style={{ textAlign: "center", color: Colors.redible.star, fontWeight: "bold", fontSize: Layout.fontSize.title }}>{totalPoints}</Text>
                  <Text style={{ textAlign: "center", color: Colors.redible.star, fontWeight: "bold", fontSize: Layout.fontSize.title }}>points</Text>
                </View>
              </View>

              <View style={styles.rankingContainer}>
                <Text style={styles.bold}>Level 6: <Text style={styles.level}>Food saving Master</Text></Text>
                <View style={styles.barContainer}>
                  <Animatable.View delay={300} animation={progress} duration={800} style={{ ...styles.bar, width: "0%" }}></Animatable.View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={styles.contributionItem}>
                    <Icon.Ionicons
                      name={"md-trending-up"}
                      size={Layout.fontSize.largeIcon}
                      color={Colors.redible.lavenderGray}
                    />
                    <Text style={styles.smallText}><Text style={{ fontWeight: "bold" }}>{nextLevel - totalPoints}</Text> points for next level</Text>
                  </View>
                  <View style={{ ...styles.contributionItem, borderLeftColor: Colors.redible.lavenderGray, borderLeftWidth: 2 }}>
                    <Icon.Ionicons
                      name={"md-globe"}
                      size={Layout.fontSize.largeIcon}
                      color={Colors.redible.lavenderGray}
                    />
                    <Text style={styles.smallText}><Text style={{ fontWeight: "bold" }}>17</Text> meals saved</Text>
                  </View>
                </View>
              </View>
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
    backgroundColor: Colors.basic.white,
    paddingTop: Layout.androidHeaderHeight + 15,
    paddingLeft: 30,
    paddingRight: 30
  },
  userInformation: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 30
  },
  title: {
    fontSize: Layout.fontSize.title,
    fontWeight: "bold"
  },
  name: {
    color: Colors.basic.black,
    fontSize: Layout.fontSize.mainContent,
    marginBottom: 10
  },
  account: {
    fontSize: Layout.fontSize.mediumText,
    color: Colors.redible.lavenderGray
  },
  rankingContainer: {
    width: "100%",
    marginTop: 30
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
  barContainer: {
    marginTop: 20,
    marginBottom: 20,
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
  },
  contributionItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10
  }
})