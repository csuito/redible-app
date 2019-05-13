import Colors from "../constants/Colors"

export const getIconProperties = type => {
  let color, iconName
  switch (type) {
    case "Favorite":
      color = Colors.redible.raspberry; iconName = "heart";
      break
    case "Top rated":
      color = Colors.redible.star; iconName = "star";
      break
    case "Healthy":
      color = Colors.redible.main; iconName = "leaf";
      break
    case "Recommended":
      color = Colors.redible.star; iconName = "ribbon";
      break
    case "Trending":
      color = Colors.redible.raspberry; iconName = "flame";
      break
    case "Near me":
      color = Colors.redible.raspberry; iconName = "pin";
      break
    case "Top deal":
      color = Colors.redible.main; iconName = "pricetags"
      break
    default:
      null
  }
  return { color, iconName }
}