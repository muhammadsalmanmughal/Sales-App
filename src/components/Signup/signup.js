import React, { useState } from 'react'
import { createUser } from '../../config/Firebase/firebase';
import { useHistory } from "react-router-dom";


import {
    LoginContainer,
    LoginDiv,
    LoginHeading,
    LoginForm,
    UserEmailTextbox,
    UserNameTextbox,
    PasswordTextbox,
    SecondryButton,
    TextWelcome,
    Paragraph,
    BreakLine,
    Link
} from './style/index'

export default function SignUp() {
    const history = useHistory();
    // console.log('history', history)
    const [email, setUserEmail] = useState('');
    const [name, setUserName] = useState('');
    const [password, setPassword] = useState('');

    if (localStorage.getItem('Authorization')) {
        history.replace('/home')
        return
    }

    const signUp = async () => {
        try {
            await createUser(email, password, name);
        } catch (error) {
            console.log(error)
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
                        Create an account
                    </LoginHeading>
                    <LoginForm>
                        <UserNameTextbox
                            type='text'
                            placeholder='Name'
                            onChange={e => setUserName(e.target.value)}
                        />
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
                        <SecondryButton onClick={signUp}>Signup</SecondryButton>

                    </LoginForm>
                    <BreakLine />
                    <Paragraph>
                        Already have an account
                    <Link onClick={() => history.push('./')}>Login</Link>
                    </Paragraph>
                </LoginDiv>
            </LoginContainer>
        </div>
    )
}