import React from "react"
import { StyleSheet, View, Text } from "react-native"
import { Dropdown } from "react-native-material-dropdown"
import PropTypes from "prop-types"

// Constants
import Colors from "../constants/Colors"
import Layout from "../constants/Layout"
import Categories from "../constants/Data/Categories"

// Components
import FilterIcon from "./FilterIcon"
import Button from "./Button"

const FiltersList = props => {
  const { _onPress, _selectFilter, activeId } = props

  return (
    <View style={{ ...styles.container, paddingVertical: 30 }}>
      <Text style={styles.subtitle}>Sort by</Text>
      <View style={styles.iconsContainer}>
        <FilterIcon activeId={activeId} _onPress={_selectFilter} name={"locate"} text={"Distance"} size={Layout.fontSize.contentTitle} color={Colors.redible.lavenderGray} />
        <FilterIcon activeId={activeId} _onPress={_selectFilter} name={"star"} text={"Rating"} size={Layout.fontSize.contentTitle} color={Colors.redible.lavenderGray} />
        <FilterIcon activeId={activeId} _onPress={_selectFilter} name={"time"} text={"Pick-up"} size={Layout.fontSize.contentTitle} color={Colors.redible.lavenderGray} />
      </View>
      <Text style={{ ...styles.subtitle, marginTop: 10 }}>Filter by category</Text>
      <Dropdown
        containerStyle={{ marginLeft: 15, marginRight: 15 }}
        label={"Categories"}
        data={Categories}
        baseColor={Colors.redible.accent}
        textColor={Colors.redible.accent} />
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
  )
}

FiltersList.propTypes = {
  _onPress: PropTypes.func.isRequired,
  _selectFilter: PropTypes.func.isRequired,
  activeId: PropTypes.string
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: Colors.redible.babyPowder,
    borderRadius: 8,
    shadowColor: Colors.shadow,
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 2,
  },
  subtitle: {
    fontSize: Layout.fontSize.mainContent,
    color: Colors.redible.accent,
    textAlign: "center",
    marginBottom: 15
  },
  iconsContainer: {
    padding: 15,
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "space-evenly"
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 30
  }
})

export default FiltersList