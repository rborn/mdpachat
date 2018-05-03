import React from 'react';
import { AppRegistry } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import loginScreen from './src/screens/login';
import signupScreen from './src/screens/signUp';
import membersScreen from './src/screens/members';
import chatRoomsScreen from './src/screens/chatRooms';

import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

console.disableYellowBox = true;

const membersNavigator = createStackNavigator({
    MembersList: {
        screen: membersScreen,
        navigationOptions: {
            title: 'Members'
        }
    }
});

const chatRoomsNavigator = createStackNavigator({
    ChatRoomsList: {
        screen: chatRoomsScreen,
        navigationOptions: {
            title: 'Rooms'
        }
    }
});

const tabNavigator = createBottomTabNavigator({
    Members: {
        screen: membersNavigator,
        navigationOptions: {
            tabBarIcon: ({ focused, tintColor }) => (
                <Icon name={focused ? 'ios-people' : 'ios-people-outline'} color={tintColor} size={28} />
            )
        }
    },
    ChatRooms: {
        screen: chatRoomsNavigator,
        navigationOptions: {
            tabBarIcon: ({ focused, tintColor }) => (
                <Icon name={focused ? 'ios-chatbubbles' : 'ios-chatbubbles-outline'} color={tintColor} size={28} />
            )
        }
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
