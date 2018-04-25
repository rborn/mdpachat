import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';

import { Input } from '../../src/components/textInput';
import { COLORS, SIZES } from '../../src/lib/theme';

class SignUpScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.backButton}>
                    <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>

                <Text style={styles.title}>sign up</Text>

                <Input placeholder={'Your Name'} />
                <Input placeholder={'Your Email'} />
                <Input placeholder={'Password'} secureTextEntry={true} />
                <Input placeholder={'Confirm Password'} secureTextEntry={true} />

                <TouchableOpacity style={styles.signupButton}>
                    <Text style={styles.signupButtonText}>Sign Up</Text>
                </TouchableOpacity>
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
    signupButton: {
        margin: SIZES.margin,
        height: SIZES.loginSignupInputHeight,
        padding: SIZES.padding,
        borderRadius: SIZES.loginSignupInputBorderRadius,
        width: SIZES.loginSignupInputWidth,
        backgroundColor: COLORS.lightButtonBackground,
        alignItems: 'center'
    },
    signupButtonText: {
        color: COLORS.darkText
    },
    backButton: {
        position: 'absolute',
        left: 20,
        top: Platform.OS === 'ios' ? 40 : 20
    },
    backButtonText: {
        color: COLORS.lightText,
        fontSize: 20
    }
});

export default SignUpScreen;
