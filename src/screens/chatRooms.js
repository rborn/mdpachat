import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS, SIZES } from '../../src/lib/theme';

class ChatRoomsScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>ChatRooms</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.screenBackground
    },
    title: {
        color: 'red',
        fontSize: 40,
        textAlign: 'center',
        margin: SIZES.margin
    }
});

export default ChatRoomsScreen;
