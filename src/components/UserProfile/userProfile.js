import React from 'react'
import { Divider } from 'antd';
import {
    ProfileMainDiv
} from './style/index';
import {TextBox} from '../Textbox/style/index'
const UserProfile = () => {
    return (
        <div>
            <h1>User Profile</h1>
            <Divider />
            <ProfileMainDiv>
                <h1>fsdu</h1>
                <TextBox/>
            </ProfileMainDiv>
        </div>
    )
}
export default UserProfile