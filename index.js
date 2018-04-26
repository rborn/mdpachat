import { AppRegistry } from 'react-native';
import loginScreen from './src/screens/login';
import signupScreen from './src/screens/signUp';

import { createStackNavigator } from 'react-navigation';

const rootNavigator = createStackNavigator(
    {
        Login: {
            screen: loginScreen
        },
        Signup: {
            screen: signupScreen
        }
    },
    {
        headerMode: 'none'
        // initialRouteName: 'Signup'
    }
);

AppRegistry.registerComponent('mdpachat', () => rootNavigator);
