import moment from 'moment';

export default (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense) => {
        const createdAtMoment = moment(expense.createdAt);
        const startDateMatch = startDate ? startDate.isBefore(createdAtMoment) : true;
        //console.log(startDate, createdAtMoment);
        const endDateMatch = endDate ? endDate.isAfter(createdAtMoment) : true;
        //console.log(endDate, createdAtMoment);
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
