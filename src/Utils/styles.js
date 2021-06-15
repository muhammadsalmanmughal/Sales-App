import styled from 'styled-components'
import media from '../components/MediaQuery/media'


export const Title = styled.p`
font-size: 35px;
letter-spacing: 1.5px;
margin: 0px!important;
color:  #5E6161;
text-align:right;
text-transform: capitalize;
font-family: 'DM Serif Text', serif;
${media.tablet`
text-align: center;
`}
`

export const CName = styled.p`
font-family: 'DM Serif Text', serif;
font-weight: bold;
font-size: 22px;
`
export const CompanyDetails =styled.div`
display: flex;
`
export const Location = styled.div`
display: flex;
flex-direction: row;
h3:nth-child(even){
  margin:0 10px 0 10px;
}
${media.tablet`
text-align: center;
flex-direction: column;
`}
`

export const Contact =styled.div`
margin-left:40px;
display: flex;
flex-direction: row;
h3:nth-child(even){
  margin:0 10px 0 10px;
}
${media.tablet`
text-align: center;
flex-direction: column;
`}
`
export const Name = styled.p`
font-family: 'Assistant', sans-serif;
`
export const Details = styled.div`
display: flex;
flex-direction: row;
justify-content:space-around;
background-color: #f1f1f1;
border-radius: 5px;
padding:15px;
`
export const Paragraph = styled.div`
font-size:14px;
font-weight: bold;
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

export const H3 = styled.div`
text-align: center;
color: #0aa3fc;
font-weight: bold;
text-transform: uppercase
`

export const ListItem = styled.div`
display: flex;
align-items:baseline;
justify-content: space-between;
padding:5px;
border: 1px solid #ebe8e1;
${media.tablet`
flex-direction: column;
`}
`
export const ItemDiv = styled.div`
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
align-items:baseline;
width:50%;
${media.tablet`
width: 100%;
text-align: center;
`}
`
export const Quantity = styled.div`
font-weight: bold;
${media.tablet`
width:100%;
text-align: center;
`}
`
export const DeleteButton = styled.div`

`
// GO BACK
export const Goback = styled.div`
cursor: pointer;
`

export const ItemsDiv = styled.div`
height: 350px;
overflow: scroll;
margin-bottom: 15px;
margin-top:15px;
`
export const ItemsListMainDiv = styled.div`
display: flex;
flex-direction: row;
width:100%;
${media.tablet`
display: flex;
width: 100%;
text-align: center;
flex-direction: column;
transition: 1.5s;
`}
`
export const ItemsListOne = styled.div`
// display:flex;
flex-direction: column;
width:50%;
${media.tablet`
width: 100%;
text-align: center;
`}
`
export const ItemsListTwo = styled.div`
width:50%;
${media.tablet`
width: 100%;
text-align: center;
`}
`