import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// ADD_EXPENSE
const addExpense = ({
     description = '', note = '', amount=0, createdAt = 0} = {}
    ) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description: description,
        note: note,
        amount: amount, 
        createdAt: createdAt
    }
});

// REMOVE_EXPENSE
const removeExpense = ({ id = undefined } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id: id
})

// EDIT_EXPENSE
const editExpense = (id = undefined, updates = {}) => ({
    type: 'EDIT_EXPENSE',
    id: id,
    updates: updates
});


// Reducer for expenses
const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch(action.type){
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ];
        case 'REMOVE_EXPENSE':
            return state.filter(expense => expense.id != action.id);
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if(expense.id  === action.id){
                    return {
                        ...expense,
                        ...action.updates
                    }
                } else {
                    return expense;
                }
            });
        default:
            return state;
    }
};

// Reducer for filters
const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
}

// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text: text
});

// SORT_ BY_DATE
const sortByDate = () => ({
    type: 'SORT_BY_DATE'
});

// SORT_BY_AMOUNT
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});

// SET_START_DATE
const setStartDate = (date = undefined) => ({
    type: 'SET_START_DATE',
    date: date
});

// SET_END_DATE
const setEndDate = (date = undefined) => ({
    type: 'SET_END_DATE',
    date: date
});

const filtersReducer = (state = filtersReducerDefaultState, actions) => {
    switch (actions.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: actions.text
            };
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            };
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            };
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: actions.date
            };
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: actions.date
            };
        default: 
            return state;
    }
};



// Get Visible Expenses 
const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = typeof text !== 'string' || (expense.description.toLowerCase().includes(text.toLowerCase()));

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if(sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;
        } else if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
        }
    });
}; 

const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({
    description: 'rent',
    amount: 10000
}));

const expenseTwo = store.dispatch(addExpense({
    description: 'coffee',
    amount: 10020
}));


// store.dispatch(removeExpense({
//     id: expenseOne.expense.id
// }));

// store.dispatch(editExpense(expenseTwo.expense.id, {
//     amount: 5000
// }));

store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter());

// store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(125));
// store.dispatch(setEndDate(123));


const demoState = {
    expenses: [{
        id: '',
        description: '',
        note: '',
        amount: 54500,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', //date or amount
        startDate: undefined,
        endDate: undefined
    }
};