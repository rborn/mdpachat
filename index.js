import { AppRegistry } from 'react-native';
import loginScreen from './src/screens/login';
import signupScreen from './src/screens/signUp';
import membersScreen from './src/screens/members';
import chatRoomsScreen from './src/screens/chatRooms';

import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

const membersNavigator = createStackNavigator(
    {
        MembersList: {
            screen: membersScreen,
            navigationOptions: {
                title: 'Members'
            }
        }
    },
    {}
);

const tabNavigator = createBottomTabNavigator({
    Members: {
        screen: membersNavigator
    },
    ChatRooms: {
        screen: chatRoomsScreen
    }
});

const authNavigator = createStackNavigator(
    {
        Login: {
            screen: loginScreen
        },
        Signup: {
            screen: signupScreen
        }
    },
    {
        headerMode: 'none',
        initialRouteName: 'Login'
    }
);

const rootNavigator = createStackNavigator(
    {
        Auth: {
            screen: authNavigator
        },
        Tabs: {
            screen: tabNavigator,
            navigationOptions: {
                gesturesEnabled: false
            }
        }
    },
    {
        headerMode: 'none',
        mode: 'modal',
        initialRouteName: 'Tabs'
    }
);

AppRegistry.registerComponent('mdpachat', () => rootNavigator);
