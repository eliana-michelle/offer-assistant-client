
import { validateSessionId } from '../api/api' ;
import { sortDataByCreatedAt, sortDataByUpdatedAt } from '../utilities/common';
import { SESSION_REFUND_TYPE } from '../utilities/constants';

export const VALIDATE_SESSION_STARTED = 'VALIDATE_SESSION_STARTED';
export const VALIDATE_SESSION_SUCCESS = 'VALIDATE_SESSION_SUCCESS';
export const VALIDATE_SESSION_FAILURE = 'VALIDATE_SESSION_FAILURE';


export const validateSessionById = sessionId => {
    return dispatch => {
        dispatch(validateSessionStarted())

        return validateSessionId(sessionId)
        .then(response => {
            dispatch(validateSessionSuccess(response))
        })
        .catch(error => {
            dispatch(validateSessionFailure(error))
        })
    }
}

const validateSessionStarted = () => ({
    type: VALIDATE_SESSION_STARTED, 
})

const validateSessionSuccess = response => {
    const foundSession = response.data.session
    const sessionComments = sortDataByCreatedAt(response.data.comments)
    const sessionHistory = sortDataByUpdatedAt(response.data.history)
    
    if(foundSession.cancel_status === null){
        foundSession.cancel_status = SESSION_REFUND_TYPE.VOUCHER_OPTED
    }

    return ({
        type: VALIDATE_SESSION_SUCCESS, 
        payload: foundSession, 
        comments: sessionComments, 
        history: sessionHistory
    })
}

const validateSessionFailure = error => {
    return ({
    type: VALIDATE_SESSION_FAILURE,
    payload: error
})
}




