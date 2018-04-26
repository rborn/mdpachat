import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { Input } from '../../src/components/textInput';
import { COLORS, SIZES } from '../../src/lib/theme';

class SignUpScreen extends Component {
    onPressSignup = () => {
        this.props.navigation.navigate('Signup');
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>login</Text>

                <Input placeholder={'Your Email'} />
                <Input placeholder={'Password'} secureTextEntry={true} />

                <TouchableOpacity style={styles.loginButton}>
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>
                <Text style={styles.infoText}>Not a member yet?</Text>

                <TouchableOpacity style={styles.signupButton} onPress={this.onPressSignup}>
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
        margin: SIZES.margin
    },
    loginButton: {
        margin: SIZES.margin,
        height: SIZES.loginSignupInputHeight,
        padding: SIZES.padding,
        borderRadius: SIZES.loginSignupInputBorderRadius,
        width: SIZES.loginSignupInputWidth,
        backgroundColor: COLORS.lightButtonBackground,
        alignItems: 'center'
    },
    loginButtonText: {
        color: COLORS.darkText,
        fontSize: 15
    },
    infoText: {
        marginBottom: 0,
        marginTop: 20,
        color: COLORS.lightText,
        fontSize: 12
    },
    signupButton: {
        marginTop: 0,
        padding: SIZES.padding
    },
    signupButtonText: {
        color: COLORS.lightText,
        fontSize: 15
    }
});

export default SignUpScreen;
