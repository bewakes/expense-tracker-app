const cookie = '_ga=GA1.2.865769719.1509612318; csrftoken=VjXZKsVl6QYHfqzTWYuM7bUraBe0iyy4wMmfIUCIKpGU9OwFISInUVn4rILQa9Fe; sessionid=nqqz4v92mo2qsxbe64u6kvar8nwee7e9';
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

export const getCategories = () => {
    fetch('https://expenses.bewakes.com/categories/?organization=3', {
            method: 'GET',
            headers: {'Cookie': cookie},
        })
        .then(response => {console.log(response.json());});
        //.then(data => {this.props.sendData(data);});
};
