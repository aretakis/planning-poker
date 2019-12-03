export default (state = {
    poll: {votes: []}
}, action) => {
    switch (action.type) {
        case 'CREATE_POLL_SUCCESS':
            return {
                ...state,
                poll: action.data
            };
        case 'GET_POLL_SUCCESS':
            return {
                ...state,
                poll: action.data
            };
        case 'SET_ERRORS':
            return {
                ...state,
                errors: action.data
            };
        case 'EMPTY_ERRORS':
            return {
                ...state,
                errors: {}
            };
        default:
            return state;
    }
}