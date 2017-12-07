import React from 'react';
import { Text, View, Button } from 'react-native';

export default class Expenses extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
        <View>
            <Text></Text>
            <Button
                title="Add expense"
                onPress={() =>
                navigate('addExpense', {})
                }
            />
        </View>
    );
  }
}

