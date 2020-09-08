import React from 'react';
import moment from 'moment';
import Select from 'react-select';

import { exportHeaderRow } from './constants';

import './common.scss';

export const getExportRows = sessions => 
{ 
  return [
    exportHeaderRow, 
    ...sessions.map(session => [
        session.invoice, 
        session.office, 
        session.cancel_status, 
        checkForUndefinedOrNull(session.first_name).split(',')[0], 
        checkForUndefinedOrNull(session.last_name).split(',')[0], 
        session.offer_code, 
        session.offer_description.replace(/(,|\r\n|\n|\r)/g, "--"), 
        session.letter_sent ? formatDate(session.letter_sent) : '', 
        formatDate(session.expiration_date), 
        session.updated_at === null ? '' : convertToPTC(session.updated_at), 
        session.username, 
        session.completed === null || session.completed === false ? '' : session.completed,
        session.completed_at === null ? '' : convertToPTC(session.completed_at),
    ])
]
}

export const exportRecordsToCsv = (
    rows,
  ) => {
    const csvContent = rows.map(e => e.join(',')).join('\n');
    const dateTime = moment().format('MM.DD.YYYY_h꞉mm_A');
    const filename = `Cancel_Tool_${dateTime}.csv`;
    const blob = new Blob([csvContent], {
      type: 'text/csv;sep=,charset=utf-8;',
    });
  
    if (navigator.msSaveBlob) {
      // IE 10+
      navigator.msSaveBlob(blob, filename);
    } else {
      const link = document.createElement('a');
      if (typeof link.download !== undefined) {
        // feature detection, Browsers that support HTML5 download attribute
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.setAttribute('style', 'display: none;');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } 
    }
  };

export const formatDate = date => moment(date).utc().format('MM/DD/YYYY');

export const formatDateTime = date => moment(date).utc().format('MM/DD/YYYY HH:mm');

export const checkForUndefinedOrNull = value => value === 'undefined' || value === 'NULL' || value === 'null' || value === null || value === undefined ? '' : value;

export const convertToPTC = date => moment(date).utc().utcOffset(-7).format('MM/DD/YYYY h:mm a');

export const removeComma = value => value.replace(/,/g, "-");

export const renderDateField = ({ input, type, label, meta: { active, error, touched },
}) => (
    <div className="date-div" >
        <label className="date-label">{label}</label>
        <input {...input} type={type} className="date-select" />
        {touched && ((error && <span className="error">{error}</span>))}
    </div>
);

export const renderMultiSelect = ({input, options}) => (
  <Select 
    {...input} 
    onChange={value => input.onChange(value)} 
    onBlur={() => input.onBlur(input.value)} 
    options={options}
    isMulti
    className="select-dropdown"
  />
)

export const requiredField = value => value ? undefined : 'Required';

export const sortDataByUpdatedAt = data => data.sort((a,b) => a.updated_at > b.updated_at ? -1 : a.updated_at < b.updated_at ? 1 : 0);
export const sortDataByCreatedAt= data => data.sort((a, b) => a.created_at > b.created_at ? -1 : a.created_at < b.created_at ? 1 : 0);
  
