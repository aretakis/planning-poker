import axios from 'axios';

export const createPoll = (poll) => dispatch => {
    axios.post('api/poll', poll)
        .then((res) => {
            dispatch({
                type: 'CREATE_POLL_SUCCESS',
                data: res.data
            });
            dispatch({
                type: 'EMPTY_ERRORS'
            })
        }).catch(() =>
        dispatch({
            type: 'SET_ERRORS',
            data: {onCreateError: true}
        }))
};

export const getPoll = identifier => dispatch => {
    axios.get(`api/poll/${identifier}`)
        .then(res => {
            dispatch({
                type: 'GET_POLL_SUCCESS',
                data: res.data
            });
            dispatch({
                type: 'EMPTY_ERRORS'
            })
        }).catch(() =>
        dispatch({
            type: 'SET_ERRORS',
            data: {onGetError: true}
        }));
};

