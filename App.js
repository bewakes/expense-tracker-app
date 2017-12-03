import React, {PureComponent} from 'react';
import SplashScreen from './src/SplashScreen/SplashScreen';
import HomeScreen from './src/HomeScreen/HomeScreen';
import AppColors from './src/appStyles/styles';
import { Button, View, Text } from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';

export default class App extends PureComponent {
    render() {
        return (
            <View style={{
                backgroundColor: AppColors.themeColor,
                flex:1,
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'center'
            }}>
                <View style={{flex:3, flexDirection:'column', justifyContent:'space-around'}}>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 40,
                        fontFamily: 'notoserif',
                        color: AppColors.headerColor
                    }}>
                        Welcome
                    </Text>
                </View>
                <View style={{flex:1}}>
                    <Button
                        color="pink"
                        onPress={()=>{}}
                        title="Proceed"
                    />
                </View>
            </View>
        );
    }
}

export const App1 = StackNavigator({
    Splash: {
        screen: SplashScreen,
        navigationOptions: {
            title: '',
            headerStyle: {
                backgroundColor: AppColors.themeColor
            }
        }
    },
    Home: { screen: HomeScreen },
});

