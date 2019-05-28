import Colors from "../constants/Colors"

export const iconHelper = rank => {
  let color, icon
  switch (rank) {
    case 0:
      color = Colors.redible.star; icon = "ios-restaurant"
      break
    case 1:
      color = Colors.redible.silver; icon = "ios-restaurant"
      break
    case 2:
      color = Colors.redible.bronze; icon = "ios-restaurant"
      break
    default:
      color = Colors.basic.black; icon = "md-trending-up"
  }
  return { color, icon }
}