import { updateCancelStatus } from '../api/api' 
import { sortDataByUpdatedAt } from '../utilities/common';

export const UPDATE_STATUS_STARTED = 'UPDATE_STATUS_STARTED'
export const UPDATE_STATUS_SUCCESS = 'UPDATE_STATUS_SUCCESS'
export const UPDATE_STATUS_FAILURE = 'UPDATE_STATUS_FAILURE'

export const updateCancelOfferStatus = (cancelStatus, session, user) => {
    return dispatch => {
        dispatch(updateCancelStatusStarted())

    return updateCancelStatus(cancelStatus, session, user)
        .then(response => {
            dispatch(updateCancelStatusSuccess(response))
        })
        .catch(error => {
            dispatch(updateCancelStatusFailure(error))
        })
    }
}

const updateCancelStatusStarted = () => ({
    type: UPDATE_STATUS_STARTED, 
    loading: true
})


const updateCancelStatusSuccess = response => {
    const updatedSession = response.data.data.recordset[0];
    const history = response.data.history.recordset;

    const sortedHistory = sortDataByUpdatedAt(history);

    return  ({
        type: UPDATE_STATUS_SUCCESS, 
        payload: updatedSession,
        history: sortedHistory
    })
}

const updateCancelStatusFailure = error => ({
        type: UPDATE_STATUS_FAILURE, 
        payload: error
})
