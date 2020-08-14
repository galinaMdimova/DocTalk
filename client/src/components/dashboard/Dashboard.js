import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCurrentProfile, deleteAccount } from '../../actions/profile'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner'
import DashboardActions from './DashboardActions'
import Experience from './Experience' 
import Education from './Education' 

const Dashboard = ({
    getCurrentProfile,
    deleteAccount,
    auth: { user },
    profile: { profile, loading }
}) => {
    useEffect(() => {
        getCurrentProfile()
    }, [])

    return loading && profile === null ? <Spinner /> : <Fragment>
        <h1 className="large text-primary">Меню</h1>
        <p className="lead">
            <i className="fas fa-user"> Здравейте, {user && user.name}</i>
        </p>
        {profile !== null ? 
        <Fragment> 
            <DashboardActions/> 
            <Experience experience={profile.experience}/>
            <Education education={profile.education}/>

            <div className="my-2">
                <button className="btn btn-danger" onClick={()=> deleteAccount()}>
                    <i className="fas fa-user-minus"></i> Изтрий регистрация и профил
                </button>
            </div>
        </Fragment> : 
        <Fragment> 
            <p>Все още нямате свой профил. </p>
            <Link to='/create-profile' className="btn btn-primary my-1">Създай профил</Link>
            </Fragment>}
    </Fragment> 
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, 
    { getCurrentProfile, deleteAccount })
    (Dashboard)

