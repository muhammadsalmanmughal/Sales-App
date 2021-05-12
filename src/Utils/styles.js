import styled from 'styled-components'
import media from '../components/MediaQuery/media'


export const Title = styled.h1`
letter-spacing: 2px;
text-transform: uppercase;
`
//Submit Button

export const SubmitButton = styled.button`
padding: 3px 12px 3px 12px;
color: gray;
background-color: white;
border: 1px solid gray;
border-radius: 2px;
cursor: pointer;
transition: .5s;
&:hover{
    color: #0aa3fc;
    background-color: white;
    border: 1px solid #0aa3fc;
  }
`

// For List Items

export const ListItem = styled.div`
display: flex;
align-items:baseline;
justify-content: space-between;
padding:5px;
border: 1px solid #ebe8e1;
// background-color: red; 
${media.tablet`
flex-direction: column;
`}
`
export const ItemDiv = styled.div`
// width:70%;
// background-color: orange;
font-weight: bold;
align-item:baseline;
${media.tablet`
width:100%;
text-align: center;
`}
`
export const QuantityAndButtonDiv = styled.div`
display:flex;
justify-content: space-between;
// background-color: blue; 
align-items:baseline;
width:200px;
${media.tablet`
width: 100%;
`}
`
export const Quantity = styled.div`
font-weight: bold;
`
export const DeleteButton = styled.div`

`