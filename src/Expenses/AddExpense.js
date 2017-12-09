import React from 'react';
import {Text, View, Button} from 'react-native';

export default class AddExpense extends React.PureComponent {
    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={{
                flex:1,
                flexDirection: 'column'
            }}>
                <Button
                    title="List Expenses"
                    onPress={() =>
                        navigate('expenses', {})
                    }
                />
            </View>
        );
    }
}
