import React, { useRef } from 'react'
import ReactToPrint from 'react-to-print'
import { useHistory } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import { Goback, } from '../../Utils/styles'
import { getDataById } from '../../Utils/utils'
import { Button, Skeleton, Tag, Table, Row, Col } from 'antd'
import { DetailsDiv, CustomerDiv, InvoiceDiv } from './style'
import { InvoiceDetails, InvoiceDetailsData, Location, Title } from '../../Utils/styles'
import { CaretLeftOutlined } from '@ant-design/icons'

class CreateReport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            invoiceId: window.location.pathname.split('customerInvoice/').pop(),
            InvoiceData: []
        }
    }

    componentDidMount() {
        getDataById('Invoices', this.state.invoiceId).then(data => {
            this.setState({
                InvoiceData: data,
            })
            // setInvoiceDetails(data)
            // setInvoiceItemList(data && data.flatMap(i => i.OrderItems))
        })
    }

    render() {
        console.log('this . state----->', this.state.InvoiceData)
        const current_datetime = new Date()
        const utc = current_datetime.getDate() + '-' + (current_datetime.getMonth() + 1) + '-' + current_datetime.getFullYear()
        
        const invoiceItemList = this.state.InvoiceData?.flatMap(i => i.OrderItems)
        const totalAmount = this.state.InvoiceData.map(item => item.TotalAmount)
        const columns = [
            {
                title: 'Item Name',
                dataIndex: 'item',
                key: 'item_name',
            },
            {
                title: 'Requested Quantity',
                dataIndex: 'quantity',
                key: 'requested',
            },
            {
                title: 'Price Per Item',
                dataIndex: 'itemPrice',
                key: 'price',
            }
        ];
        return (
            <div>
                <Title>Customer Invoice</Title>
                <Row gutter={[10,10]}>
                    <Col xs={24} sm={20}>
                <img src={Logo} style={{ width: '100px', height: '100px' }} />
                    </Col>
                    <Col xs={24} sm={4}>
                        <h3>Date: {utc}</h3>
                    </Col>
                </Row>
                <h3>Sam's Star</h3>
                <Location>
                    <div>
                        <h4>Street Address</h4>
                        <h4>Karachi, Sindh, 123456 &nbsp; </h4>
                    </div>
                    <div>
                        <h4>Phone# 0310-1234567 </h4>
                        <h4>Email: samsStar@gmail.com</h4>
                        <h4>www.SamsStar.com</h4>
                    </div>
                </Location>

                <div>
                    {this.state.InvoiceData?.map(item => {
                        return <div>
                            <DetailsDiv>
                                <CustomerDiv>
                                    <h2>Customer:</h2>
                                    <h3>Name: {item.CustomerName}</h3>
                                    <h3>Company: {item.CompanyName}</h3>
                                    <h3>Address: {item.Address}</h3>
                                    <h3>{item.City}, {item.State}, {item.PostalCode}</h3>

                                </CustomerDiv>
                                <InvoiceDiv>
                                    <h2>Invoice:</h2>
                                    <h3>Invoice Created: {item.InvoiceCreateDate}</h3>
                                </InvoiceDiv>
                            </DetailsDiv>
                        </div>
                    })}
                </div>
                <div>
                    {invoiceItemList ?
                        <Table dataSource={invoiceItemList} columns={columns} /> : <Skeleton />
                    }
                </div>
                <h3> Total Amount: &nbsp;
                    <Tag color='green' size='large'>
                     {
                     totalAmount
                     }
                        Rs.
                    </Tag>
                </h3>
            </div >
        )
    }
}

const CustomerInvoicePDF = () => {
    const componentRef = useRef();
    const history = useHistory()
    return (
        <div>
            <Goback onClick={e => history.goBack()}>
                <CaretLeftOutlined /> GoBack
            </Goback>
            <CreateReport ref={componentRef} />

            <ReactToPrint
                content={() => componentRef.current}
                trigger={() => <Button>Create PDF Report</Button>}
            />
        </div>

    )
}
export default CustomerInvoicePDF
