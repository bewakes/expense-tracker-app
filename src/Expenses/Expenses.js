import React from 'react';
import { Text, ScrollView, View, Button, TouchableHighlight } from 'react-native';
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

export default class Expenses extends React.PureComponent {
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
            exps[i].details = this._getExpense_details(i, expense);
        }
        exps[i].showDetails = !exps[i].showDetails;
        this.setState({expenses:exps});
    }

    loadMore = () => {
        let exps = this.state.expenses.slice();
        let exps2 = expensesData.map(x => {
                x.showDate=true;
                x.showDetails=false;
                x.details= [];
                return x;
        });
        this.setState({expenses:[...exps, ...exps2]});
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{flex:1}}>
            <ScrollView>
                <View style={{
                    flex:1,
                    flexDirection: 'column',
                    backgroundColor: '#eeeeee',
                }}>
                {this.state.expenses.map((x, i) => {
                    let style = {};
                    if (x.showDetails) {
                        style = {
                            borderColor: '#ccc',
                            borderWidth: 2,
                            borderLeftWidth: 3,
                            borderRightWidth: 3,
                        }
                    }
                    return (
                        <View key={i}>
                            <ExpenseSummary style={style} index={i}  data={x} pressHandler={this._handleExpensePress} />
                            {x.showDetails ? (<ExpenseDetails data={x.details} />) : (<View />)}
                        </View>
                    );})
                }
                </View>
                <LoadMore onPress={this.loadMore} />
            </ScrollView>
            <FloatingAddButton />
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
        const {index, data} = this.props;
        return (
            <TouchableHighlight
                    style={{
                        ...AppStyles.cardStyleV,
                        ...this.props.style,
                        justifyContent: 'center',
                    }}
                    underlayColor={AppStyles.cardTouchColor}
                    //key={i}
                    onPress={() => this.props.pressHandler(index, data)}
                >
                <View
                    ref={component => this._root = component} {...this.props}
                    style={{
                        flexDirection:'row',
                }}>
                    <Text
                        style={{
                            ...AppStyles.textStyle,
                            flex: 3,
                            fontSize: 17,
                    }}>
                        {(new Date(this.props.data.date)).toDateString()}
                    </Text>
                    <Text
                        style={{
                            ...AppStyles.textStyle,
                            fontSize: 17,
                        }}>
                        Rs.{this.props.data.total}
                    </Text>
                </View>
            </TouchableHighlight>
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

const LoadMore = (props) => (
    <View
        {...props}
        style={{
            ...AppStyles.smallCardStyle,
            flexDirection:'row',
    }}>
        <TouchableHighlight
            onPress={props.onPress}
        >
        <Text
            style={{
                ...AppStyles.textStyle,
                fontSize:17,
                textAlign:'center',
                fontFamily:'titillium-web-bold',
                color: AppStyles.dimTextColor,
                flex:1
        }}>
            Load More.
        </Text>
        </TouchableHighlight>
    </View>
)

const FloatingAddButton = (props) => (
        <TouchableHighlight
            onPress={()=>{}}
            underlayColor={AppStyles.secondaryColorDark}
            style={{
                width: 60,
                height: 60,
                elevation: 4,
                position:'absolute',
                bottom:35,
                right:50,
                borderRadius: 30,
                backgroundColor: AppStyles.secondaryColor,
        }}>
            <Text style={{
                position: 'absolute',
                bottom: 0,
                right: 15,
                fontFamily: 'titillium-web-bold',
                fontSize: 60,
                textAlign:'center',
                color: 'white'
            }}>+</Text>
    </TouchableHighlight>
)
