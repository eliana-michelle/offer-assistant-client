import React from 'react'

import Modal from 'react-modal'

import './TransactionModal.scss'

import { convertToPTC } from '../../utilities/common'

const TransactionModal = ({id, modalIsOpen, hideModal, history}) => {
    
    return (
        <Modal
            id={id}
            isOpen={modalIsOpen}
            onRequestClose={hideModal}
            ariaHideApp={false}
            >
            <div className="modal-div">
                <h3>Transaction History</h3>
                {history.length > 0 ?
                    <div>
                    {history.map(entry => 
                    <div key={entry.id} className="history-div">
                        <div className="history-header">
                            <span>Updated by {entry.username} at {convertToPTC(entry.updated_at)}</span>
                        </div>
                        <div>{entry.comment}</div>
                    </div> 
                    )}
                    </div>
                :
                    <p>No Transaction History Found</p>
                }
                <button onClick={hideModal} className="btn">Close</button>
            </div>
        </Modal>
    );
};


export default TransactionModal;