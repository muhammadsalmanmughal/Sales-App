import React, { useState, useContext, useEffect } from 'react'
import firebase from '../../config/Firebase/firebase';
import { VendorCustomerContext } from '../../context/Random/random'
import { CreateRFQ, getPR, getPrById, getRFQById } from '../../Utils/utils'
import {
  Title, Paragraph, CName, CompanyDetails, Location,
  Contact, H3
} from '../../Utils/styles'
import {
  Tabs,
  message,
  Row,
  Col,
  Button,
  Select,
  List,
  Tag,
  Space,
  Table,
  Skeleton,
  Modal
} from 'antd'

const RequestForQuatation = () => {
  const { vendors } = useContext(VendorCustomerContext)
  const [selectedVendor, setSelectedVendor] = useState()
  const [allPRData, setAllPRData] = useState()
  const [prData, setPRData] = useState()
  const [prItems, setPRItems] = useState()
  const [prStatus, setPrStatus] = useState()
  const [allRFQ, setAllRFQ] = useState()
  const [rfqDetails, setRfqDetails] = useState()
  console.log('rfqDetails: ', rfqDetails);
  const [showModal, setShowModal] = useState(false);


  const shortid = require('shortid')
  const RFQiD = shortid.generate()

  const { TabPane } = Tabs;

  const getAllRFQ = () => {
    firebase
      .firestore()
      .collection('RFQ')
      .onSnapshot(function (querySnapshot) {
        const allRFQs = []
        querySnapshot.forEach(function (doc) {
          if (doc.exists) {
            const comp = doc.data()
            allRFQs.push({ ...comp, compId: doc.id })
          } else {
            message.info('No data to show.')
          }
        })
        setAllRFQ(allRFQs)
      })
      // .catch(function (error) {
      //   message.error('Error!', error.message)
      // })
  }

  useEffect(() => {
    getPR().then(data => {
      setAllPRData(data)
    })
    getAllRFQ()
  }, [])

  const utc = new Date().toJSON().slice(0, 10).replace(/-/g, '/');

  const selectRequisition = (id) => {
    getPrById(id).then(data => {
      setPRData(data)
      const itemsList = data?.flatMap(items => items.ItemsList)
      setPRItems(itemsList)
      setPrStatus(data[0].Status)
    })
  }

  function selectVednor(value) {
    setSelectedVendor(value)
  }

  const generateRFQ = () => {
    if (!selectedVendor) return message.error('Error! Vendor is not selected')
    if (!prData.length) return message.error('Error! Invalid items list')
    const QuoationData = {
      RFQ_Id: RFQiD,
      Requisition_Id: prData[0].RequisitionId,
      CreationDate: utc,
      Vendor: selectedVendor,
      Items: prItems,
      PR_RequesterName: prData[0].RequesterName,
      PR_RequesterEmail: prData[0].RequesterEmail,
      PR_Status: prData[0].Status,
      PR_Created: prData[0].CreatedDate,
      PR_RequiredDate: prData[0].RequriedDate,
      CompanyName: 'Sams Star',
      Address: 'abcdefghijkl',
      City: 'Karachi',
      State: 'Sindh',
      PostalCode: '123456',
      Phone: '1234-1234-123'
    }
    CreateRFQ(QuoationData)
    setPRItems([])
    setPRData([])
  }
  const getRFQDetails = (id) => {
    setShowModal(true)
    getRFQById(id).then(data => {
      setRfqDetails(data)
    })
  }
  const itemsList = rfqDetails?.flatMap(list => list.Items)

  const tbl_RFQ = [
    {
      title: 'RFQ Id',
      dataIndex: 'RFQ_Id',
      key: 'id',
    },
    {
      title: 'Vendor Name',
      dataIndex: 'Vendor',
      key: 'vendorName',
    },
    {
      title: 'Requester Name',
      dataIndex: 'PR_RequesterName',
      key: 'requesterName',
    },
    ,
    {
      title: 'Requester Email',
      dataIndex: 'PR_RequesterEmail',
      key: 'requesterEmail',
    },
    {
      title: 'Created Date',
      dataIndex: 'CreationDate',
      key: 'created_date',
    },
    // {
    //     title: 'Status',
    //     key: 'status',
    //     render: (allPO) => (
    //         <Space size="middle">
    //             <Select
    //                 defaultValue={allPO.Status}
    //                 placeholder='Select Status'
    //                 style={{ width: 200 }}
    //                 onChange={e => changeStatus(e, allPO.iD)}>
    //                 <Select.Option value="approved">Approved</Select.Option>
    //                 <Select.Option value="rejected">Rejected</Select.Option>
    //                 <Select.Option value="cancle">Cancle</Select.Option>
    //             </Select>
    //         </Space>
    //     ),
    // },
    {
      title: 'Action',
      key: 'action',
      render: (rfq) => (
        <Space size="middle">

          <Button
            onClick={() =>
              getRFQDetails(rfq.iD)
            }
          >Details</Button>
        </Space>
      ),
    }
  ]

  const tbl_RFQDetails = [
    {
      title: 'Item Name',
      dataIndex: 'itemName',
      key: 'itm_name',
    },
    {
      title: 'Quantity',
      dataIndex: 'itemQuantity',
      key: 'quantity',
    },
    {
      title: 'Unit of Measure',
      dataIndex: 'uom',
      key: 'unit_of_measure',
    },
    {
      title: 'Total Price',
      dataIndex: 'price',
      key: 'price',
    }
  ]

  return (
    <div>
      <Title>Request For Quotation</Title>
      <Row gutter={[10, 10]}>
        <Col xs={24} sm={8}>
          <Paragraph>
            RFQ-ID: {RFQiD}
          </Paragraph>
        </Col>
        <Col xs={24} sm={12}>
          <Paragraph>Date: {utc}</Paragraph>
        </Col>
      </Row>
      <CName>SAM's Star</CName>
      <Paragraph>
        Address:
       </Paragraph>
      <CompanyDetails>
        <Location>
          <h3>Karachi, </h3>
          <h3>Sindh, </h3>
          <h3>123456</h3>
        </Location>
        <Contact>
          <h3><b>Phone#</b> 1234-1234-123</h3>
          <h3><b>Email</b> abc@gmail.com</h3>
          <h3><b>Website</b> www.company.pk</h3>
        </Contact>
      </CompanyDetails>
      <Tabs defaultActiveKey="1" >
        <TabPane tab="Create RFQ" key="1">
          <Row gutter={[10, 10]}>
            <Col>
              <Select
                style={{ width: 200 }}
                placeholder='Select Requisition ID'
                onChange={selectRequisition}
              >
                {allPRData && allPRData.map((name) => <Select.Option
                  value={name.RequisitionId}
                >
                  {name.RequisitionId}
                </Select.Option>
                )}
              </Select>
            </Col>
            <Col>
              <Select
                style={{ width: 200 }}
                placeholder='Select Vendor'
                onChange={selectVednor}
              >
                {vendors && vendors.map((name) => <Select.Option
                  value={name.companyName}
                >
                  {name.companyName}
                </Select.Option>
                )}
              </Select>
            </Col>
          </Row>
          {prData && prData.map((item, key) => {
            return (
              <div>
                {/* <p>{`PO-ID: ${item.POiD}`}</p> */}
                <p>{`Requisition Id: ${item.RequisitionId}`}</p>
                <p>{`Requester Name: ${item.PR_RequesterName}`}</p>
                <p>{`Requester Email: ${item.PR_RequesterEmail}`}</p>
                <p>Status: <Tag color={item.Status == 'approved' ? 'green' : 'red'}>{item.Status}</Tag></p>
                <p>{`Created Date: ${item.CreatedDate}`}</p>
                <p>{`Required Date: ${item.PR_RequiredDate}`}</p>
              </div>
            )
          })
          }
          <List
            size='small'
            itemLayout="horizontal"
            bordered
            header={<H3>Order ITem</H3>}
            dataSource={prItems}
            style={{ marginTop: '15px', transistion: '1s' }}
            renderItem={items => (
              <List.Item>
                <List.Item>
                  <Paragraph>Item Name: <Tag color='geekblue' style={{ marginLeft: '5px', marginRight: '5px' }}>{items.itemName}</Tag> </Paragraph>
                  <Paragraph>Item Quantity: <Tag color='green' style={{ marginLeft: '5px', marginRight: '5px' }}>{items.itemQuantity}-{items.uom}</Tag> </Paragraph>
                  <Paragraph>Item Quality: <Tag color='blue' style={{ marginLeft: '5px', marginRight: '5px' }}>{items.qualityValue}</Tag></Paragraph>
                </List.Item>
              </List.Item>
            )}
          />
          <Row>
            <Col>
              <Button disabled={prStatus !== 'approved' ? true : false} onClick={generateRFQ}>Create RFQ</Button>
            </Col>
          </Row>
        </TabPane>
        <TabPane tab="All RFQ" key="2">
          <div>
            {allRFQ ?
              <Table dataSource={allRFQ} columns={tbl_RFQ} /> : <Skeleton />
            }
          </div>
          <Modal
            title="Request for Quotation Detials"
            centered
            visible={showModal}
            width={1000}
            footer={
              <div
                style={{
                  textAlign: 'right'
                }}
              >
                <Button onClick={() => setShowModal(false)} style={{ marginRight: 8 }}>
                  Close
                            </Button>
              </div>
            }
          >
            {rfqDetails ?
              rfqDetails.map((item, key) => {
                return (
                  <div>
                    <p>{`Company Name: ${item.CompanyName}`}</p>
                    <p>{`Address: ${item.Address}`}</p>
                    <p>{`City: ${item.City}`}</p>
                    <p>{`State: ${item.State}`}</p>
                    <p>{`Postal Code: ${item.PostalCode}`}</p>
                    <p>{`Phone: ${item.Phone}`}</p>
                    <p>Requisition Id: {item.Requisition_Id}</p>
                    <p>{`Requisition Created: ${item.PR_Created}`}</p>
                    <p>{`Requisation Required: ${item.PR_RequiredDate}`}</p>
                    <p>{`Status: ${item.PR_Status}`}</p>



                  </div>
                )
              }) : <Skeleton active />
            }
            <div>
              {itemsList ?
                <Table dataSource={itemsList} columns={tbl_RFQDetails} /> : <Skeleton />
              }
            </div>
          </Modal>
        </TabPane>
      </Tabs>
    </div>
  )
}
export default RequestForQuatation