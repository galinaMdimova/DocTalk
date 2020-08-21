import React, { Fragment } from 'react'

const NotFound = () => {
    return (
        <Fragment>
            <h1 className="x-large text-primary">
            <i className="fas fa-exclamation-triangle"></i> Страницата не е намерена
            </h1>
            <p className="lareg"> Тази страница не съществува</p>
        </Fragment>
    )
}

export default NotFound 