import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';

import { COLORS } from '../lib/theme';
import { watchUsers } from '../lib/api';

class MembersScreen extends Component {
    state = {
        members: []
    };
    componentDidMount() {
        watchUsers(members => {
            this.setState({ members });
        });
    }
    render() {
        return (
            <FlatList
                style={styles.flatList}
                data={this.state.members}
                keyExtractor={(item, idx) => {
                    return `userItem_${idx}`;
                }}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.listItem}>
                            <Image style={styles.userAvatar} source={{ uri: item.photo }} />
                            <Text style={styles.userName}>{`${item.name}`}</Text>
                            <Text style={styles.userDescription} numberOfLines={1} ellipsizeMode={'tail'}>
                                {`${item.description || ''}`}
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
    listItem: {
        height: 70,
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
        backgroundColor: COLORS.screenBackground
    },
    separator: {
        height: 1,
        backgroundColor: COLORS.lightBackground
    }
});

export default MembersScreen;
