import React, {PureComponent} from 'react';
import { Button, StatusBar, StyleSheet, TouchableHighlight, Text, TextInput, View } from 'react-native';
import AppColors from '../appStyles/styles';

class SplashScreen extends PureComponent {
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                backgroundColor: AppColors.themeColor,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            <StatusBar
                backgroundColor="#4682B4"
                barStyle="light-content"
            />
                <SplashGreeting style={{flex:4}}/>
                <Button
                    style={{flex: 1}}
                    onPress={()=> {
                        navigate('Home', {});
                    }}
                    title="Proceed"
                />
            </View>
        );
    }
};

class SplashGreeting extends PureComponent {
    render() {
        return (
            <View style={{flex:1, alignItems:'center'}}>
                <Text> Welcome!!</Text>
                <Text></Text>
                <Text>Please Proceed</Text>
            </View>
        );
    }
};

export default SplashScreen;
