import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';

import { Input } from '../../src/components/textInput';
import { COLORS, SIZES } from '../../src/lib/theme';
import { login } from '../lib/api';

class LoginScreen extends Component {
    static propTypes = {
        navigation: PropTypes.object
    };

    state = {
        email: null,
        password: null
    };

    onPressSignup = () => {
        this.props.navigation.navigate('Signup');
    };

    onLoginPress = async () => {
        if (!this.state.email || !this.state.password) {
            console.log('empty email or password');
        } else {
            const loggedIn = await login(this.state);
            if (!loggedIn.error) {
                this.props.navigation.navigate('Tabs');
            } else {
                console.log(loggedIn);
            }
        }
    };

    render() {
        const behavior = Platform.OS == 'ios' ? 'padding' : null;

        return (
            <KeyboardAvoidingView style={styles.container} behavior={behavior}>
                <ScrollView
                    style={styles.scrollview}
                    contentContainerStyle={styles.scrollContainer}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps={'handled'}
                >
                    <View style={styles.wrapper}>
                        <Text style={styles.title}>login</Text>

                        <Input
                            placeholder={'Your Email'}
                            onChangeText={text => this.setState({ email: text })}
                            value={this.state.email}
                        />
                        <Input
                            placeholder={'Password'}
                            secureTextEntry={true}
                            onChangeText={text => this.setState({ password: text })}
                            value={this.state.password}
                        />

                        <TouchableOpacity style={styles.loginButton} onPress={this.onLoginPress}>
                            <Text style={styles.loginButtonText}>Login</Text>
                        </TouchableOpacity>
                        <Text style={styles.infoText}>Not a member yet?</Text>

                        <TouchableOpacity style={styles.signupButton} onPress={this.onPressSignup}>
                            <Text style={styles.signupButtonText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
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
    wrapper: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    scrollview: {
        flex: 1,
        width: '100%'
    },
    scrollContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
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

export default LoginScreen;
