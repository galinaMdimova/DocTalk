import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const ProfileEducation = ({ education: {
    school,
    degree,
    fieldofstudy,
    from,
    to,
} }) => <div>
        <h3 className="text-dark">{school}</h3>
        <p>
            <Moment format='YYYY/MM/DD'>{from}</Moment> - {!to ? ' в момента' :
                <Moment format='YYYY/MM/DD'>{to}</Moment>}
        </p>
        <p>
            <strong>Образователна степен: </strong> {degree}
        </p>
        <p>
            <strong>Област/направление: </strong> {fieldofstudy}
        </p>
    </div>



ProfileEducation.propTypes = {
    education: PropTypes.object.isRequired,
}

export default ProfileEducation