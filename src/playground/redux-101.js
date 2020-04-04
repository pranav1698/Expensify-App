import { createStore } from 'redux';
 
// Action Generators - functions that return action objects

// const add = ({a, b}, c) => {
//     return a + b + c;
// }

// console.log(add({a: 1, b: 12}, 100));

const incrementCount = ({ incrementBy = 1 } = {}) => ({
    type: 'INCREEMENT',
    incrementBy: incrementBy
});

const decrementCount = ({ decrementBy = 1} = {}) => ({
    type: 'DECREEMENT',
    decrementBy: decrementBy

});

const setCount = ({count = 1} = {}) => ({
    type: 'SET',
    count: count
});

const resetCount = () => ({
    type: 'RESET'
});

// Reducers 
const countReducer = (state = { 'count': 0}, action) => {
   switch (action.type) {
        case 'INCREEMENT':
           return {
               'count': state.count + action.incrementBy
           };
       case 'DECREEMENT':
           return {
               'count': state.count - action.decrementBy
           };
       case 'RESET':
           return {
                'count': 0
           };
       case 'SET':
           return {
               'count': action.count
           }
       default:
           return state;
   }
};

const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
});


store.dispatch(setCount({count: 10}));

store.dispatch(incrementCount());
store.dispatch(incrementCount({ incrementBy: 5}));

// store.dispatch({
//     'type': 'INCREEMENT',
//     'incrementBy': 5
// });

store.dispatch(resetCount());

// store.dispatch({
//     'type': 'DECREEMENT',
//     'decrementBy': 10
// });

store.dispatch(decrementCount({decrementBy: 3}));
store.dispatch(decrementCount());


