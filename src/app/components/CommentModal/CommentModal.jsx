import React from 'react'
import { compose } from 'redux';
import { Field, reduxForm, reset } from 'redux-form';


import Modal from 'react-modal';

import './CommentModal.scss';

import { addComment } from '../../actions/commentActions';


import { convertToPTC } from '../../utilities/common';

const CommentModal = ({id, modalIsOpen, hideModal, comments, handleSubmit}) => {
    
    return (
        <Modal
            id={id}
            isOpen={modalIsOpen}
            onRequestClose={hideModal}
            ariaHideApp={false}
            >
            <div className="modal-div">
                <h3>Comment History</h3>
                <form onSubmit={handleSubmit}>
                    <Field
                        name="comment"
                        component="textarea"
                        placeholder="Add any additonal comments here"
                        className="comment-input"
                    />
                    <div>
                        <button className="btn confirm" type="submit">Add New Comment</button>
                    </div>
                </form>
                {comments.length > 0 ?
                    <div>
                    {comments.map(comment => 
                    <div key={comment.ID} className="comment-div">
                        <div className="comment-header">
                            <span>Posted by {comment.username} at {convertToPTC(comment.created_at)}</span>
                        </div>
                        <div>{comment.comment}</div>
                    </div> 
                    )}
                    </div>
                :
                    <p>No comments found</p>
                }
            <button onClick={hideModal} className="btn">Close</button>
            </div>
        </Modal>
    );
};

const onSubmit = (values, dispatch) => {
    dispatch(addComment(values.comment))
    dispatch(reset('commentsForm2'))
}

const enhance = compose(
    reduxForm({
      form: 'commentsForm2',
      onSubmit
    })
);

export default enhance(CommentModal);