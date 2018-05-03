import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Alert } from 'react-native';

class ErrorDialog extends Component {
    static propTypes = {
        title: PropTypes.string,
        onOk: PropTypes.func
    };

    render() {
        if (this.props.visible) {
            Alert.alert(this.props.title, this.props.message, [{ text: 'OK', onPress: this.props.onOk }]);
        }
        return null;
    }
}

export default ErrorDialog;
