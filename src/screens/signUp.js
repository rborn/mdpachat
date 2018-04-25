import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions } from 'react-native';

import { COLORS } from '../../src/lib/theme';

const { width } = Dimensions.get('window');

class SignUpScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>sign up</Text>
                <TextInput style={styles.input} placeholder={'Your Name'} placeholderTextColor={COLORS.lightText} />
                <TextInput style={styles.input} placeholder={'Your Email'} placeholderTextColor={COLORS.lightText} />
                <TextInput style={styles.input} placeholder={'Password'} placeholderTextColor={COLORS.lightText} />
                <TextInput
                    style={styles.input}
                    placeholder={'Confirm Password'}
                    placeholderTextColor={COLORS.lightText}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary
    },
    title: {
        color: COLORS.lightTransparentText,
        fontSize: 40,
        textAlign: 'center',
        margin: 10
    },
    input: {
        margin: 10,
        height: 30,
        color: COLORS.lightText,
        padding: 5,
        borderColor: COLORS.borderColor,
        borderRadius: 10,
        borderWidth: 1,
        width: width * 0.6
    }
});

export default SignUpScreen;
