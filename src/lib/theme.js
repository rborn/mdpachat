import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const COLORS = {
    primary: '#19A5E4',
    secondary: '#ECEFF1',
    borderColor: '#FFF',
    lightText: '#FFF',
    darkText: '#333',
    lightTransparentText: '#FFFFFF77',
    lightButtonBackground: '#FFF'
};
const SIZES = {
    margin: 10,
    padding: 5,
    loginSignupInputBorderRadius: 10,
    loginSignupInputBorderWidth: 1,
    loginSignupInputHeight: 30,
    loginSignupInputWidth: width * 0.6
};

export { COLORS, SIZES };
