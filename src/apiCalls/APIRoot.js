import {AsyncStorage} from 'react-native';

const base_url = "https://expenses.bewakes.com";


export const doLogin = (loginData)  => {
};


export const handleIdentity = () => {
    try {
        const value = await AsyncStorage.getItem('@auth:cookie');
        if (value !== null){
            console.log(value);
        }
    } catch (error) {
        // Error retrieving data
        // TODO: throw back to login screen
        console.log("Couldn't get Cookie");
    }
};
