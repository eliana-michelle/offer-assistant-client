import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { compose } from 'redux';

import { validateSessionById } from '../../actions/validationActions'

import './Search.scss'

const Search = ({handleSubmit}) => {
    return (
        <div className="search-container">
            <form onSubmit={handleSubmit} className="search-form">
                <Field 
                    name="sessionId"
                    component="input"
                    type="text"
                    placeholder="Please enter session number to validate"
                    className="search-input"
                    autoComplete="off"
                />
                <button className="submit-btn" type="submit">
                    Search
                </button>
            </form>
        </div>
    );
};

const onSubmit = (values, dispatch) => {
    dispatch(validateSessionById(values.sessionId))
}

const enhance = compose(
    reduxForm({
      form: 'searchForm',
      onSubmit, 
    })
);
export default enhance(Search);