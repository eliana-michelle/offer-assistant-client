import React from 'react';
import { connect } from 'react-redux'
import { FaCamera } from 'react-icons/fa';

import { userLogout } from  '../../utilities/adalConfig'
import Export from '../../components/Export/Export'

import './Header.scss'

const Header = ({user}) => {
    return (
        <div className="header-container">
            { user.isSupervisor && <Export /> }
            { user.isAdmin && <Export /> }
            <div>
                <button className="logout" onClick={() => userLogout()}>LOGOUT</button>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    user: state.sessions.user
})

export default connect(mapStateToProps)(Header);