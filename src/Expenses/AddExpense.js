import React from 'react';
import {Text, ScrollView, View, Button, Alert} from 'react-native';
import AppStyles, {FormElement} from '../appStyles';
import {getCategories, addExpense} from '../api';

export default class AddExpense extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            formdata: {}
        }
    }

    _validateFormData = (data) => {
        if(data.date == undefined || data.date == null){
            data.date = (new Date()).toISOString();
        }
        if(data.category == undefined || data.category == null) {
            if (this.state.categories.length == 0) {
                return {
                    status: false,
                    message: 'Please Add Category'
                }
            }
            data.category = this.state.categories[0].id;
        }
        if(data.cost == undefined || data.cost == null || data.cost.trim() == '') {
            return {
                status: false,
                message: 'Invalid/Empty Cost'
            }
        }
        return {
            status: true,
            data: data
        }
    }

    sendFormData = async () => {
        const validation = this._validateFormData(this.state.formdata);
        if (!validation.status) {
            Alert.alert(validation.message);
            return;
        }
        const data = validation.data;
        const response = await addExpense(data);
        if (response.status) {
            Alert.alert('success');
        }
        else Alert.alert('Fail');
    }

    async componentWillMount () {
        const categories = await getCategories();
        this.setState({categories});
    }

    updateData = (data) => {
        let formdata = data
        this.setState({formdata});
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
                <ExpenseForm updateData={this.updateData} categories={this.state.categories} />
                <Button
                    style={{flex:1}}
                    title="Add Expense"
                    color={AppStyles.secondaryColor}
                    onPress={this.sendFormData}
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
        };
        this.data = {};
    }

    updateData =  (item, data) => {
        this.data[item] = data;
        this.props.updateData(this.data);
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
                    onChange={(data) => this.updateData("cost", data)}
                    placeholder="Amount in Rs."
                    errorCondition={(x)=>(x.length>2)}
                />
                <FormElement
                    type="picker"
                    label="Category"
                    onChange={(data) => this.updateData("category", data)}
                    items={this.props.categories}
                />
                <FormElement
                    type="date"
                    onChange={(data) => this.updateData("date", data)}
                    label="Date"
                />
                <FormElement
                    label="Items"
                    type="text"
                    onChange={(data) => this.updateData("items", data)}
                    placeholder="Items bought(Optional)"
                    errorCondition={(x)=>false}
                />
                <FormElement
                    flex={2}
                    label="Description"
                    onChange={(data) => this.updateData("description", data)}
                    placeholder="Expense Description(Optional)"
                    type="textarea"
                    errorCondition={(x)=>false}
                />
            </ScrollView>
        );
    }
}
