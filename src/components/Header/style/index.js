import styled from 'styled-components'
import media from '../../MediaQuery/media'

export const Navbar = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
height: 50px;
border-bottom: 1px solid gray;
box-shadow: 5px 2px 15px #888888;
`
export const Logo = styled.img`
width:50px;
height: 50px;
margin-left: 10px;
// justify-content: flex-start;
`
export const User = styled.div`
display: flex;
align-items: center;
`
export const UserName = styled.div`
margin-right: 10px;
`
export const UserAvatar = styled.div`
margin-right: 10px;
`
export const DropdownDiv = styled.div`
text-align: center;
justify-content: center;
align-items: center;
margin-top: 10px;
width:250px;
overflow: hidden;
padding:12px;
`
export const UsersFirstName = styled.h4`
margin-top:15px;
word-spacing:1px;
`
export const UsersEmail = styled.p`

`
export const Span = styled.span`
margin-right: 10px;
`


