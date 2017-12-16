import Expo from 'expo';
import {Alert, AsyncStorage} from 'react-native';
import {base_url, handleIdentity} from './APIRoot';

const appid = '792424380907534';
const facebookLogin = async () => {
    console.log('logging with fb');
    const {type, token} = await Expo.Facebook.logInWithReadPermissionsAsync(appid, {
      permissions: ['public_profile', 'email', 'user_friends'],
    })
    console.log(token);
    if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
            base_url+"expenses/facebook/login?access_token="+token);
        if (response.status !== 200) {
            Alert.alert('Login Failed!!');
            return {
                status: false,
            }
        }
        console.log(response.headers.map['set-cookie']);
        const value = await AsyncStorage.setItem('@auth:cookie', response.headers.map['set-cookie'][0]);
        const identity = handleIdentity();
        if (identity != null ) {
            return {
                status: true,
                identity: identity
            }
        }
    }
    return {
        status: false,
        error: '',
        message: "Can't Login"
    };
}

export default facebookLogin;
