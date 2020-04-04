import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';
import moment from 'moment';

test('should setup default state', () => {
    const state = expensesReducer(undefined, {type: '@@INIT'})
    expect(state).toEqual([]);
})

test('should remove expense', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[2]]);
})

test('should remove expense if id not found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: "-1"
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
})

test('should add an expense', () => {
    const action = {
        type: 'ADD_EXPENSE',
        expense: {
            id: '123abc',
            description: 'Water bill',
            note: 'Note',
            amount: 10982,
            createdAt: moment().add(5, 'days').valueOf()
        }
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([...expenses, action.expense]);
})

test('should edit an expense', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[1].id,
        updates: {
            description: 'Rent Bill'
        }
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], { ...expenses[1], ...action.updates}, expenses[2]]);
})

test('should edit an expense if expense not found', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: '-1',
        updates: {
            description: 'Rent Bill'
        }
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
})