export const getRandomRating = (min = 3.75) => {
  const rating = (Math.random() * 5).toFixed(2)
  return rating >= min ? rating : getRandomRating()
}

export const getRatingTitle = rating => {
  let title
  if (rating >= 4.5) title = "Excellent"
  else if (rating >= 4.0) title = "Very good"
  else if (rating >= 3.5) title = "Good"
  else title = ""
  return title
} 