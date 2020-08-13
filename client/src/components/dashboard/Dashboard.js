import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCurrentProfile } from '../../actions/profile'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner'

const Dashboard = ({
    getCurrentProfile,
    auth: { user },
    profile: { profile, loading }
}) => {

    console.log("Profil", profile)
    useEffect(() => {
        getCurrentProfile()
    }, [])

    return loading && profile === null ? <Spinner /> : <Fragment>
        <h1 className="large text-primary">Меню</h1>
        <p className="lead">
            <i className="fas fa-user"> Здравейте, {user && user.name}</i>
        </p>
        {profile !== null ? <Fragment> имате </Fragment> : 
        <Fragment> 
            <p>Все още нямате свой профил. </p>
            <Link to='/create-profile' className="btn btn-primary my-1">Създай профил</Link>
            </Fragment>}
    </Fragment> 
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard)

