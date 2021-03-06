import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addExperience } from '../../actions/profile'
import { Link, withRouter } from 'react-router-dom'

const AddExperience = ({ addExperience, history }) => {
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: ''
    })

    const [toDateDisabled, toggleDisabled] = useState(false)
    const { title, company, location, from, to, current, description } = formData

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    return <Fragment>
        <h1 className="large text-primary">
            Добави още професионален опит
      </h1>
        <p className="lead">
            <i className="fas fa-code-branch"></i> Посочете какви други позиции сте
            заемали
      </p>
        <small>* задължителни полета </small>
        <form className="form" onSubmit={e => {
            e.preventDefault()
            addExperience(formData, history)
        }}>
            <div className="form-group">
                <input type="text" placeholder="* Име на заемана позиция"
                    name="title" value={title}
                    onChange={e => onChange(e)} required />
            </div>
            <div className="form-group">
                <input type="text" placeholder="* Здравно заведение"
                    name="company" value={company}
                    onChange={e => onChange(e)} required />
            </div>
            <div className="form-group">
                <input type="text" placeholder="Населено място" name="location"
                    value={location}
                    onChange={e => onChange(e)} />
            </div>
            <div className="form-group">
                <h4>* От</h4>
                <input type="date" name="from" value={from}
                    onChange={e => onChange(e)} required />
            </div>
            <div className="form-group">
                <p><input type="checkbox" name="current" checked={current} value={current}
                    onChange={e => {
                        setFormData({ ...formData, current: !current })
                        toggleDisabled(!toDateDisabled)
                    }}
                /> {' '} Настояща </p>
            </div>
            <div className="form-group">
                <h4>До</h4>
                <input type="date" name="to" value={to}
                    onChange={e => onChange(e)}
                    disabled={toDateDisabled ? 'disabled' : ''} />
            </div>
            <div className="form-group">
                <textarea
                    name="description"
                    value={description}
                    onChange={e => onChange(e)}
                    cols="30"
                    rows="5"
                    placeholder="Описание"
                ></textarea>
            </div>
            <input type="submit" className="btn btn-primary my-1" />
            <Link className="btn btn-light my-1" to="/dashboard">Назад</Link>
        </form>
    </Fragment>
}

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired
}

export default connect(null,
    { addExperience })
    (withRouter(AddExperience))