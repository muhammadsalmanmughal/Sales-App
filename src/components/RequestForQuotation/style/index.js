import styled from 'styled-components'
import media from '../../MediaQuery/media'

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