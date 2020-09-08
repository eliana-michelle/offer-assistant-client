import { addCommentToDB } from '../api/api' ;
import { EXPORT_SESSIONS_STARTED } from './exportActions'
import { sortDataByCreatedAt } from '../utilities/common';

export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const addComment = comment => {
    if(comment === undefined) {
        return ({
            type: EXPORT_SESSIONS_STARTED,
            payload: true
        })
    } else {
        return (dispatch, getState) => {
            const session = getState().sessions.session
            const user = getState().sessions.user

            const invoice = session.invoice
            const username = user.name

        return addCommentToDB(comment, username, invoice).then(response => 
            dispatch(addCommentSuccess(response))).catch(error => addCommentFailure(error))
        }
    }
}

const addCommentSuccess = response => {
    const comments = response.data.data.recordset
    const sortedComments = sortDataByCreatedAt(comments);
    return ({
        type: ADD_COMMENT_SUCCESS,
        payload: sortedComments
    })
}

const addCommentFailure = error => ({
    type: ADD_COMMENT_FAILURE, 
    payload: error
})