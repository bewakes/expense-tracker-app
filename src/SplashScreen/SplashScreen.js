import React, {PureComponent} from 'react';
import { Button, StatusBar, StyleSheet, TouchableOpacity, Text, TextInput, View } from 'react-native';
import AppStyles from '../appStyles/styles';
import {FacebookButton} from '../FacebookLogin';

class SplashScreen extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                backgroundColor: AppStyles.AppColors.primaryColor,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            <StatusBar
                backgroundColor="#4682B4"
                barStyle="light-content"
            />
                <SplashTitle />
                <SplashSubText />
                <SplashButton onLoginPress={this.props.onLoginPress} />
            </View>
        );
    }
};

class SplashTitle extends PureComponent {
    render() {
        return (
            <View style={{
                flex:4,
                justifyContent:'center',
                alignItems:'center'
            }}>
                <Text style={{
                    fontFamily:'titillium-web-bold',
                    color: 'white',
                    fontSize: 57
                }}>EXPENSE TRACKER</Text>
            </View>
        );
    }
};

class SplashSubText extends PureComponent {
    render() {
        return (
            <View style={{
                flex:7,
                justifyContent:'flex-start',
                alignItems:'center'
            }}>
                <Text style={{
                    fontFamily:'titillium-web-regular',
                    color: 'white',
                    fontSize: 35,
                    textAlign: 'center'
                }}>Never lose track of what you spend again</Text>
            </View>
        );
    }
}

class SplashButton extends PureComponent {
    constructor(props) {
        super(props);
    }

    handleLoginPress = (e) => {
        this.props.onLoginPress();
    }

    render() {
        return (
            <View style={{
                flex:3,
                width:250,
                justifyContent: 'flex-start'
            }}>
                <FacebookButton onPress={this.handleLoginPress} />
            </View>
        );
    }
}

// not used
const touchable = (
<TouchableOpacity style={{
                    backgroundColor: AppStyles.AppColors.secondaryColor,
                    ... AppStyles.buttonStyle
                }}
                onPress={() => {}}
                >
                    <Text style={{
                        color: 'white',
                        fontSize: 20,
                        fontFamily: 'titillium-web-bold',
                        fontWeight: 'bold',
                    }}>PROCEED</Text>
                </TouchableOpacity>

)

export default SplashScreen;
