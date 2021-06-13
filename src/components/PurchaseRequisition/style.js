import styled from 'styled-components'
import media from '../MediaQuery/media'


export const IdDate = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
${media.tablet`
text-align: center;
flex-direction: column;
`}
`