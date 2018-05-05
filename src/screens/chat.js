import React, { Component, Fragment } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '@lib/theme';
import { watchMessages, watchUsers } from '@lib/api';

import _ from 'lodash';

class Chat extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;

        return {
            title: params ? params.name : 'No idea'
        };
    };

    state = {
        messages: [],
        members: []
    };

    async componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            console.log(user);
            this.setState({ currentUserId: user.uid });
        });

        watchMessages(messages => {
            this.setState({ messages });
        });
        watchUsers(members => {
            this.setState({ members });
        });
    }

    render() {
        const behavior = Platform.OS == 'ios' ? 'padding' : null;
        return (
            <KeyboardAvoidingView style={styles.container} behavior={behavior}>
                <FlatList
                    style={styles.flatList}
                    data={this.state.messages}
                    keyExtractor={(item, idx) => {
                        return `messageItem_${idx}`;
                    }}
                    renderItem={({ item }) => {
                        const user = this.state.members[item.userId];

                        let userPhoto;
                        if (user && user.photo) {
                            userPhoto = user.photo;
                        }

                        console.log(this.state);
                        const isOwnMessage = item.userId == this.state.currentUserId;

                        return (
                            <View style={[styles.listItem, isOwnMessage ? styles.ownItem : styles.othersItem]}>
                                <Image style={styles.userAvatar} source={{ uri: userPhoto }} />
                                <Text
                                    style={[styles.message, isOwnMessage ? styles.ownMessage : styles.othersMessage]}
                                >{`${item.text}`}</Text>
                            </View>
                        );
                    }}
                    inverted
                />
                <View style={styles.sendWrapper}>
                    <TextInput
                        style={styles.sendInput}
                        {...this.props}
                        placeholderTextColor={COLORS.lightText}
                        underlineColorAndroid={'transparent'}
                    />
                    <TouchableOpacity>
                        <Icon style={styles.sendButton} name={'ios-send-outline'} size={40} color={COLORS.primary} />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    sendWrapper: {
        height: 70,
        backgroundColor: COLORS.secondary,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10
    },
    sendInput: {
        flex: 1,
        height: 60,
        padding: 10,
        backgroundColor: COLORS.screenBackground,
        borderColor: COLORS.lightBackground,
        borderWidth: 1
    },
    sendButton: {
        margin: 10
    },
    listItem: {
        backgroundColor: COLORS.screenBackground,
        flexDirection: 'row',
        paddingHorizontal: 5,
        paddingVertical: 5,
        alignItems: 'center'
    },
    ownItem: {
        flexDirection: 'row-reverse'
    },
    othersItem: {
        flexDirection: 'row'
    },
    userAvatar: {
        width: 26,
        height: 26,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: COLORS.primary
    },
    message: {
        fontSize: 16,
        color: COLORS.primaryText,
        borderRadius: 10,
        paddingVertical: 3,
        paddingHorizontal: 10,
        overflow: 'hidden'
    },
    ownMessage: {
        marginLeft: 30,
        marginRight: 5,
        backgroundColor: COLORS.primary,
        color: COLORS.lightText
    },
    othersMessage: {
        marginLeft: 5,
        marginRight: 30,
        backgroundColor: COLORS.secondary,
        color: COLORS.darkText
    },
    flatList: {
        backgroundColor: COLORS.screenBackground
    }
});

export default Chat;
