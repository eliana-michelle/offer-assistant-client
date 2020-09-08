import {
    VALIDATE_SESSION_STARTED,
    VALIDATE_SESSION_SUCCESS,
    VALIDATE_SESSION_FAILURE, 
} from '../actions/validationActions';

import { 
    EXPORT_SESSIONS_STARTED,
    EXPORT_SESSIONS_SUCCESS,
    EXPORT_SESSIONS_FAILURE,
    EXPORT_SESSIONS,
    FIND_SESSIONS_FAILURE,
    FIND_SESSIONS_STARTED, 
    FIND_SESSIONS_SUCCESS,
    CLEAR_FOUND_SESSIONS,
    GET_OFFER_CODES_STARTED,
    GET_OFFER_CODES_SUCCESS,
    GET_OFFER_CODES_FAILURE, 
} from '../actions/exportActions';

import { 
    UPLOAD_STARTED,
    UPLOAD_SUCCESS, 
    UPLOAD_FAILURE, 
} from '../actions/uploadActions';

import { 
    UPDATE_STATUS_STARTED, 
    UPDATE_STATUS_SUCCESS, 
    UPDATE_STATUS_FAILURE,
} from '../actions/updateActions';

import { 
    ADD_COMMENT_FAILURE, 
    ADD_COMMENT_SUCCESS,
} from '../actions/commentActions';

import { 
    NEW_SEARCH, 
    REVEAL_OFFER_BTN, 
    HIDE_OFFER_BTN,
    SET_USER
} from '../actions/generalActions';

const sessionsReducer = (
    state = {
       session: null, 
       user: {},
       offers: [],
       history: [],
    }, 
    action
) => {
    switch (action.type) {
        case SET_USER: 
        return {...state, user: action.payload}
        
        case VALIDATE_SESSION_STARTED: 
            return {...state, loading: true, error: null, upload: false}
        
        case VALIDATE_SESSION_SUCCESS: 
            return {...state, loading: false, session: action.payload, comments: action.comments, history: action.history, error: null}

        case VALIDATE_SESSION_FAILURE: 
            return {...state, loading: false, error: action.payload}

        case UPLOAD_STARTED: 
            return {...state, loading: true}
        
        case UPLOAD_SUCCESS: 
            return {...state, upload: true, error: null, loading: false}

        case UPLOAD_FAILURE: 
            return {...state, error: action.payload, loading: false}

        case EXPORT_SESSIONS_STARTED: 
            return {...state, foundSessions: null, download: true}

        case EXPORT_SESSIONS_SUCCESS: 
            return {...state, foundSessions: null, loading: false, download: false, error: null}

        case EXPORT_SESSIONS_FAILURE: 
            return {...state, download: false, downloadError: action.payload}
        
        case FIND_SESSIONS_STARTED: 
            return {...state, foundSessions: null, download: true }

        case FIND_SESSIONS_SUCCESS: 
            return {...state, foundSessions: action.payload, download: false, error: null}

        case FIND_SESSIONS_FAILURE: 
            return {...state, download: false, downloadError: action.payload}
        
        case EXPORT_SESSIONS: 
            return {...state, foundSessions: null, loading: false, completed: false}

        case UPDATE_STATUS_STARTED: 
            return {...state, download: false}

        case UPDATE_STATUS_SUCCESS: 
            return {...state, session: action.payload, history: action.history, download: false, reveal: false, error: null}
        
        case UPDATE_STATUS_FAILURE: 
            return {...state, error: action.payload, download: false}

        case NEW_SEARCH: 
            return {...state, session: null, error: null, reveal: false}
        
        case CLEAR_FOUND_SESSIONS: 
            return {...state, foundSessions: null}
        
        case REVEAL_OFFER_BTN: 
            return {...state, reveal: true}
                
        case HIDE_OFFER_BTN: 
            return {...state, reveal: false}

        case ADD_COMMENT_SUCCESS: 
            return {...state, comments: action.payload}

        case ADD_COMMENT_FAILURE: 
            return {...state, error: action.payload}

        case GET_OFFER_CODES_STARTED: 
            return {...state}
        
        case GET_OFFER_CODES_SUCCESS: 
            return {...state, offers: action.payload}
        
        case GET_OFFER_CODES_FAILURE: 
            return {...state, offers: action.payload}

        default: 
            return state
    }
}

export default sessionsReducer;