import React, {Component} from 'react';
import {View, Text} from 'react-native';

class ViewWrappedText extends Component {
    render() {
        return (
            <Text> Bibeks </Text>
        );
    }
    renders() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text>Bibek</Text>
            </View>
        );
    }
};
export default ViewWrappedText;
