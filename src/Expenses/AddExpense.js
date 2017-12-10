import React from 'react';
import {Text, TextInput, View, Button, Picker} from 'react-native';
import AppStyles from '../appStyles';

export default class AddExpense extends React.PureComponent {
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
                    title="List Expenses"
                    onPress={() =>
                        navigate('expenses', {})
                    }
                />
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
            <View style={{
                flex:1,
                flexDirection:'column',
                justifyContent:'flex-start',
            }}>
                <FormElement
                    label="Cost"
                    type="numeric"
                    errorCondition={(x)=>(x.length>2)}
                />
                <FormElement
                    type="picker"
                    label="Category"
                    pickerData={[]}
                />
            </View>
        );
    }
}


class FormElement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
            error: false,
            style: {}
        };
    }

    handleChange = (text) => {
        if (this.props.errorCondition(text)) {
            this.setState({
                value:text,
                error:true,
            });
        }
        else {
            this.setState({value:text, error:false});
        }
    }

    render() {
        let colorstyle = this.state.error ? {color:AppStyles.formErrorColor}:{};
        if (this.props.type === 'text' | this.props.type === 'numeric') {
            return this.render_text(colorstyle);
        }
        else if (this.props.type === 'picker') {
            return this.render_picker(colorstyle);
        }
    }

    render_text(colorstyle) {
        let value = this.state.value;
        return (
            <View style={{flexDirection:'column'}}>
                <View style={{flexDirection:'row', justifyContent:'center'}}>
                    <Text style={{
                        ...AppStyles.textStyle,
                        fontSize: 25,
                        flex: 1,
                        ...colorstyle
                    }}>
                        {this.props.label}
                    </Text>
                </View>
                <TextInput
                    style={{
                        ...AppStyles.textInputStyle,
                        ...this.state.style,
                        ...colorstyle,
                    }}
                    underlineColorAndroid={this.state.error?AppStyles.formErrorColor : AppStyles.primaryColor}
                    keyboardType = 'numeric'
                    onChangeText = {(text)=> this.handleChange(text)}
                    value = {value!=null ? value.toString() : ''}
                />
            </View>
        );
    }

    render_picker(colorstyle) {
        return (
            <View style={{flexDirection:'column'}}>
                <View style={{flexDirection:'row', justifyContent:'center'}}>
                    <Text style={{
                        ...AppStyles.textStyle,
                        fontSize: 25,
                        flex: 1,
                        ...colorstyle
                    }}>
                        {this.props.label}
                    </Text>
                </View>
                <Picker>
                    <Picker.Item label="JavaScript" value="js" />
                    <Picker.Item label="JavaScript" value="js" />
                    <Picker.Item label="JavaScript" value="js" />
                    <Picker.Item label="JavaScript" value="js" />
                </Picker>
            </View>
        );
    }
}
