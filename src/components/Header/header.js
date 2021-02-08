import React, { useContext } from 'react'
import { UserDataContext } from '../../context/UserContext/UserContext'
import firebase from '../../config/Firebase/firebase'
import { useHistory } from 'react-router-dom'

import {
    Navbar,
    Logo,
    User,
    UserName,
    UserAvatar,
    DropdownDiv,
    HeadingFour,
    Paragraph,
    Span
} from './style/index'
import { Avatar, Menu, Dropdown, Divider } from 'antd';
import { UserOutlined, LogoutOutlined, } from "@ant-design/icons";
import 'antd/dist/antd.css';


const Header = () => {
    const history = useHistory();
    const onLogout = () => {
        firebase.auth().signOut()
            .then(() => {
                localStorage.removeItem('Authorization')
                history.replace('/')
            })
    }
    const { userData } = useContext(UserDataContext)
    // const {User} = context
    console.log('Context--------->', userData)
    const menu = (
        <Menu>

            <DropdownDiv>
                <Avatar
                    src={userData.url}
                    size={64}
                    icon={!userData.url ? <UserOutlined /> : ''}
                />
                <HeadingFour>Hello {userData.lastname}</HeadingFour>
                <Paragraph>{userData.email}</Paragraph>
                <Divider />
            </DropdownDiv>
            <Menu.Item>
                <a>
                    <UserOutlined />
                    Profile
            </a>
            </Menu.Item>
            <Menu.Item>
                <a>
                    3rd menu item
            </a>
            </Menu.Item>
            <Menu.Item>
                <a onClick={onLogout}>

                    <LogoutOutlined />
                Logout
                </a>
            </Menu.Item>
        </Menu>
    );
    return (
        <div>
            <Navbar>
                <Logo src='https://1000logos.net/wp-content/uploads/2017/08/CAT-logo.png' />
                {/* <h5>Logo</h5> */}
                <User>
                    <UserName>{userData.firstname}</UserName>
                    <UserAvatar>
                        <Dropdown overlay={menu}>
                            <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                                <Avatar
                                    src={userData.url}
                                    size='large'
                                    icon={!userData.url ? <UserOutlined /> : ''}
                                />
                            </a>
                        </Dropdown>
                    </UserAvatar>
                </User>
            </Navbar>
        </div>
    )
}
export default Header
