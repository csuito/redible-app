import Colors from "../constants/Colors"

export const iconHelper = rank => {
  let color, icon
  switch (rank) {
    case 0:
      color = Colors.redible.star; icon = "globe"
      break
    case 1:
      color = Colors.redible.silver; icon = "globe"
      break
    case 2:
      color = Colors.redible.bronze; icon = "globe"
      break
    default:
      color = Colors.basic.black; icon = "globe"
  }
  return { color, icon }
}