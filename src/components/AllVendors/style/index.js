import styled from 'styled-components'

export const TableDiv = styled.div`
width: 100%;
@media (max-width: 640px) {
    // width: 90%;
    overflow: scroll;
  }
`
export const Table = styled.table`
width: 100%;
`
export const TableHead = styled.thead`
// overflow: scroll;
`
export const TableBody = styled.tbody`

`
export const TableRow = styled.tr`
@media (max-width: 640px) {
    padding: 15px;
    overflow: scroll;
  }
`
export const TableData = styled.td`
@media (max-width: 640px) {
    overflow: scroll;
  }

`
export const TableHeading = styled.th`
padding-right: 10px;
`
export const EmptyDiv = styled.div`
width:100%;
margin-top: 200px;
`
export const LoaderDiv = styled.div`

`