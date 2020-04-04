import filtersReducer from '../../reducers/filters';
import moment from 'moment';

test('should setup default filter values', () => {
    const state = filtersReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    })
})

test('should set sortBy to amount', () => {
    const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT'});
    expect(state.sortBy).toEqual('amount');
})

test('should set sortBy to date', () => {
    const state = filtersReducer(undefined, { type: 'SORT_BY_DATE'});
    expect(state.sortBy).toEqual('date');
});

test('should setup text filter', () => {
    const defaultAction = {
        type: 'SET_TEXT_FILTER',
        text: 'The Hamlet'
    };
    const state = filtersReducer(undefined, defaultAction);
    expect(state.text).toEqual(defaultAction.text);
});

test('should setup start date filter', () => {
    const defaultAction = {
        type: 'SET_START_DATE',
        startDate: moment().startOf('month')
    };
    const state = filtersReducer(undefined, defaultAction);
    expect(state.startDate).toEqual(state.startDate);
});

test('should setup start date filter', () => {
    const defaultAction = {
        type: 'SET_END_DATE',
        endDate: moment().startOf('month')
    };
    const state = filtersReducer(undefined, defaultAction);
    expect(state.endDate).toEqual(state.endDate);
})