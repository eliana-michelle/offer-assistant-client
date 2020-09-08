import React from 'react';

import Modal from 'react-modal'
import { Field, reduxForm, reset } from 'redux-form';
import { compose } from 'redux';

import Loader from 'react-loader-spinner';

import { getSessionsToExport } from '../../actions/exportActions';

import { officeOptions, statusOptions } from '../../utilities/constants';
import { renderDateField, renderMultiSelect } from '../../utilities/common';

import './DownloadModal.scss'


const DownloadModal = ({
    id, 
    modalIsOpen, 
    download, 
    hideModal, 
    handleSubmit, 
    offerOptions, 
    dispatch, 
    change, 
    foundSessions, 
    exportSessions, 
    user, 
    markedCompleted,
    handleCheckboxChange, 
    clearFoundSessions
    }) => {
    const cancelOnClick = () => {
        dispatch(reset('downloadForm'))
        hideModal()
    }

    const clearOnClick = () => {
        dispatch(reset('downloadForm'))
        clearFoundSessions()
    }
    
    return (
        <Modal
            id={id}
            isOpen={modalIsOpen}
            onRequestClose={hideModal}
            ariaHideApp={false}
            >
            <div className="modal-div">
                <h3>Make Selections For Export</h3>
                {download ?       
                    <div className="loader-container">
                        <Loader type="Oval" color="#456580" width="50" height="50" />
                    </div> 
                    :
                <form className= "download-form" onSubmit={handleSubmit}>
                    <div className="download-filter-div">
                        <Field
                            name="office"
                            component={renderMultiSelect}
                            isMulti
                            options={officeOptions}
                            label='Office'
                        />
                        <Field
                            name="offerCode"
                            component={renderMultiSelect}
                            isMulti
                            options={offerOptions}
                            label='Offer Code'
                        />
                        <Field
                            name="cancelStatus"
                            component={renderMultiSelect}
                            isMulti
                            options={statusOptions}
                            label='Offer Status'
                        />
                    </div>
                    <div className="download-filter-div">
                        <Field
                            name="letterSentFrom"
                            component={renderDateField}
                            type="date"
                            label="Letter Sent After"
                            onChange={(value) => change('letterSentTo', value.target.value)}
                        />
                        <Field
                            name="letterSentTo"
                            component={renderDateField}
                            type="date"
                            label="Letter Sent Before"
                        />
                        <Field
                            name="expirationFrom"
                            component={renderDateField}
                            type="date"
                            label="Offer Expires After"
                            onChange={(value) => change('expirationTo', value.target.value)}
                        />
                        <Field
                            name="expirationTo"
                            component={renderDateField}
                            type="date"
                            label="Offer Expires Before"
                        />                         
                    </div>
                    <div className="download-filter-div">
                        <Field
                            name="updatedFrom"
                            component={renderDateField}
                            type="date"
                            label="Updated After"
                            onChange={(value) => change('updatedTo', value.target.value)}
                        />
                        <Field
                            name="updatedTo"
                            component={renderDateField}
                            type="date"
                            label="Updated Before"
                        />   
                    </div>
                    <div className="btn-div">                       
                        <button className="btn submit" type="submit">Find</button>
                        <button className="btn" onClick={cancelOnClick}>Cancel</button>
                    </div>
                </form>
                }
                { foundSessions &&
                    <div className="found">
                        <p> Found {foundSessions.length} sessions to export</p>
                        <div className="checkbox-div">
                            <label className="checkbox-label">
                                <input 
                                    className="checkbox-input"
                                    type="checkbox"
                                    checked={markedCompleted}
                                    onChange={handleCheckboxChange}
                                />
                                Mark exported sessions as completed
                            </label>
                        </div>
                        <button className="search-btn" onClick={() => exportSessions(foundSessions, user, markedCompleted)}>Export</button>
                        <button className="btn" onClick={clearOnClick}>Clear</button>
                    </div>
                }
            </div>
        </Modal>
    );
};

const onSubmit = (values, dispatch) => {
 dispatch(getSessionsToExport(values));
}

const enhance = compose(
    reduxForm({
      form: 'downloadForm',
      onSubmit
    })
);

export default enhance(DownloadModal);