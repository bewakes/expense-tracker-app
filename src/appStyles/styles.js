const textColor = '#777777';

export default AppStyles = {
    // colors
    primaryColor: '#1e90ff', // bluish
    headerColor: 'white',
    cardColor: 'white',
    cardTouchColor: '#eeeeee',
    secondaryColor: '#0dba2f', //'#ff9900',
    secondaryColorDark: '#ff6600',
    textColor: textColor,
    dimTextColor: '#888888',
    screenBackgroundColor: '#cccccc',

    textStyle: {
        //fontWeight: 'bold',
        color: textColor,
        fontFamily: 'titillium-web-bold'
    },

    buttonStyle: {
        width: 250,
        padding: 5,
        borderRadius: 2,
        shadowOffset: {width:4, height:4},
        shadowColor: 'black',
        shadowOpacity: 0.5,
        alignItems: 'center'
    },
    shadowStyle: {
        shadowOffset: {width:2, height:2},
        shadowColor: 'black',
        shadowOpacity: 0.5,
    },
    cardStyleV: {
        flexDirection: 'column',
        minHeight:60,
        backgroundColor: 'white',
        //borderRadius: 1,
        padding: 7,
        borderBottomColor: '#dddddd',
        borderBottomWidth: 0.75,
    },
    smallCardStyle: {
        padding: 7,
        //borderRadius:1,
        borderBottomColor: '#dddddd',
        borderBottomWidth: 0.5,
        minHeight: 25,
    },

    cardStyleH: {
    }
}
