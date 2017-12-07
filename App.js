import React, {PureComponent} from 'react';
import SplashScreen from './src/SplashScreen/SplashScreen';
import HomeScreen from './src/HomeScreen/HomeScreen';
import AppColors from './src/appStyles/styles';
import { Button, View, Text } from 'react-native';
import {Font} from 'expo';
import {
  StackNavigator,
} from 'react-navigation';

export default class App extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {ready: false}
    }
    componentDidMount() {
        Font.loadAsync({
        'titillium-web-bold': require('./assets/fonts/TitilliumWeb-Bold.ttf'),
        'titillium-web-black': require('./assets/fonts/TitilliumWeb-Black.ttf'),
        'titillium-web-regular': require('./assets/fonts/TitilliumWeb-Regular.ttf'),
        });
        this.setState({ready:true});
  }

    render() {
        if (!this.state.ready) {
            return (
                <Text>Loading..</Text>
            );
        }
        return (
            <SplashScreen />
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

