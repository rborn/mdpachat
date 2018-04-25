import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS } from '../../src/lib/theme';

class SignUpScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>sign up</Text>
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
    }
});

export default SignUpScreen;
