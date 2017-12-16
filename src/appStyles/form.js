import React from 'react';
import {Text, ScrollView, TextInput, View, Button, Picker, DatePickerAndroid} from 'react-native';
import AppStyles from '../appStyles';

export default class FormElement extends React.Component {
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
        const today = new Date();
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
                // Use `new Date()` for current date.
                // May 25 2020. Month 0 is January.
                date: today
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                let d =  new Date(year, month, day);
                let dd = new Date(year-1, month, day+1)
                this.props.onChange(dd.toISOString());
                this.setState({dateValue: d.toDateString()})
            }
            this.refs.DatePicker.blur();
        } catch ({code, message}) {
            //this.props.onChange(d.toISOString().substr(0, 10);
            this.refs.DatePicker.blur();
            console.warn('Cannot open date picker', message);
        }
    }

    handlePickerChange = (v, i) => {
        this.setState({value:v});
        console.log('calling onchange, ' + v);
        this.props.onChange(v);
    }

    handleChange = (text) => {
        if (this.props.errorCondition(text)) {
            this.setState({
                value:text,
                error:true,
            });
        }
        else {
            this.props.onChange(text);
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
                    marginBottom: 8
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
                onChangeText = {(text) => this.handleChange(text)}
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
                <Picker
                    onValueChange={this.handlePickerChange}
                    selectedValue={this.state.value}
                >
                     {
                        this.props.items.map((x, i) => (
                            <Picker.Item key={i} label={x.name} value={x.id} />
                        ))
                     }
                </Picker>
        );
    }
}
