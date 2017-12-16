import {AsyncStorage} from 'react-native';

export const base_url = "https://expenses.bewakes.com/";

export let headers = new Headers();
export let identity = {};

export const handleIdentity = async () => {
    try {
        const value = await AsyncStorage.getItem('@auth:cookie');
        if (value !== null){
            headers = new Headers();
            headers.append('Cookie', value);
            const response = await fetch(
                base_url+"identity/", {
                method: 'GET',
                headers: headers
            });
            if (response.status !== 200) {
                console.warn(response.status);
                return null;
            }
            // TODO: save cookie to a global state
            identity = await response.json();
            return identity;

        }
    } catch (error) {
        // Error retrieving data
        console.log("Couldn't get Cookie");
        return null;
    }
};


export const apiGet = async (endpoint, params) => {
    params.organization = identity.default_organization.id;
    const paramsstr = Object.keys(params).reduce(
        (a,e) => { return a+e+'='+params[e]+'&'}, '?'
    );
    const response = await fetch(base_url+endpoint+paramsstr, {
        method: 'GET',
        headers: headers,
    });
    if (response.status === 200) {
        const data = await response.json();
        return {
            status: true,
            data: data
        };
    }
    console.warn(endpoint+paramsstr + " : " + response.status);
    return {
        status: false,
        data: null,
        message: "Error "+ response.status+" occured"
    }
};


export const apiPost = async (endpoint, data) => {
    data.modified_by = identity.id;
    data.organization = identity.default_organization.id;
    const newheaders = headers;
    newheaders.append('Content-Type', 'application/json');
    newheaders.append('Referer', base_url);
    const token = headers.get('Cookie').match(/csrftoken=([a-zA-Z0-9]+);.*/)[1];
    newheaders.append('X-CSRFToken', token);

    const response = await fetch(base_url+endpoint, {
        method: 'POST',
        headers: newheaders,
        body: JSON.stringify(data)
    });
    console.log(response);
    if (response.status >=200 && response.status <= 300) {
        return {
            status: true,
        };
    }
    return {
        status: false,
    };
};
