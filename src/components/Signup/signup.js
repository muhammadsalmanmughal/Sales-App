import React, { useState } from 'react'
import { createUser } from '../../Utils/utils';
import { useHistory } from "react-router-dom";
import {Spin, Divider, message} from "antd";
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
    LoadingSpan,
    Link
} from './style/index'

export default function SignUp() {
    const history = useHistory();
    const [email, setUserEmail] = useState('');
    const [name, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setLoading] = useState(false)
    const [img, setImg] = useState(null);

    if (localStorage.getItem('Authorization')) {
        history.replace('/home')
        return
    }

    const signUp = async () => {
        try {
            await createUser(email, password, name, img)
            .then(()=>{
                setLoading(true)
                history.replace('/home')
            })
        } catch (error) {
            console.log(error)
            message.error(error.message)
        }
    }
    const onImageUpload = (e) => {
        setImg(e.target.files[0]);
    };
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
                        <div className="input-field  col s12">
                            <input type="file" multiple onChange={onImageUpload} />
                        </div>
                        <SecondryButton 
                        onClick={signUp}>
                            Signup
                            <LoadingSpan>
                            {isLoading ? <Spin/> : ''}
                            </LoadingSpan>
                            </SecondryButton>

                    </LoginForm>
                    <Divider />
                    <Paragraph>
                        Already have an account
                    <Link onClick={() => history.push('./')}>Login</Link>
                    </Paragraph>
                </LoginDiv>
            </LoginContainer>
            
        </div>
    )
}