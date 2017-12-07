import React from 'react';
import {View, Text} from 'react-native';
import AppColors from './appStyles/styles';

export default class Loading extends React.PureComponent {
    render() {
        return (
            <View style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: AppColors.themeColor
            }}>
                <Text style={{flex:1}}>
                    Loading..
                </Text>
            </View>
        );
    }
}
