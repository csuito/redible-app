import React, { Component } from "react"
import { Platform, StyleSheet, View, Text, TextInput } from "react-native"
import { Icon } from "expo"

// Components
import WithBackIconHeader from "../components/headers/WithBackIconHeader"

// Constants
import Layout from "../constants/Layout"
import Colors from "../constants/Colors"

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedUser: false,
      email: "",
      password: ""
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: <WithBackIconHeader text={"Profile"} iconName={"arrow-back"} color={Colors.basic.white} navigation={navigation} />
    }
  }
  render() {
    const { isLoggedUser, email, password } = this.state

    return (
      <View style={styles.container}>
        {
          !isLoggedUser ?
            <View style={styles.contentContainer}>
              <View style={styles.inputContainer}>
                <Icon.Ionicons
                  name="md-create"
                  color={Colors.redible.gray}
                  size={Layout.fontSize.largeText}
                />
                <TextInput
                  placeholder="Email"
                  onChangeText={email => this.setState({ email })}
                  mode={"outlined"}
                  value={email}
                  style={styles.textInput}
                />
                <Icon.Ionicons
                  name="md-backspace"
                  color={Colors.redible.gray}
                  size={Layout.fontSize.largeText}
                />
              </View>
              <View style={{ ...styles.inputContainer, marginTop: 15 }}>
                <Icon.Ionicons
                  name="md-create"
                  color={Colors.redible.gray}
                  size={Layout.fontSize.largeText}
                />
                <TextInput
                  placeholder="Password"
                  onChangeText={password => this.setState({ password })}
                  mode={"outlined"}
                  value={password}
                  style={styles.textInput}
                />
                <Icon.Ionicons
                  name="md-backspace"
                  color={Colors.redible.gray}
                  size={Layout.fontSize.largeText}
                />
              </View>
            </View>
            :
            <Text>Logged in</Text>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.basic.white,
    paddingLeft: 30,
    paddingRight: 30
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
  },
  inputContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    padding: 5,
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: Colors.basic.white,
    borderBottomWidth: 2,
    borderBottomColor: Colors.redible.main
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: Layout.fontSize.mainContent
  }
})