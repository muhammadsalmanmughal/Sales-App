import styled from 'styled-components'
import media from '../../MediaQuery/media'

export const VendorMainDiv = styled.div`
// background-color: red;
`
export const FormDiv = styled.div`
// display: flex;
// background-color: blue;
// flex-direction: column;
${media.mobile`
//   margin: 128px 0 0 0;
//   padding: 0px 10px 0px 10px;
//   width: 100%;
// background-color: red;
flex-direction: column;
`}
`
