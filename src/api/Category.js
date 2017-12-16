import {base_url, headers, identity} from './APIRoot';
const categories = [
    {
        "id": 1,
        "organization": 3,
        "name": "groccery",
        "uses": 0
    },
    {
        "id": 3,
        "organization": 3,
        "name": "Movie",
        "uses": 0
    },
    {
        "id": 5,
        "organization": 3,
        "name": "Daily use",
        "uses": 0
    },
    {
        "id": 6,
        "organization": 3,
        "name": "Fruits",
        "uses": 0
    },
    {
        "id": 8,
        "organization": 3,
        "name": "Miscellaneous",
        "uses": 0
    },
];

export const getCategories = async () => {
    const endpoint = '/categories/?organization='+identity.default_organization.id;
    const response = await fetch(base_url+endpoint, {
            method: 'GET',
            headers: headers,
    });
    if (response.status === 200) {
        const data = await response.json();
        return data;
    }
    console.warn("GET CATEGORIES: " + response.status);
    return [];
};
