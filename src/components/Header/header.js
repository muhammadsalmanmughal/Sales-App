import React, { useState } from 'react'
import firebase from '../../config/Firebase/firebase'
import { useHistory } from 'react-router-dom'
import { getUserData } from '../../Utils/utils'
import {
    Navbar,
    Logo,
    User,
    UserName,
    UserAvatar,
    DropdownDiv,
    UsersFirstName,
    UsersEmail,
    Span
} from './style/index'
import { Avatar, Menu, Dropdown, Divider } from 'antd';
import { UserOutlined, LogoutOutlined, } from "@ant-design/icons";
import 'antd/dist/antd.css';


const Header = () => {
    const [userFirstName, setUserFirstName] = useState('')
    const [userLastName, setUserLastName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userImage, setUserImage] = useState(null)
    const history = useHistory();
    const onLogout = () => {
        firebase.auth().signOut()
            .then(() => {
                localStorage.removeItem('Authorization')
                localStorage.removeItem('userId')
                history.replace('/')
            })
    }
    
   const userInfo = getUserData().then((data)=>{
    //    console.log('user data ===========> $',data[0].name);
       setUserFirstName(data[0].name)
       setUserEmail(data[0].email)
      setUserImage(data[0].url)
    //    console.log('user data ===========> $',data[0].email);
    //    console.log('user data ===========> $',data[0].name);
   });
   
//    console.log('User data form header', userInfo)
    const showProfile = () => {
        // console.log('userData funtion', getUserData())
        history.replace('/home/user-profile')
    }
   
    const menu = (
        <Menu>

            <DropdownDiv>
                <Avatar
                    src={userImage}
                    size={64}
                    icon={!userImage ? <UserOutlined /> : ''}
                />
                <UsersFirstName>Hello {userLastName ? userLastName : 'User'}</UsersFirstName>
                <UsersEmail>{userEmail}</UsersEmail>
                <Divider />
            </DropdownDiv>
            <Menu.Item>
                <a onClick={showProfile}>
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
                    <UserName>User First Name</UserName>
                    <UserAvatar>
                        <Dropdown overlay={menu}>
                            <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                                <Avatar
                                    src={userImage}
                                    size='large'
                                    icon={!userImage ? <UserOutlined /> : ''}
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
