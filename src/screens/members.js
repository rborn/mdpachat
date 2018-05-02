import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Image, Platform } from 'react-native';

import { COLORS, SIZES } from '../../src/lib/theme';

import { users } from '../lib/users';

class MembersScreen extends Component {
    render() {
        return (
            <FlatList
                style={styles.flatList}
                data={users}
                keyExtractor={(item, idx) => {
                    return `userItem_${idx}`;
                }}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.listItem}>
                            <Image style={styles.userAvatar} source={{ uri: item.picture }} />
                            <Text style={styles.userName}>{`${item.name}`}</Text>
                            <Text style={styles.userDescription} numberOfLines={1} ellipsizeMode={'tail'}>
                                {`${item.about}`}
                            </Text>
                        </View>
                    );
                }}
                inverted
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
        height: 70,
        marginBottom: 1,
        justifyContent: 'center',
        backgroundColor: COLORS.screenBackground
    },
    userAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: COLORS.primary,
        position: 'absolute',
        top: 10,
        left: 10
    },
    userName: {
        marginLeft: 70,
        fontWeight: 'bold',
        fontSize: 16,
        color: COLORS.primaryText
    },
    userDescription: {
        marginLeft: 70,
        marginRight: 25,
        fontSize: 14,
        color: COLORS.darkText
    },
    flatList: {
        marginTop: Platform.OS == 'ios' ? 20 : 0,
        backgroundColor: COLORS.lightBackground
    }
});

export default MembersScreen;
