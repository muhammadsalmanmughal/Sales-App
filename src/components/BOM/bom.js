import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { VendorCustomerContext } from '../../context/Random/random'
import { Divider, Row, Col, Tooltip, Input, Select, Button, message, Tabs, Space, Table, Modal } from 'antd'
import { CreateBom, GetAllBom, getDataById } from '../../Utils/utils'
import {
  Title, H3, Goback,
  ListItem,
  ItemDiv,
  QuantityAndButtonDiv,
  Quantity,
  DeleteButton
} from '../../Utils/styles'
import { FaRegClipboard } from 'react-icons/fa'
import { CaretLeftOutlined } from '@ant-design/icons'

const BillOfMaterial = () => {
  const { allInventoryItems, bomItems } = useContext(VendorCustomerContext)
  const [productName, setProductName] = useState()
  const [BomType, setBomType] = useState()
  const [items, setItem] = useState('')
  const [requestedquantity, setQuantity] = useState()
  const [unitOfMeassure, setUnitOfMeassure] = useState('')
  const [itemsList, setItemsList] = useState([])
  const [availableBom, setAvailableBom] = useState()
  const [showModal, setShowModal] = useState(false)
  const [bomData, setBomData] = useState()

  const { TabPane } = Tabs
  const history = useHistory()
  const shortid = require('shortid')
  const Bom_Id = shortid.generate()
  const current_datetime = new Date()
  const utc = current_datetime.getDate() + '-' + (current_datetime.getMonth() + 1) + '-' + current_datetime.getFullYear()

  useEffect(() => {
    GetAllBom().then(data => {
      // setAvailableBom(data)
      // setBomItems(data)
    })
  }, [])

  console.log('bomItems',bomItems);
  const details = bomData?.flatMap(d => d.List)

  function selectItem (value) {
    setItem(value)
  }
  function selectBomType (value) {
    setBomType(value)
  }
  function selectUOM (value) {
    setUnitOfMeassure(value)
  }
  const CreateList = () => {
    if (!requestedquantity) return message.error('Error! Quantity is not in format')
    if (items == null || items == '') return message.error('Error! Items can not left Empty')
    if (!unitOfMeassure) return message.error('Error! Select Unit Of Meassure')
    if (isNaN(requestedquantity) || requestedquantity.length > 2 || requestedquantity <= 0) return message.error('Quantity amount not support')
    else {
      const quantity = Number(requestedquantity)
      setItemsList([...itemsList, { items, quantity, unitOfMeassure }])
      setItem('')
      setQuantity('')
      setUnitOfMeassure('')
    }
  }

  const deleteItem = (id) => {
    const newList = [...itemsList]
    newList.splice(id, 1)
    setItemsList(newList)
  }

  const Bom = () => {
    if (!productName) return message.error('Error! Product Name is not in Format')
    if (itemsList.length < 1) return message.error('Error! Enter BOM Items')
    if (!BomType) return message.error('Error! Select BOM Type')
    CreateBom(Bom_Id, productName, BomType, utc, itemsList)
    setItem('')
    setQuantity('')
    setUnitOfMeassure('')
    setItemsList([])
  }

  const getDetails = (id) => {
    getDataById('BillOfMaterial', id).then(data => {
      setBomData(data)
    })
    setShowModal(true)
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'BomId',
      key: 'id'
    },
    {
      title: 'Name',
      dataIndex: 'BomName',
      key: 'name'
    },
    {
      title: 'Type',
      dataIndex: 'BomType',
      key: 'type'
    },
    {
      title: 'Action',
      key: 'action',
      render: (bom) => (
        <Space size='middle'>
          <Button onClick={e => getDetails(bom.iD)}>Details
          </Button>
        </Space>
      )
    }
  ]

  const bomDetails = [
    {
      title: 'Items',
      dataIndex: 'items',
      key: 'itemName'
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity'
    },
    {
      title: 'UOM',
      dataIndex: 'unitOfMeassure',
      key: 'uom'
    }
  ]

  return (
    <div>
      <Goback onClick={e => history.goBack()}>
        <CaretLeftOutlined /> GoBack
      </Goback>
      <Title>
        Bill of Material :
      </Title>
      {/* <Divider /> */}
      <Tabs defaultActiveKey='1'>
        <TabPane tab='Create BOM' key='1'>
          <Row gutter={[10, 10]}>
            <Col>
              <div style={{ marginBottom: 16 }}>
                <Input
                  style={{ width: 180 }} addonAfter={
                    <Tooltip placement='topRight' title='Click to Copy'>
                      <CopyToClipboard text={Bom_Id}>
                        <FaRegClipboard
                          onClick={() => alert(Bom_Id)}
                          style={{ cursor: 'pointer' }}
                        />
                      </CopyToClipboard>
                    </Tooltip>
                                }
                  value={Bom_Id}
                  disabled
                />
              </div>
            </Col>
            <Col xs={24} sm={4}>
              <h4>Date: {utc}</h4>
            </Col>
          </Row>
          <Row gutter={[10, 10]}>
            <Col xs={24} sm={5}>
              <Input type='text' placeholder='Product Name' onChange={e => setProductName(e.target.value)} />
            </Col>
            <Col>
              <Select placeholder='Bom Type' style={{ width: 200 }} onChange={selectBomType}>
                <Select.Option value='finishgood'>Finish Good (FG)</Select.Option>
              </Select>
            </Col>
          </Row>
          <Row gutter={[10, 10]}>
            <Col>
              <Select
                style={{ width: 160 }}
                placeholder='Select items'
                value={items}
                onChange={selectItem}
              >
                {
                                    allInventoryItems && allInventoryItems.map(items => <Select.Option
                                      value={items.itemsName}
                                                                                        >
                                      {items.itemsName}
                                                                                        </Select.Option>

                                    )
                                }
              </Select>
            </Col>
            <Col xs={24} sm={6}>
              <Input type='text' value={requestedquantity} placeholder='Quantity' onChange={e => setQuantity(e.target.value)} />
            </Col>
            <Col xs={24} sm={6}>
              <Select value={unitOfMeassure} placeholder='Select Type' onChange={selectUOM} style={{ width: '100px' }}>
                <Select.Option value='Packet'>Packet</Select.Option>
                <Select.Option value='Dozen'>Dozen</Select.Option>
                <Select.Option value='Sheet'>Sheet</Select.Option>
              </Select>

            </Col>
          </Row>
          <Button onClick={CreateList}>
            Add
          </Button>
          <Divider>
            <H3>Recipe - Items</H3>
          </Divider>
          <ul>
            {
                            itemsList.map((item, key) => {
                              return (
                                <>
                                  <ListItem key={key} xs={24} sm={12}>
                                    <ItemDiv>
                                      {item.items}
                                    </ItemDiv>
                                    <QuantityAndButtonDiv>
                                      <Quantity>
                                        {item.quantity}/
                                        {item.unitOfMeassure}
                                      </Quantity>
                                      <DeleteButton>
                                        <Button danger onClick={() => deleteItem(key)}>Delete</Button>
                                      </DeleteButton>
                                    </QuantityAndButtonDiv>

                                  </ListItem>
                                </>
                              )
                            })
                        }
          </ul>
          <Button onClick={Bom}>
            Create BOM
          </Button>
        </TabPane>
        <TabPane tab='Available BOM' key='2'>
          <div>
            <Table dataSource={bomItems} columns={columns} />;
          </div>
          <Modal
            title='Purchase Order Details'
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
            <div>
              <Table dataSource={details} columns={bomDetails} />
            </div>
          </Modal>
        </TabPane>
      </Tabs>
    </div>
  )
}
export default BillOfMaterial
