import React, { useState } from 'react'
import { loginUser } from '../../Utils/utils';
import { useHistory } from "react-router-dom";
import 'antd/dist/antd.css';
import { message } from 'antd';
import {
    LoginContainer,
    LoginDiv,
    LoginHeading,
    LoginForm,
    UserEmailTextbox,
    PasswordTextbox,
    PrimaryButton,
    TextWelcome,
    Paragraph,
    BreakLine,
    Link
} from './style/index'

export default function Login() {
    const history = useHistory();
    const [email, setUserEmail] = useState();
    const [password, setPassword] = useState();
    const [errorMessage, setErrorMessage] = useState(false)

    if (localStorage.getItem('Authorization')) {
        history.replace('/home')
        // return
    }

    const onLogin = () => {
        if (!email || !password) {
            message.error('Enter valid credentials')
        } else {
            loginUser(email, password)
                .then((res) => {
                    // let token = res.auth.
                    let token = 'dummy_token'
                    localStorage.setItem('Authorization', token)
                    history.replace('/home')
                });
        }
    }
    return (
        <div>
            <LoginContainer>
                <LoginDiv>
                    <TextWelcome>
                        Welcome
                    </TextWelcome>
                    <LoginHeading>
                        Login to Sales-App
                    </LoginHeading>
                    <LoginForm>
                        <UserEmailTextbox
                            type='text'
                            placeholder='Email'
                            onChange={e => setUserEmail(e.target.value)}
                        />
                        <PasswordTextbox
                            type='password'
                            placeholder='Password'
                            onChange={e => setPassword(e.target.value)}
                        />
                        <PrimaryButton onClick={onLogin}>Continue</PrimaryButton>
                    </LoginForm>
                    <BreakLine />
                    <Paragraph>
                        Don't have an account?
                   <Link onClick={() => history.push("/signup")}>
                            SignUp
                   </Link>
                    </Paragraph>
                </LoginDiv>
            </LoginContainer>
        </div>
    )
}