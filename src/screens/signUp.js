import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { Input } from '../../src/components/textInput';
import { COLORS, SIZES } from '../../src/lib/theme';

class SignUpScreen extends Component {
    onPressBack = () => {
        this.props.navigation.navigate('Login');
    };

    render() {
        const padding = Platform.OS == 'ios' ? 'padding' : null;
        return (
            <KeyboardAvoidingView style={styles.container} behavior={padding} enabled>
                <ScrollView style={styles.scrollview} contentContainerStyle={styles.scrollContainer}>
                    <Text style={styles.title}>sign up</Text>

                    <Input placeholder={'Your Name'} />
                    <Input placeholder={'Your Email'} />
                    <Input placeholder={'Password'} secureTextEntry={true} />
                    <Input placeholder={'Confirm Password'} secureTextEntry={true} />

                    <TouchableOpacity style={styles.signupButton}>
                        <Text style={styles.signupButtonText}>Sign Up</Text>
                    </TouchableOpacity>
                </ScrollView>
                <TouchableOpacity style={styles.backButton} onPress={this.onPressBack}>
                    <Icon
                        name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'}
                        size={30}
                        color={COLORS.lightText}
                    />
                    <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>
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
        color: COLORS.darkText,
        fontSize: 15
    },
    backButton: {
        flexDirection: 'row',
        position: 'absolute',
        alignItems: 'center',
        left: 20,
        top: Platform.OS === 'ios' ? 40 : 20,
        height: 30
    },
    backButtonText: {
        marginLeft: SIZES.margin,
        color: COLORS.lightText,
        fontSize: 20
    }
});

export default SignUpScreen;
