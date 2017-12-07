import React, {PureComponent} from 'react';
import { Button, StatusBar, StyleSheet, TouchableOpacity, Text, TextInput, View } from 'react-native';
import AppStyles from '../appStyles/styles';

class SplashScreen extends PureComponent {
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
                <SplashGreeting style={{flex:4}}/>
                <SplashButton />
            </View>
        );
    }
};

class SplashGreeting extends PureComponent {
    render() {
        return (
            <View style={{flex:3, alignItems:'center'}}>
                <Text> </Text>
                <Text style={{
                    fontFamily:'titillium-web-bold',
                    color: 'white',
                    fontSize: 60
                }}> WELCOME </Text>
            </View>
        );
    }
};

class SplashButton extends PureComponent {
    render() {
        return (
            <View style={{flex:1, width:250}}>
                <Button title="proceed" color={AppStyles.AppColors.secondaryColor} onPress={()=>{}}/>
            </View>
        );
    }
}

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
