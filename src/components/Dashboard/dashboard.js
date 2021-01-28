import React from 'react'
import {firebase} from '../../config/Firebase/firebase'
const Dashboard = () => {
return(
    <div>
        <h1>Dashboard</h1>
        <button onClick={() => firebase.auth().signOut()}> logout </button>
    </div>
)
}
export default Dashboard