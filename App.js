import React, {PureComponent} from 'react';
import SplashScreen from './src/SplashScreen/SplashScreen';
import HomeScreen from './src/HomeScreen/HomeScreen';
import AppColors from './src/appStyles/styles';
import { Text } from 'react-native';
import {Font} from 'expo';
import {identityHandler} from './src/Helpers';
import {
  StackNavigator,
} from 'react-navigation';

export default class App extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            ready: false,
            loggedIn:false,
            userIdentity: null
        }
    }
    async componentDidMount() {
        await Font.loadAsync({
            'titillium-web-bold': require('./assets/fonts/TitilliumWeb-Bold.ttf'),
            'titillium-web-black': require('./assets/fonts/TitilliumWeb-Black.ttf'),
            'titillium-web-regular': require('./assets/fonts/TitilliumWeb-Regular.ttf'),
            'roboto-medium': require('./assets/fonts/Roboto-Medium.ttf'),
        });
        this.setState({ready:true});
    }

    onLoginPress = () => {
        this.doLogin();
    }

    doLogin = () => {
        const loggedIn = true;
        const data = {};
        const userIdentity = identityHandler(data);
        this.setState({loggedIn, userIdentity});
    }

    render() {
        if (!this.state.ready) {
            console.log('NOTREADY');
            return (
                <Text>Loading..</Text>
            );
        }
        if (!this.state.loggedIn) {
            console.log('NOT LOGGED IN');
            return (
                <SplashScreen onLoginPress={this.onLoginPress} />
            );
        }
        console.log('LOGGED IN');
        return (
            <HomeScreen userDetails={this.state.userDetails} />
        )
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

