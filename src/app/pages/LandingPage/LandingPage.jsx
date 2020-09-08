import React, { Component } from 'react';
import Loader from 'react-loader-spinner';

import { connect } from 'react-redux';
import queryString from 'query-string';

import { validateSessionById } from '../../actions/validationActions';
import { getUserInfo } from '../../actions/generalActions';
import { getOfferCodes } from '../../actions/exportActions';
import { getUser} from '../../utilities/adalConfig';

import Search from '../../components/Search/Search';
import Upload from '../../components/Upload/Upload';
import SessionInfo from '../../components/SessionInfo/SessionInfo';
import Error from '../../components/Error/Error';

import './LandingPage.scss'

class LandingPage extends Component {

    componentDidMount() {
        if(this.props.location.search){
            const queryObject = queryString.parse(this.props.location.search)
            const sessionId = queryObject.session 
            const email = queryObject.email

            this.props.getSessionFromURL(sessionId)
            this.props.getUserFromURL(email)
        }

        const { handleLogin } = this.props;
        
        handleLogin(getUser());
    }

    render() {
        const {session, user, error, loading } = this.props
        
        return (
            <div>
                <h1>Offer Assistant</h1>
                {user.isAdmin && <Upload />}
                {loading ?       
                    <div className="loader-container">
                        <Loader type="Oval" color="#456580" width="50" height="50" />
                    </div> 
                    :
                    <div></div>
                }
                {!session && !loading && <Search />}
                {session && <SessionInfo session={session} user={user}/>}
                {error && <Error />}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    session: state.sessions.session, 
    sessions: state.sessions.sessions, 
    user: state.sessions.user, 
    error: state.sessions.error, 
    loading: state.sessions.loading
})

const mapDispatchToProps = dispatch => ({
    getSessionFromURL: session => dispatch(validateSessionById(session)), 
    getUserFromURL: (email) => dispatch(getUserInfo(email)),
    handleLogin: (email) => dispatch(getUserInfo(email)), 
    getOfferCodes: () => dispatch(getOfferCodes())
})

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);