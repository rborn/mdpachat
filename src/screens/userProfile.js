import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';

class UserProfile extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;

        return {
            title: params ? params.name : 'No idea'
        };
    };
    render() {
        return (
            <View>
                <Text>UserProfile</Text>
            </View>
        );
    }
}

export default UserProfile;
