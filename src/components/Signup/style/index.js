import styled from 'styled-components'
import media from '../../MediaQuery/media'

export const LoginContainer = styled.div`
width: 100%;
display: flex;
justify-content: center;
align-items: center;
// background-color: red;
transition: 1s;
`
export const LoginDiv = styled.div`
width: 400px;
// min-width: 200px;
max-width: 400px;
border: 2px solid  #70a2ff;
border-radius: 5px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
background-color: #70a2ff;
margin-top: 120px;
transition: 1s;
${media.desktop`
margin-top: 117px;
width: 40%;
`}
${media.tablet`
width: 80%;
margin: 123px 0 0 0;
padding: 0px 10px 0px 10px;
`}
${media.mobile`
  margin: 128px 0 0 0;
  padding: 0px 10px 0px 10px;
  width: 100%;
`}
${media.smallMobile`
width: 100%;
padding: 0px 10px 0px 10px;
`}
`
export const TextWelcome = styled.h1`
font-family: 'Quicksand', sans-serif;
color: white;
`
export const LoginHeading = styled.h3`
font-family: 'Quicksand', sans-serif;
color: white;
`
export const LoginForm = styled.div`
width: 90%;
display: flex;
flex-direction: column;
margin: 10px;
// background-color: green;
padding: 10px;
`
export const UserNameTextbox = styled.input`
width: 100%;
  height: 50px;
  color: #000;
  // background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-sizing: border-box;
  // border-radius: 5px;
  margin-bottom: 12px;
  padding: 10px 11px;
  font-size: 18px;
  &::placeholder{
    font-size: 16px;
    line-height: 19px;
    color: black;
  }
`
export const PasswordTextbox = styled(UserNameTextbox)`

`
export const UserEmailTextbox = styled(UserNameTextbox)`

`
export const ErrorText = styled.p`
color: red;
`

export const PrimaryButton = styled.button`
height: 50px;
border: 1px solid rgba(255, 255, 255, 0.3);
font-family: 'Quicksand', sans-serif;
font-size: 20px;
margin-top: 20px;
cursor: pointer;
background-color: white;
color: #70a2ff;
transition: .5s;
font-weight: bold;
&:hover{
  background-color: #70a2ff;
  color: white;
  border: 1px solid #fff;
}
`
export const SecondryButton = styled(PrimaryButton)`
`
export const SignupCheckbox = styled.input`
cursor: pointer;
`
export const Paragraph = styled.p`
color:#fff;
`
export const BreakLine = styled.div`
  width:100%;
  height: 0;
  border: 1px solid #fff;
  margin-top: 25px;
`