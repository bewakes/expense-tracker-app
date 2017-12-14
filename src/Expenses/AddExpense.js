import React from 'react';
import {Text, ScrollView, TextInput, View, KeyboardAvoidingView, Button, Picker, DatePickerAndroid} from 'react-native';
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


class FormElement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
            error: false,
            style: {},
            dateValue: (new Date()).toDateString(),
        };
    }

    async onDateFocus() {
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
                // Use `new Date()` for current date.
                // May 25 2020. Month 0 is January.
                date: new Date()
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                let d =  new Date(year, month, day);
                this.setState({dateValue: d.toDateString()})
            }
            this.refs.DatePicker.blur();
        } catch ({code, message}) {
            this.refs.DatePicker.blur();
            console.warn('Cannot open date picker', message);
        }
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
        let renderElement = <View/>
        if (this.props.type === 'text' | this.props.type === 'numeric' | this.props.type === 'textarea') {
            renderElement = this.render_text(colorstyle);
        }
        else if (this.props.type === 'picker') {
            renderElement = this.render_picker(colorstyle);
        }
        else if (this.props.type === 'date') {
            renderElement = this.render_date_picker(colorstyle);
        }
        return (
            <View
                behavior="position"
                style={{flexDirection:'column',
                    flex:this.props.flex|1,
                    marginBottom:5
                }}>
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
                {renderElement}
            </View>
        );
    }

    render_date_picker(colorstyle) {
        let value = this.state.dateValue;
        return (
            <TextInput
                ref="DatePicker"
                style={{
                    ...AppStyles.textInputStyle,
                    ...this.state.style,
                    ...colorstyle,
                }}
                underlineColorAndroid={this.state.error?AppStyles.formErrorColor : AppStyles.primaryColor}
                onFocus = {async () => this.onDateFocus()}
                onChangeText = {async (text) => this.onDateFocus()}
                value = {value!=null ? value.toString() : ''}
            />
        );
    }

    render_text(colorstyle) {
        let value = this.state.value;
        let proptype = {};
        if (this.props.type === 'numeric') proptype.keyboardType = 'numeric';
        if (this.props.type === 'textarea') {
            proptype.multiline = true;
            proptype.numberOfLines = 4;
        }
        return (
                <TextInput
                    style={{
                        ...AppStyles.textInputStyle,
                        ...this.state.style,
                        ...colorstyle,
                    }}
                    placeholder={this.props.placeholder}
                    underlineColorAndroid={this.state.error?AppStyles.formErrorColor : AppStyles.primaryColor}
                    {...proptype}
                    onChangeText = {(text)=> this.handleChange(text)}
                    value = {value!=null ? value.toString() : ''}
                />
        );
    }

    render_picker(colorstyle) {
        return (
                <Picker>
                    <Picker.Item label="JavaScript" value="js" />
                    <Picker.Item label="JavaScript" value="js" />
                    <Picker.Item label="JavaScript" value="js" />
                    <Picker.Item label="JavaScript" value="js" />
                </Picker>
        );
    }
}
