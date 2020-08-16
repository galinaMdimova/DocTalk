import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ProfileTop = ({ profile: { bio, skills, user: { name } } }) => {
    return (
        <div className="profile-about bg-light p-2">
            {bio && (
                <Fragment>
                    <h2 className="text-primary">Повече за {name.trim().split(' ')[0]}</h2>
                    <p>
                        {bio}
                    </p>
                    <div className="line"></div>
                </Fragment>)}

            <h2 className="text-primary">Професионален опит</h2>
            <div className="skills">
                {skills.map((skill, index) => (
                    <div key={index} className="p-1">
                        <i className="fas fa-check">{skill}</i>

                    </div>
                ))}

            </div>
        </div>
    )

}

ProfileTop.propTypes = {
    profile: PropTypes.object.isRequired

}

export default ProfileTop