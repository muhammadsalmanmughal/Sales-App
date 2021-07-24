import React, { useState, useContext, useEffect } from 'react'
import firebase from '../../config/Firebase/firebase'
import { useHistory } from 'react-router-dom'
import { message } from 'antd';
import { UserContext } from '../../context/UserContext/UserContext'
import CompanyLogo  from '../../assets/logo.png'
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

    const history = useHistory();

    const onLogout = () => {
        firebase.auth().signOut()
            .then(() => {
                localStorage.removeItem('Authorization')
                localStorage.removeItem('userId')
                history.replace('/')
            })
    }

    // const userInfo = getUserData().then((data) => {
    //     console.log('user data ===========> $', data[0]);
    //     // setUser(data[0])
    //     // setUserFirstName(data[0].name)
    //     // setUserEmail(data[0].email)
    //     // setUserImage(data[0].url)
    // });


    const getUserData = () => {
        const userID = localStorage.getItem('userId')
        // console.log('USER ID============>',userID);
        firebase
            .firestore()
            .collection("Users")
            .where("userId", "==", userID)
            .get()
            .then(function (querySnapshot) {
                const comlist = [];
                querySnapshot.forEach(function (doc) {
                    if (doc.exists) {
                        const comp = doc.data();
                        comlist.push({ ...comp, compId: doc.id });
                    } else {
                        message.info("No such document!");
                    }
                });
                setUser(comlist)
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });

    }
    useEffect(() => {
        getUserData()
    }, [])
    
    const showProfile = () => {
        history.replace('/home/user-profile')
    }
    useEffect(()=>{
        user&&user.map((item, key)=>{
            setUserLastName(item.name)
            setUserFirstName(item.name)
            setUserImage(item.url)
            setUserEmail(item.email)
        })
    },[user])
  

    const menu = (
        <Menu>
                    <>          
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
            </>
        </Menu>
    );
    return (
        <div>
            <Navbar>
                <Logo src={CompanyLogo}/>
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
