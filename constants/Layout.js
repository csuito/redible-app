import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default {
  window: {
    width,
    height,
  },
  fontSize: {
    contentTile: 18,
    mainContent: 16,
    mediumText: 14,
    smallText: 12
  },
  androidHeaderHeight: 65,
  isSmallDevice: width < 375,
};
