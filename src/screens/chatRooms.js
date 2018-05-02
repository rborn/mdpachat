import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Image, Platform } from 'react-native';

import { COLORS, SIZES } from '../../src/lib/theme';

import { rooms } from '../lib/chat';

class ChatRoomsScreen extends Component {
    render() {
        return (
            <FlatList
                style={styles.flatList}
                data={rooms}
                keyExtractor={(item, idx) => {
                    return `roomItem_${idx}`;
                }}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.listItem}>
                            <Text style={styles.name}>{`${item.name}`}</Text>
                            <Text style={styles.time} numberOfLines={1} ellipsizeMode={'tail'}>
                                {`${item.lastMessageTime}`}
                            </Text>
                        </View>
                    );
                }}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
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
    },
    listItem: {
        flex: 1,
        flexDirection: 'row',
        height: 70,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.screenBackground
    },
    name: {
        marginLeft: 10,
        fontWeight: 'bold',
        fontSize: 16,
        color: COLORS.primaryText
    },
    time: {
        marginRight: 10,
        fontSize: 14,
        color: COLORS.darkText
    },
    flatList: {
        backgroundColor: COLORS.screenBackground
    },
    separator: {
        height: 1,
        backgroundColor: COLORS.lightBackground
    }
});

export default ChatRoomsScreen;
