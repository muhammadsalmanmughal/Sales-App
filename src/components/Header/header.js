import React, { useContext } from 'react'
import { UserDataContext } from '../../context/UserContext/UserContext'
import {
    Navbar,
    Logo,
    User,
    UnorderList,
    ListItem
} from './style/index'
import { Avatar } from 'antd';
import 'antd/dist/antd.css';


const Header = () => {
    const { userData } = useContext(UserDataContext)
    // const {User} = context
    console.log('Context--------->', userData)
    return (
        <div>
            <Navbar>
                <Logo src='https://1000logos.net/wp-content/uploads/2017/08/CAT-logo.png' />
                <User>
                    <UnorderList>
                        <ListItem>user name :</ListItem>
                        <ListItem>
                            Avatar
                        </ListItem>
                    </UnorderList>
                </User>
            </Navbar>
        </div>
    )
}
export default Header
