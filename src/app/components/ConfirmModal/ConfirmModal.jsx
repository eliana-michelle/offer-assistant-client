import React from 'react';

import Modal from 'react-modal'
import { Field, reduxForm, submit, reset } from 'redux-form';
import { compose } from 'redux';

import { addComment } from '../../actions/commentActions';

import './ConfirmModal.scss'

const ConfirmModal = ({id, modalIsOpen, hideModal, handleUpdate, session, user, updateStatus, dispatch, handleSubmit}) => {
    
    return (
        <Modal
            id={id}
            isOpen={modalIsOpen}
            onRequestClose={hideModal}
            ariaHideApp={false}
            >
            <div className="modal-div">
                <p>Are you sure you want to change the offer to {updateStatus}?</p>
                <form onSubmit={handleSubmit}>
                    <Field
                        name="comment"
                        component="textarea"
                        placeholder="Add any additonal comments here"
                        className="comment"
                    />
                    <div>
                        <button className="btn confirm" onClick={() => handleUpdate(updateStatus, session, user).then(dispatch(submit('commentsForm'))).then(hideModal())}>Confirm</button>
                        <button className="btn" onClick={hideModal}>Cancel</button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

const onSubmit = (values, dispatch) => {
    dispatch(addComment(values.comment))
    dispatch(reset('commentsForm'))
}

const enhance = compose(
    reduxForm({
      form: 'commentsForm',
      onSubmit
    })
);

export default enhance(ConfirmModal);