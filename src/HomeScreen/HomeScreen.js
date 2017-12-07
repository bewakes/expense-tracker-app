import React, {PureComponent} from 'react';
import {Text, View} from 'react-native';
import {StackNavigator,} from 'react-navigation';
import {Expenses, AddExpense} from '../Expenses';
import AppStyles from '../appStyles';

const screens  = {
    expenses: { screen: Expenses, title: 'My Expenses'},
    addExpense: { screen: AddExpense, title: 'Add Expenses'},
};

const screensWithoptions = Object.keys(screens).reduce((a,e) => {
    console.log({...screens[e]});
        a[e] = {
            ...screens[e],
            navigationOptions: {
                headerStyle: {
                    backgroundColor: AppStyles.AppColors.primaryColor
                },
                headerTitleStyle: {
                    color: 'white',
                    fontFamily:'titillium-web-regular'
                },
            }
        };
        return a;
    },
    {}
);

const HomeScreen1 = StackNavigator({...screensWithoptions});


export default HomeScreen = StackNavigator({
    expenses: {
        screen: Expenses,
        navigationOptions:{
            title: 'Expenses',
            headerStyle: { backgroundColor: AppStyles.AppColors.primaryColor },
            headerTitleStyle: {
                color: 'white',
                fontFamily:'titillium-web-regular',
                textAlign: 'center'
            },
        }
    },
    addExpense: {
        screen: AddExpense,
        navigationOptions: () => ({
            title: 'Add Expense',
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: AppStyles.AppColors.primaryColor,
            },
            headerTitleStyle: {
                color: 'white',
                fontFamily:'titillium-web-regular',
                textAlign: 'center'
            },
        })
    },
});

