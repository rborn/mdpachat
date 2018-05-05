import React, { Component } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import PropTypes from 'prop-types';

import { COLORS, SIZES } from '../lib/theme';

class Input extends Component {
    static propTypes = {
        placeholder: PropTypes.string.isRequired
    };

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
