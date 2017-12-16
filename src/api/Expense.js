import {base_url, headers, identity, apiGet, apiPost} from './APIRoot';

export const getExpenses = async (offset) => {
    const endpoint = 'expense/';
    const params = {
        offset: offset|0,
    }
    const data = await apiGet(endpoint, params)
    return data;
};

export const getExpenseDetails = async (date) => {
    const params = {
        forDate: date
    };
    const endpoint = 'expense/';
    const data = await apiGet(endpoint, params);
    return data;
}

export const addExpense = async (data) => {
    const endpoint = 'expense/';
    const postresponse = await apiPost(endpoint, data);
    return postresponse;
}
