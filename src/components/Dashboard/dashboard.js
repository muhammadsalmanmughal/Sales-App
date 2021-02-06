import React from 'react'
import { useHistory } from 'react-router-dom'

import firebase from '../../config/Firebase/firebase'
import './Styled/index.css'
const Dashboard = () => {
    const history = useHistory()
    const onLogout = () => {
        firebase.auth().signOut()
            .then(() => {
                localStorage.removeItem('Authorization')
                history.replace('/')
            })
    }
    return (
        <div>

            <h1>Dashboard</h1>
            <button className='waves-effect waves-light btn' onClick={onLogout}> logout </button>
        </div>
    )
}
export default Dashboard