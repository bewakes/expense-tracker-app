import React from 'react';
import { Text, View, Button, TouchableHighlight } from 'react-native';
import AppStyles from '../appStyles/styles';

const expensesData = [
    {
        "total": 330,
        "date": "2017-12-01"
    },
    {
        "total": 180,
        "date": "2017-11-29"
    },
    {
        "total": 145,
        "date": "2017-11-28"
    },
    {
        "total": 125,
        "date": "2017-11-27"
    },
    {
        "total": 820,
        "date": "2017-11-26"
    },
    {
        "total": 145,
        "date": "2017-11-28"
    },
    {
        "total": 125,
        "date": "2017-11-27"
    },
    {
        "total": 820,
        "date": "2017-11-26"
    }
];

const expenseDetails = [
    {
        "id": 778,
        "category": 10,
        "date": "2017-12-07",
        "cost": 80,
        "categoryname": "Extra Food",
        "description": "with sujan at krishna mandir",
        "items": "badam,tea",
        "created_by": 5,
        "modified_by": 5,
        "modifier": "bidhan.pandey10"
    },
    {
        "id": 779,
        "category": 59,
        "date": "2017-12-07",
        "cost": 40,
        "categoryname": "Lunch",
        "description": "",
        "items": "noodles",
        "created_by": 5,
        "modified_by": 5,
        "modifier": "bidhan.pandey10"
    },
    {
        "id": 782,
        "category": 1,
        "date": "2017-12-07",
        "cost": 35,
        "categoryname": "groccery",
        "description": "",
        "items": "milk",
        "created_by": 5,
        "modified_by": 5,
        "modifier": "bidhan.pandey10"
    }
];

const orgId = 3;

export default class Expenses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expenses: expensesData.map(x => {
                x.showDate=true;
                x.showDetails=false;
                x.details= [];
                return x;
            })
        }
    }

    _getExpense_details = (i, expense) => {
        // TODO: make a call, and return obtained details
        return expenseDetails;
    }

    _handleExpensePress = (i, expense) => {
        console.log('Pressed: ' + i);
        let exps = this.state.expenses.slice();
        if (exps[i].details.length == 0) {
            var details = this._getExpense_details(i, expense);
            exps[i].details = details;
        }
        exps[i].showDetails  = !exps[i].showDetails;
        if(! exps[i].showDetails) {
            console.log('hiding details');
        }
        else console.log('showing details');

        this.setState({expenses:exps});
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{
                flex:1,
                flexDirection: 'column',
                backgroundColor: AppStyles.cardColor
            }}>
            {this.state.expenses.map((x, i) => (
                <TouchableHighlight
                    style={{...AppStyles.cardStyleV,
                        justifyContent: 'center',
                    }}
                    underlayColor={AppStyles.cardTouchColor}
                    key={i}
                    onPress={() => this._handleExpensePress(i, x)}
                >
                    <View>
                        <ExpenseSummary date={x.date} total={x.total} />
                        {x.showDetails ? (<ExpenseDetails data={x.details} />) : (<View />)}
                    </View>
                </TouchableHighlight>
                ))
            }
            </View>
        );
    }
}

class ExpenseSummary extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }
    setNativeProps = (nativeProps) => {
        this._root.setNativeProps(nativeProps);
    }
    render() {
        return (
            <View
                ref={component => this._root = component} {...this.props}
                style={{
                    flexDirection:'row',
                    padding: 7
            }}>
                <Text
                    style={{
                        ...AppStyles.textStyle,
                        flex: 3,
                        fontSize: 17,
                }}>
                    {this.props.date}
                </Text>
                <Text
                    style={{
                        ...AppStyles.textStyle,
                        fontSize: 17,
                    }}>
                    Rs.{this.props.total}
                </Text>
            </View>
        );
    }
}

class ExpenseDetails extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }
    setNativeProps = (nativeProps) => {
        this._root.setNativeProps(nativeProps);
    }
    render() {
        if (this.props.data.length == 0) {
            return <View/>
        }
        return (
            <View
                ref={component => this._root = component} {...this.props}
                style={{
                    flexDirection:'column',
                    backgroundColor: '#eeeeee',
            }}>
                {
                    this.props.data.map((x, i) => (
                        <ExpenseDetail key={i} data={x} />
                    ))
                }
            </View>
        );
    }
}

class ExpenseDetail extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }
    setNativeProps = (nativeProps) => {
        this._root.setNativeProps(nativeProps);
    }
    render() {
        return (
            <View
                ref={component => this._root = component} {...this.props}
                style={{
                    ...AppStyles.smallCardStyle,
                    flexDirection:'row',
            }}>
                <Text
                    style={{
                        ...AppStyles.textStyle,
                        fontSize:17,
                        color: AppStyles.dimTextColor,
                        flex:1
                }}>
                    {this.props.data.categoryname}
                </Text>
                <Text
                    style={{
                        ...AppStyles.textStyle,
                        color: AppStyles.dimTextColor,
                        fontSize: 17,
                    }}>
                    Rs.{this.props.data.cost}
                </Text>
            </View>
        );
    }
}