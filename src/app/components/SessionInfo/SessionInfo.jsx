import React, { Component } from 'react';
import { connect } from 'react-redux'

import './SessionInfo.scss'
import { updateCancelOfferStatus } from '../../actions/updateActions';
import { newSearch, revealOfferBtn, hideOfferBtn } from '../../actions/generalActions';
import { SESSION_REFUND_TYPE } from '../../utilities/constants';
import { formatDate, convertToPTC } from '../../utilities/common'

import ConfirmModal from '../ConfirmModal/ConfirmModal'
import CommentModal from '../CommentModal/CommentModal'
import TransactionModal from '../TransactionModal/TransactionModal'

import moment from 'moment';

class SessionInfo extends Component {
    state = {
        modalIsOpen: false, 
        commentModalIsOpen: false,
        transactionModalIsOpen: false,
        updateStatus: null
    }

    openModal = (updateStatus) => {
        this.setState({modalIsOpen: true, updateStatus: updateStatus })
    }

    openCommentModal = () => {
        this.setState({commentModalIsOpen: true})
    }

    openTransactionModal = () => {
        this.setState({transactionModalIsOpen: true})
    }

    closeModal = () => {
        this.setState({modalIsOpen: false, updateStatus: null})
        this.props.hideOfferBtn()
    }

    closeCommentModal = () => {
        this.setState({commentModalIsOpen: false})
    }

    closeTransactionModal = () => {
        this.setState({transactionModalIsOpen: false})
    }

    render(){
       const {user, session, handleUpdate, newSearch, revealOfferBtn, reveal, comments, history} = this.props
       const { modalIsOpen, commentModalIsOpen, transactionModalIsOpen } = this.state

       return (
            <div className="session-info">
                <ConfirmModal 
                    id="confirmModal"
                    hideModal={this.closeModal}
                    modalIsOpen={modalIsOpen}
                    handleUpdate={handleUpdate}
                    updateStatus={this.state.updateStatus}
                    session={session.id}
                    user={user}
                />
                <CommentModal 
                    id="commentModal"
                    modalIsOpen={commentModalIsOpen}
                    hideModal={this.closeCommentModal}
                    comments={comments}
                    expirationDate={session.expiration_date}
                />
                <TransactionModal 
                    id="transactionModal"
                    modalIsOpen={transactionModalIsOpen}
                    hideModal={this.closeTransactionModal}
                    history={history}
                />
                <div className="session-info-card">
                    <h2>Session Id: {session.id}</h2>
                    <h3>Current Status: {session.cancel_status}</h3>
                    <h4>Last Update: {session.username ? `${session.username} -- ${convertToPTC(session.updated_at)}` : 'Not Updated Yet'}</h4>
                  
                    <div className="row">
                        <div className="column">
                            <h4>Session Details</h4>
                            <div>
                                <span className='title'>Office</span> 
                                <span>{session.office}</span>
                            </div>
                            <div>
                                <span className='title'>Client</span> 
                                <span>{session.first_name} {session.last_name}</span>
                            </div>
                        </div>
                        </div>
                        <div className="row">
                            <div className="column">
                                <h4>Offer Details</h4>
                                <div>
                                   <span className="title">Offer Code:</span> 
                                   <span>{session.offer_code}</span>
                                </div>
                                <div>
                                    <span className="title">Offer Letter Sent:</span>
                                    <span>{session.letter_sent === null ? '' : formatDate(session.letter_sent)}</span>
                                </div>
                                <div>
                                    <span className="title">Offer Expires:</span>
                                    <span>{formatDate(session.expiration_date)}</span>
                                </div>
                                <div>
                                    <span className="title">Offer Description:</span>
                                    <span>{session.offer_description}</span>
                                </div>
                            </div>
                        </div>
                    <div className="offer-div">
                       {!reveal && 
                            <div className="reveal-div">
                               { moment().isSameOrBefore(formatDate(session.expiration_date), 'day') 
                               || session.cancel_status === SESSION_REFUND_TYPE.VOUCHER_OPTED 
                               || session.cancel_status === SESSION_REFUND_TYPE.VOUCHER_CONFIRMED
                               || user.isAdmin 
                               || user.isSupservisor
                               ?
                               <div className="reveal-div">
                                    { (session.locked !== true || (user.isAdmin || user.isSupervisor))&& <button className="reveal-btn" onClick={revealOfferBtn}>Edit Selected Offer</button>}
                                    <button className="reveal-btn" onClick={this.openCommentModal}>Show Comment History</button>
                                    <button className="reveal-btn" onClick={this.openTransactionModal}>Show Transaction History</button>
                                </div>
                                :
                                <div>
                                    <button className="reveal-btn" onClick={this.openCommentModal}>Show Comment History</button>
                                    <button className="reveal-btn" onClick={this.openTransactionModal}>Show Transaction History</button>
                                </div>
                                }
                            </div>
                        }
                        {reveal && 
                        <div className="btn-div">
                            { user.isSupervisor || user.isAdmin ?
                                <div>
                                    <button onClick={() => this.openModal(SESSION_REFUND_TYPE.VOUCHER_CONFIRMED)} className="btn voucher">Future Cruise Voucher - Confirmed</button>
                                    <button onClick={() => this.openModal(SESSION_REFUND_TYPE.VOUCHER_OPTED)} className="btn voucher-opted">Future Cruise Voucher - Opted</button>
                                    <button onClick={() => this.openModal(SESSION_REFUND_TYPE.REFUND)} className="btn refund">Refund</button>
                                </div>
                            : 
                            <div className="btn-div">
                                { session.cancel_status === SESSION_REFUND_TYPE.VOUCHER_OPTED && 
                                    <div className="btn-div">
                                        <button onClick={() => this.openModal(SESSION_REFUND_TYPE.VOUCHER_CONFIRMED)} className="btn voucher">Future Cruise Voucher</button> }
                                        <button onClick={() => this.openModal(SESSION_REFUND_TYPE.REFUND)} className="btn refund">Refund</button>
                                    </div>
                                }
                                { session.cancel_status === SESSION_REFUND_TYPE.VOUCHER_CONFIRMED && 
                                <button onClick={() => this.openModal(SESSION_REFUND_TYPE.REFUND)} className="btn refund">Refund</button>
                                }
                                { session.cancel_status === SESSION_REFUND_TYPE.REFUND && <button onClick={() => this.openModal(SESSION_REFUND_TYPE.VOUCHER_CONFIRMED)} className="btn voucher">Future Cruise Voucher</button>}
                            </div>
                            }
                        </div>
                        }
                    </div>
                </div>
                <button className="search-btn" onClick={newSearch}>New Search</button>
            </div>
        );
    }
};

const mapStateToProps = state => ({
    comments: state.sessions.comments, 
    reveal: state.sessions.reveal,
    history: state.sessions.history
})

const mapDispatchToProps = dispatch => ({
    handleUpdate: (status, session, user) => dispatch(updateCancelOfferStatus(status, session, user)),
    newSearch: () => dispatch(newSearch()),
    revealOfferBtn: () => dispatch(revealOfferBtn()), 
    hideOfferBtn: () => dispatch(hideOfferBtn())
 })
export default connect(mapStateToProps, mapDispatchToProps)(SessionInfo);