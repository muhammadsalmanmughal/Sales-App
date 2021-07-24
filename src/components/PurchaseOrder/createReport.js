import React, { useRef } from 'react'
import ReactToPrint from 'react-to-print'
import { useHistory } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import { Goback, } from '../../Utils/styles'
import { getDataById } from '../../Utils/utils'
import { Button, Skeleton, Tag, Table } from 'antd'
import { Location,Title,InvoiceDetails, InvoiceDetailsData } from '../../Utils/styles'
import { CaretLeftOutlined } from '@ant-design/icons'

class CreateReport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            invoiceId: window.location.pathname.split('createInvoice/').pop(),
            gRData: [],
            TotalInvoiceAmount: ''
        }
    }
    componentDidMount() {
        getDataById('Goods_Receipts', this.state.invoiceId).then(data => {
            this.setState({
                gRData: data.map(gritem => {
                    return {
                        ...gritem, grItemList: gritem.grItemList.map(grlistitem => {
                            return {
                                ...grlistitem,
                                itemAmount: Number(grlistitem.itemPrice) * grlistitem.retreiveQuantity
                            }
                        })
                    }
                })
            })
        })
    }

    render() {
        const goodReceiptDetails = [
            {
                title: 'Item ID',
                dataIndex: 'itemId',
                key: 'id',
            },
            {
                title: 'Item Name',
                dataIndex: 'items',
                key: 'name',
            },
            {
                title: 'Quality',
                dataIndex: 'itemQuality',
                key: 'quality',
            },
            {
                title: 'UOM',
                dataIndex: 'uom',
                key: 'uom',
            },
            {
                title: 'Per Price',
                dataIndex: 'itemPrice',
                key: 'perPrice',
            },
            {
                title: 'Requested Quantity',
                dataIndex: 'quantity',
                key: 'requestedQuantity',
            },
            {
                title: 'Retreive Quantity',
                dataIndex: 'retreiveQuantity',
                key: 'retreiveQuantity',
            },
            {
                title: 'Remaining Quanity',
                dataIndex: 'remainingQuantity',
                key: 'remainingQuantity',
            },
            {
                title: 'Item Amount',
                dataIndex: 'itemAmount',
                key: 'amount',
            }
        ]

        const itemsList = this.state.gRData?.flatMap(item => item.grItemList)
        return (
            <div>
                <Title>Vendor Invoice</Title>
                <img src={Logo} style={{ width: '100px', height: '100px' }} />
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

                <InvoiceDetails>
                    {this.state.gRData.map(item => {
                        return <div>
                            <InvoiceDetailsData>
                                <div>
                                    <h3>Vendor:</h3>
                                    <p>{item.Vendor}</p>

                                </div>
                                <div>
                                    <h3>Details</h3>
                                    <p>GR Date: {item.Created_Date}</p>
                                    <p>GR No#: {item.GR_id}</p>
                                </div>

                            </InvoiceDetailsData>
                        </div>
                    })}
                </InvoiceDetails>
                <div>
                    {itemsList ?
                        <Table dataSource={itemsList} columns={goodReceiptDetails} /> : <Skeleton />
                    }
                </div>
                {/* <h3>{this.state.TotalInvoiceAmount}</h3> */}
                <h3> Total Amount: &nbsp;
                    <Tag color='green' size='large'>
                        {
                            this.state.gRData && itemsList && itemsList.reduce((acc, current) => {
                                return acc + current.itemAmount
                            }, 0)
                        }
                        Rs.
                    </Tag>
                </h3>
            </div >
        )
    }
}


const PrintDoc = () => {
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
    );
};

export default PrintDoc;