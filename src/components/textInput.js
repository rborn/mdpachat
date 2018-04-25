import React, { Component } from 'react';
import { StyleSheet, TextInput } from 'react-native';

import { COLORS, SIZES } from '../../src/lib/theme';

class Input extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TextInput
                style={styles.input}
                {...this.props}
                placeholderTextColor={COLORS.lightText}
                underlineColorAndroid={'transparent'}
            />
        );
    }
}

const styles = StyleSheet.create({
    input: {
        margin: SIZES.margin,
        height: SIZES.loginSignupInputHeight,
        color: COLORS.lightText,
        padding: SIZES.padding,
        borderColor: COLORS.borderColor,
        borderRadius: SIZES.loginSignupInputBorderRadius,
        borderWidth: SIZES.loginSignupInputBorderWidth,
        width: SIZES.loginSignupInputWidth
    }
});
export { Input };
