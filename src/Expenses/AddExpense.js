import React from 'react';
import {Text, ScrollView, View, Button} from 'react-native';
import AppStyles, {FormElement} from '../appStyles';
import {getCategories} from '../apiCalls/Category'; // TODO: import from index.js

export default class AddExpense extends React.PureComponent {
    componentDidMount () {
        getCategories();
    }
    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={{
                flex:1,
                flexDirection: 'column',
                backgroundColor: 'white',
                padding:15,
            }}>
                <ExpenseForm />
                <Button
                    style={{flex:1}}
                    title="Add Expense"
                    color={AppStyles.secondaryColor}
                    onPress={() =>
                        navigate('expenses', {})
                    }
                />
                <Text>  </Text>
            </View>
        );
    }
}

class ExpenseForm extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            category: null,
            items: '',
            cost: 0,
            description: ''
        }
    }

    onChangeCost = (text) => {
        this.setState({cost: text});
    }

    render() {
        return (
            <ScrollView style={{
                flex:1,
                flexDirection:'column',
                //justifyContent:'flex-start',
            }}>
                <FormElement
                    label="Cost"
                    type="numeric"
                    placeholder="Amount in Rs."
                    errorCondition={(x)=>(x.length>2)}
                />
                <FormElement
                    type="picker"
                    label="Category"
                    pickerData={[]}
                />
                <FormElement
                    type="date"
                    label="Date"
                />
                <FormElement
                    label="Items"
                    type="text"
                    placeholder="Items bought(Optional)"
                    errorCondition={(x)=>false}
                />
                <FormElement
                    flex={2}
                    label="Description"
                    placeholder="Expense Description(Optional)"
                    type="textarea"
                    errorCondition={(x)=>false}
                />
            </ScrollView>
        );
    }
}
