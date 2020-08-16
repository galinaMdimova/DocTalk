import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const ProfileExperience = ({ experience: {
    company,
    title,
    location,
    current,
    from,
    to,
    description
} }) => <div>
        <h3 className="text-dark">{company}</h3>
        <p>
            <Moment format='YYYY/MM/DD'>{from}</Moment> - {!to ? ' в момента' :
                <Moment format='YYYY/MM/DD'>{to}</Moment>}
        </p>
        <p>
            <strong>Позиция: </strong> {title}
        </p>
        <p>
            {description && (<strong>Описание: {description}</strong>) }
            
        </p>
    </div>



ProfileExperience.propTypes = {
    experience: PropTypes.object.isRequired,
}

export default ProfileExperience