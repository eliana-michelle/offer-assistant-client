import React from 'react';
import { connect } from 'react-redux';

import { FaUpload } from 'react-icons/fa';

import { fileUpload } from '../../actions/uploadActions';

import './Upload.scss'

const Upload = ({ handleUpload, upload }) => {
    
    return (
    <div className='upload-div'>
        <div>
            <button className="upload-btn">Upload Session Data <FaUpload /></button>
            <input className="upload-input" type="file" name="file" onChange={handleUpload} />
        </div>
        <div>   
            {upload && <p>Upload Successful</p>}
        </div>
    </div>
    );
};

const mapStateToProps = state => ({
    upload: state.sessions.upload
})

const mapDispatchToProps = dispatch => ({
    handleUpload: file => dispatch(fileUpload(file)) 
})

export default connect(mapStateToProps, mapDispatchToProps)(Upload);