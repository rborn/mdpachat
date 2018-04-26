import { AppRegistry } from 'react-native';
import loginScreen from './src/screens/login';
import signupScreen from './src/screens/signUp';
import membersScreen from './src/screens/members';
import chatRoomsScreen from './src/screens/chatRooms';

import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

const tabNavigator = createBottomTabNavigator({
    Members: {
        screen: membersScreen
    },
    ChatRooms: {
        screen: chatRoomsScreen
    }
});

const rootNavigator = createStackNavigator(
    {
        Login: {
            screen: loginScreen
        },
        Signup: {
            screen: signupScreen
        },
        Tabs: {
            screen: tabNavigator
        }
    },
    {
        headerMode: 'none',
        initialRouteName: 'Login'
    }
);

AppRegistry.registerComponent('mdpachat', () => rootNavigator);
