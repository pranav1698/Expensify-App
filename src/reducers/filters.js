import moment from 'moment';

// Reducer for filters
const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
}

export default (state = filtersReducerDefaultState, actions) => {
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

