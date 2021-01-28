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

export default function Login(){
    toast.configure();
    const history = useHistory();
    console.log('history', history)
    const[email , setUserEmail] = useState();
    const[password , setPassword] = useState();

 const onLogin = async () =>{
    try{
        await loginUser(email, password)
        history.push('/dashboard');
    }catch(error){
        console.log(error.message)  
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
                        Login to continue to Sales-App
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
                    <BreakLine/>
                    <Paragraph>
                   Don't have an account?  
                   <a onClick={() => history.push("/signup")}>
                       SignUp
                   </a>
                    </Paragraph>
                </LoginDiv>
            </LoginContainer>
        </div>
    )
}