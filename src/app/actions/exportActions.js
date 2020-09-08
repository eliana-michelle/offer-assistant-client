import { getSessionsToExportFromDB, markSessionsAsComplete, getOfferCodesFromDB } from '../api/api' 
import { getExportRows, exportRecordsToCsv } from '../utilities/common'

export const EXPORT_SESSIONS_STARTED = 'EXPORT_SESSIONS_STARTED';
export const EXPORT_SESSIONS_SUCCESS = 'EXPORT_SESSIONS_SUCCESS';
export const EXPORT_SESSIONS_FAILURE = 'EXPORT_SESSIONS_FAILURE';
export const EXPORT_SESSIONS = 'EXPORT_SESSIONS'; 
export const FIND_SESSIONS_STARTED = 'FIND_SESSIONS_STARTED';
export const FIND_SESSIONS_SUCCESS = 'FIND_SESSIONS_SUCCESS';
export const FIND_SESSIONS_FAILURE = 'FIND_SESSIONS_FAILURE';
export const GET_OFFER_CODES_STARTED = 'GET_OFFER_CODES_STARTED';
export const GET_OFFER_CODES_SUCCESS = 'GET_OFFER_CODES_SUCCESS';
export const GET_OFFER_CODES_FAILURE = 'GET_OFFER_CODES_FAILURE';
export const CLEAR_FOUND_SESSIONS = 'CLEAR_FOUND_SESSIONS';


export const getSessionsToExport = values => {    
    return (dispatch, getState) => {
        dispatch(findExportSessionsStarted())
        const user = getState().sessions.user
    
    return getSessionsToExportFromDB(values, user)
    .then(response => {
        dispatch(findExportSessionsSuccess(response))
    })
    .catch(error => {
        dispatch(findExportSessionsFailure(error))
        })
    }
}

const findExportSessionsStarted = () => ({
    type: FIND_SESSIONS_STARTED,
})

const findExportSessionsSuccess = response => {
    const foundSessions = response.data.sessions

    return ({
        type: FIND_SESSIONS_SUCCESS,
        payload: foundSessions
    })
}

const findExportSessionsFailure = error => ({
    type: FIND_SESSIONS_FAILURE, 
    payload: error
})

export const exportSessions = (foundSessions, user, markedCompleted) => {   
    if(markedCompleted === true){
        return dispatch => {
            dispatch(exportSessionsStarted())

            return markSessionsAsComplete(foundSessions, user)
            .then(response => {
                dispatch(exportSessionsSuccess(response))
            })
            .catch(error => {
            dispatch(exportSessionsFailure(error))
            })
        }         
    } else {
        const exportRows = getExportRows(foundSessions)
        exportRecordsToCsv(exportRows)

        return ({
            type: EXPORT_SESSIONS, 
            payload: false
        })    
    }
}

const exportSessionsStarted = () => ({
    type: EXPORT_SESSIONS_STARTED
})

const exportSessionsSuccess = response => {
    const sessions = response.data.sessions
    const exportRows = getExportRows(sessions)

    exportRecordsToCsv(exportRows)

    return ({
        type: EXPORT_SESSIONS_SUCCESS, 
    })
}

const exportSessionsFailure = error => ({
    type: EXPORT_SESSIONS_FAILURE, 
    payload: error
})

export const getOfferCodes = () => {
    return dispatch => {
        dispatch(getOfferCodesStarted())
    
    return getOfferCodesFromDB()
    .then(response => {
        dispatch(getOfferCodesSuccess(response))
    })
    .catch(error => {
        dispatch(getOfferCodesFailure(error))
        })
    }
}

const getOfferCodesStarted = () => ({
    type: GET_OFFER_CODES_STARTED
})

const getOfferCodesSuccess = response => {
    const offerCodeData = response.data.offerCodes
    const offerCodes = offerCodeData.map(o => o.offer_code)

    return ({
        type: GET_OFFER_CODES_SUCCESS, 
        payload: offerCodes
    })
}

const getOfferCodesFailure = error => ({
    type: GET_OFFER_CODES_FAILURE, 
    payload: error
})

export const clearFoundSessions = () => ({
    type: CLEAR_FOUND_SESSIONS
})