import React from 'react'
import {ErrorMessage} from './style/index'

const ErrorText = ({text}) => {
    return (
        <ErrorMessage>
           * {text}
        </ErrorMessage>
    )
}
export default ErrorText