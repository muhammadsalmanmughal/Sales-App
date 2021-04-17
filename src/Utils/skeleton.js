import React from "react";
import {
Skeleton, Row, Col, Space
} from 'antd'

 const TableSkeleton = () => {
    return(
        <div>
              <Row gutter={[10, 10]}>
                <Col>
                    <Skeleton.Input style={{ width: 200 }} active={true} size='default' line />
                </Col>
                <Col>
                    <Skeleton.Input style={{ width: 200 }} active={true} size='default' />
                </Col>
                <Col>
                    <Skeleton.Input style={{ width: 200 }} active={true} size='default' line />
                </Col>
                <Col>
                    <Skeleton.Input style={{ width: 200 }} active={true} size='default' />
                </Col>
                <Col>
                    <Skeleton.Input style={{ width: 200 }} active={true} size='default' />
                </Col>
            </Row>

            <Row gutter={[10, 10]}>
                <Col>
                    <Skeleton.Input style={{ width: 200 }} active={true} size='default' line />
                </Col>
                <Col>
                    <Skeleton.Input style={{ width: 200 }} active={true} size='default' />
                </Col>
                <Col>
                    <Skeleton.Input style={{ width: 200 }} active={true} size='default' line />
                </Col>
                <Col>
                    <Skeleton.Input style={{ width: 200 }} active={true} size='default' />
                </Col>
                <Col>
                    <Skeleton.Input style={{ width: 200 }} active={true} size='default' />
                </Col>
            </Row>
           
            <Row gutter={[10, 10]}>
                <Col>
                    <Skeleton.Input style={{ width: 200 }} active={true} size='default' line />
                </Col>
                <Col>
                    <Skeleton.Input style={{ width: 200 }} active={true} size='default' />
                </Col>
                <Col>
                    <Skeleton.Input style={{ width: 200 }} active={true} size='default' line />
                </Col>
                <Col>
                    <Skeleton.Input style={{ width: 200 }} active={true} size='default' />
                </Col>
                <Col>
                    <Skeleton.Input style={{ width: 200 }} active={true} size='default' />
                </Col>
            </Row>

        </div>
    )
}
const ParaSkeleton = () => {
    return(
        <div>
            <Skeleton active />
        </div>
    )
}
export {
    TableSkeleton,
    ParaSkeleton
}