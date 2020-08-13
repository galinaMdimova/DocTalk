import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const CreateProfile = props => {
  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location: '',
    skills: '',
    status: '',
    bio: '',
    youtube: '',
    facebook: ''
  })

  const [displaySocialInputs, toggleSocialinputs] = useState(false)

  const { company, website, location, skills, status, bio, youtube, facebook } = formData

  const onChange= e => setFormData({...formData, [e.targer.name]: e.target.value})



  return (
    <Fragment>
      <h1 className="large text-primary">
        Създайте вашия профил
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Представете се
      </p>
      <small>* задължителни полета </small>
      <form className="form">
        <div className="form-group">
          <select name="status" value={status} onChange={e => onChange(e)}>
            <option value="0">Професионален статус</option>
            <option value="Специализант">Специализант</option>
            <option value="Медицинска сестра">Медицинска сестра</option>
            <option value="Хирург">Хирург</option>
            <option value="Генетик">Генетик</option>
            <option value="Кардиолог">Кардиолог</option>
            <option value="Невролог">Невролог</option>
            <option value="Ортопед">Ортопед</option>
            <option value="Ендокринолог">Ендокринолог</option>
            <option value="Акушер-гинеколог">Акушер-гинеколог</option>
            <option value="Друго">Друго</option>
          </select>
          <small className="form-text"
          >Посочете област на вашата професионална специализация</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Лечебно или учебно заведение" 
          name="company" value={company}
          onChange={e => onChange(e)}/>
          <small className="form-text"
          >* Посочете здравното/учебното заведение, в което практикувате или се обучавате</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Уебсайт" name="website" value={website}
          onChange={e => onChange(e)}/>
          <small className="form-text"
          >Имате ваш уебсайт?</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Населено място" name="location" value={location}
          onChange={e => onChange(e)} />
          <small className="form-text"
          >Населено място</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Квалификации" name="skills" value={skills}
          onChange={e => onChange(e)}/>
          <small className="form-text"
          >Посочете какви квалификации имате</small
          >
        </div>

        <div className="form-group">
          <textarea placeholder="Представете се с няколко изречения" name="bio" 
          value={bio}  onChange={e => onChange(e)}></textarea>
          <small className="form-text">Разкажете за себе си</small>
        </div>

        <div className="my-2">
          <button onClick={() => toggleSocialinputs(!displaySocialInputs)} type="button" className="btn btn-light">
            Добавете линк към Facebook или Youtube
          </button>
        </div>

        {displaySocialInputs && <Fragment>
          <div className="form-group social-input">
            <i className="fab fa-facebook fa-2x"></i>
            <input type="text" placeholder="Facebook URL" name="facebook" value={facebook}
             onChange={e => onChange(e)}/>
          </div>

          <div className="form-group social-input">
            <i className="fab fa-youtube fa-2x"></i>
            <input type="text" placeholder="YouTube URL" name="youtube" value={youtube}
             onChange={e => onChange(e)} />
          </div>
        </Fragment>}

        <input type="submit" className="btn btn-primary my-1" />
        <a className="btn btn-light my-1" href="dashboard.html">Назад</a>
      </form>
    </Fragment>
  )
}

CreateProfile.propTypesc = {

} 

export default connect()(CreateProfile)