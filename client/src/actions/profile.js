import axios from 'axios'
import { setAlert } from './alert'

import {
    GET_PROFILE,
    PROFILE_ERROR
} from './types'

//Get current users profile

export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('api/profile/me')
        console.log("Res", res)
        dispatch({
            type: GET_PROFILE,
            payload: res.data 
        })

    } catch (err) {
         dispatch({ 
            type: PROFILE_ERROR,
            payload: { msg: err.response.statustext, status: err.response.status }
        }) 
    }
}
//Create ot update profile
export const createProfile = (formData, history, edit = false) => async dispatch => {

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post('api/profile', formData, config)
        dispatch({
            type: GET_PROFILE,
            payload: res.data 
        })

        dispatch(setAlert(edit ? 'Обновяване на профила' : 'Създаден профил', 'success'))

        if(!edit){
            history.push('/dashboard')
        }

    } catch (err) {
        const errors = err.response.data.errors

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({ 
            type: PROFILE_ERROR,
            payload: { msg: err.response.statustext, status: err.response.status }
        }) 
    }
}

//Add experience
export const addExperience = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put('api/profile/experience', formData, config)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data 
        })

        dispatch(setAlert('Добавяне на нови квалификации', 'success'))

       
            history.push('/dashboard')
        

    } catch (err) {
        const errors = err.response.data.errors

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({ 
            type: PROFILE_ERROR,
            payload: { msg: err.response.statustext, status: err.response.status }
        }) 
    }    
}

//Add education
export const addEducation = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put('api/profile/education', formData, config)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data 
        })

        dispatch(setAlert('Добавяне на нова образователна степен', 'success'))
        history.push('/dashboard')
        
    } catch (err) {
        const errors = err.response.data.errors

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({ 
            type: PROFILE_ERROR,
            payload: { msg: err.response.statustext, status: err.response.status }
        }) 
    }    
}

