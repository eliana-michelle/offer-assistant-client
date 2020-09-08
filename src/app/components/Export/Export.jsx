import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FaDownload } from 'react-icons/fa';

import { getOfferCodes, exportSessions, clearFoundSessions } from '../../actions/exportActions';
import { offerCodeOptions } from '../../utilities/constants';

import DownloadModal from '../DownloadModal/DownloadModal';

import './Export.scss';

class Export extends Component {
    state = {
        modalIsOpen: false,
        markedCompleted: false
    }

    openModal = () => {
        this.setState({modalIsOpen: true})
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false})
    }

    handleCheckboxChange = e =>  {
        this.setState({markedCompleted: e.target.checked})
    }

    componentDidMount(){
        const { getOfferCodes } = this.props
        getOfferCodes()
    }

    render (){
        const { modalIsOpen, markedCompleted } = this.state
        const { download, offers, foundSessions, exportSessions, user, clearFoundSessions } = this.props

        const offerOptions = offerCodeOptions(offers)

        return (
            <div>
                <DownloadModal 
                    id="downloadModal"
                    hideModal={this.closeModal}
                    modalIsOpen={modalIsOpen}
                    download={download}
                    offerOptions={offerOptions}
                    foundSessions={foundSessions}
                    exportSessions={exportSessions}
                    clearFoundSessions={clearFoundSessions}
                    user={user}
                    markedCompleted={markedCompleted}
                    handleCheckboxChange={this.handleCheckboxChange}
                />
                <div className="icon-div" onClick={this.openModal}>
                    <FaDownload className="icon" />
                </div>
            </div>
        );
    }
};

const mapStateToProps = state => ({
    download: state.sessions.download, 
    offers: state.sessions.offers,
    foundSessions: state.sessions.foundSessions, 
    user: state.sessions.user, 
})

const mapDispatchToProps = dispatch => ({
    getOfferCodes: () => dispatch(getOfferCodes()),
    exportSessions: (foundSessions, user, markedCompleted) => dispatch(exportSessions(foundSessions, user, markedCompleted)),
    clearFoundSessions: () => dispatch(clearFoundSessions())
})

export default connect(mapStateToProps, mapDispatchToProps)(Export);