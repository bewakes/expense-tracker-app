import React, {PureComponent} from 'react';
import SplashScreen from './src/SplashScreen/SplashScreen';
import HomeScreen from './src/HomeScreen/HomeScreen';
import AppStyles from './src/appStyles';
import { Text, Alert, View} from 'react-native';
import {Font} from 'expo';
import {facebookLogin, handleIdentity} from './src/api';
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
        const data = await handleIdentity();
        if (data !== null) {
            userIdentity = data.identity;
            const loggedIn = true;
            const ready = true;
            this.setState({loggedIn, userIdentity, ready});
            return;
        }
        this.setState({ready:true});
    }

    doLogin = async () => {
        data = await facebookLogin();
        if (data.status) {
            userIdentity = data.identity;
            const loggedIn = true;
            this.setState({loggedIn, userIdentity});
        }
        else {
            Alert.alert('message: '+logindata.message);
        }
    }

    render() {
        if (!this.state.ready) {
            console.log('NOTREADY');
            return (
                <View style={{
                    flex:1,
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: AppStyles.primaryColor,
                }}>
                    <Text style={{flex:1}}>
                        Making things Ready.. Just for you.
                    </Text>
                </View>
            );
        }
        if (!this.state.loggedIn) {
            console.log('NOT LOGGED IN');
            return (
                <SplashScreen handleLogin={this.doLogin} />
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
                backgroundColor: AppStyles.themeColor
            }
        }
    },
    Home: { screen: HomeScreen },
});

