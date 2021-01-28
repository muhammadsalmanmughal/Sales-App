import React, {useState}  from 'react'
import { registerUser,loginUser } from '../../config/Firebase/firebase';
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
    LoginContainer,
    LoginDiv,
    LoginHeading,
    LoginForm,
    UserEmailTextbox,
    UserNameTextbox,
    PasswordTextbox,
    PrimaryButton,
    SecondryButton,
    SignupCheckbox,
    TextWelcome,
    Paragraph,
    BreakLine
} from './style/index'

export default function SignUp(){
    toast.configure();
    const history = useHistory();
    console.log('history', history)
    const[email , setUserEmail] = useState();
    const[name , setUserName] = useState();
    const[password , setPassword] = useState();
    const onRegister = async () =>{
        try{
             await registerUser(name, email, password)
             history.push('/dashboard');
            console.log('try')
             setUserName('')
             setUserEmail('')
             setPassword('')
             
     }catch(error){
         console.log('catch', error.message) 
         toast.error(error.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 4000,
            hideProgressBar: true,
          });
     }

    }
    return(
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
                    <SecondryButton onClick={onRegister}>Signup</SecondryButton>

                    </LoginForm>
                    <BreakLine/>
                    <Paragraph>

                    Already have an account</Paragraph>
                </LoginDiv>
            </LoginContainer>
        </div>
    )
}