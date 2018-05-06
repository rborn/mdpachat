import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import loginScreen from '@screens/login';
import signupScreen from '@screens/signUp';
import membersScreen from '@screens/members';
import chatRoomsScreen from '@screens/chatRooms';

import chatScreen from '@screens/chat';
import userProfile from '@screens/userProfile';

import { COLORS } from '@lib/theme';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

console.disableYellowBox = true;

const tabNavigator = createBottomTabNavigator(
    {
        Members: {
            screen: membersScreen,
            navigationOptions: {
                title: 'Members',
                tabBarIcon: ({ focused, tintColor }) => (
                    <Icon name={focused ? 'ios-people' : 'ios-people-outline'} color={tintColor} size={28} />
                )
            }
        },
        Rooms: {
            screen: chatRoomsScreen,
            navigationOptions: {
                title: 'Rooms',
                tabBarIcon: ({ focused, tintColor }) => (
                    <Icon name={focused ? 'ios-chatbubbles' : 'ios-chatbubbles-outline'} color={tintColor} size={28} />
                )
            }
        }
    },
    {
        tabBarOptions: {
            activeTintColor: COLORS.primary
        }
    }
);

const innerNavigator = createStackNavigator(
    {
        MainScreen: {
            screen: tabNavigator,
            navigationOptions: {
                gesturesEnabled: false
            }
        },
        UserProfile: {
            screen: userProfile
        },
        Chat: {
            screen: chatScreen
        }
    },
    {
        navigationOptions: ({ navigation }) => {
            const { state } = navigation;
            let title;

            if (state.routes) {
                title = state.routes[navigation.state.index].routeName;
            } else {
                title = state.routeName;
            }

            return {
                title: title
            };
        }
    }
);

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
            screen: innerNavigator,
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

export default rootNavigator;
