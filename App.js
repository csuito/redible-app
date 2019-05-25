import React from "react"
import { Platform, StatusBar, StyleSheet, View } from "react-native"
import { AppLoading, Asset, Font, Icon } from "expo"
import {
  setCustomTextInput,
  setCustomText,
  setCustomTouchableOpacity,
} from "react-native-global-props"

// Navigation Component
import AppNavigator from "./navigation/AppNavigator"

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoadingComplete: false
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf"),
        "open-sans": require("./assets/fonts/OpenSans-Regular.ttf")
      }),
    ])
  }

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error)
  }

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true })
  }

  render() {
    return (
      !this.state.isLoadingComplete && !this.props.skipLoadingScreen ?
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
        :
        <View style={styles.container}>
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
    )
  }
}

const customFont = {
  style: {
    fontFamily: "open-sans"
  }
}

setCustomTextInput(customFont)
setCustomText(customFont)
setCustomTouchableOpacity(customFont)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
})
