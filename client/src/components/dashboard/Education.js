import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { deleteEducation } from '../../actions/profile'

const Education = ({ education, deleteEducation }) => {
    const educations = education.map(edc => (
        <tr key={edc._id}>
            <td>{edc.school}</td>
            <td className="hide-sm">{edc.degree}</td>
            <td>
                <Moment format='YYYY/MM/DD'>{edc.from}</Moment> - {' '}
                {edc.to === null ? (' в момента') :
                    (<Moment format='YYYY/MM/DD'>{edc.to}</Moment>)}
            </td>
            <td>
                <button onClick={()=> deleteEducation(edc._id)} className="btn btn-danger">Изтриване</button>
            </td>
        </tr>
    ))

    return (
        <Fragment>
            <h2 className="my-2">Придобита квалификация</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Учебно заведение</th>
                        <th className="hide-sm">Степен</th>
                        <th className="hide-sm">Продължителност</th>
                        <th />
                    </tr>
                </thead>
                <tbody>{educations}</tbody>
            </table>
        </Fragment>
    )
}

Education.propTypes = {
    education: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired
}

export default connect(null, {deleteEducation})(Education)