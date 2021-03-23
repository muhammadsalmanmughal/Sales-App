import React, { useState, useContext, useEffect } from 'react'
import firebase from '../../config/Firebase/firebase'
import { useHistory } from 'react-router-dom'
import { message } from 'antd';
import { getUserData } from '../../Utils/utils'
import { UserContext } from '../../context/UserContext/UserContext'
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

    const { user, setUser } = useContext(UserContext)

    console.log('UserContext', UserContext)
    const history = useHistory();


    const onLogout = () => {
        firebase.auth().signOut()
            .then(() => {
                localStorage.removeItem('Authorization')
                localStorage.removeItem('userId')
                history.replace('/')
            })
    }

    const userInfo = getUserData().then((data) => {
        console.log('user data ===========> $', data);
        setUser(data)
        // setUserFirstName(data[0].name)
        // setUserEmail(data[0].email)
        // setUserImage(data[0].url)
    });
// console.log('userO=Info------>',userInfo&&userInfo)
    // const getUserData = () => {
    //     const userID = localStorage.getItem('userId')
    //     // console.log('USER ID============>',userID);
    //     firebase
    //         .firestore()
    //         .collection("Users")
    //         .where("userId", "==", userID)
    //         .get()
    //         .then(function (querySnapshot) {
    //             const comlist = [];
    //             querySnapshot.forEach(function (doc) {
    //                 if (doc.exists) {
    //                     const comp = doc.data();
    //                     comlist.push({ ...comp, compId: doc.id });
    //                 } else {
    //                     message.info("No such document!");
    //                 }
    //             });
    //             setUser(comlist)
    //             // setCompanyList(comlist);
    //             // setInitialCompany(comlist);
    //             // console.log('data-------->', comlist)
    //             // return comlist
    //         })
    //         .catch(function (error) {
    //             console.log("Error getting documents: ", error);
    //         });

    // }
    // useEffect(() => {
    //     getUserData()
    // }, [])


    console.log('user data from context', user);

    const showProfile = () => {
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
