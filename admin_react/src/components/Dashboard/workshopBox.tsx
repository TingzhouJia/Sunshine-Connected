import React from 'react'
import { Flexbox } from '../../style'
import { PlusSquareOutlined, CaretRightOutlined } from '@ant-design/icons'
import { Space, Collapse } from 'antd'
import './index.less'
const {Panel}=Collapse
export const WorkshopBox = () => {
    const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
    return (
        <div className="workshop_box">

            <Flexbox direction="column" just="center" align="flex-start">
                <Space direction="vertical">
                    <Flexbox direction="row" just="space-between" align="center">
                        <span className="nav_t_font">Workshop Poll</span>
                        <PlusSquareOutlined />
                    </Flexbox>
                    <Collapse
                        bordered={false}
                        defaultActiveKey={['1']}
                        expandIconPosition="right"
                        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                        className="site-collapse-custom-collapse"
                    >
                        <Panel header="This is panel header 1" key="1" className="site-collapse-custom-panel">
                            <p>{text}</p>
                        </Panel>
                        <Panel header="This is panel header 2" key="2" className="site-collapse-custom-panel">
                            <p>{text}</p>
                        </Panel>
                        <Panel header="This is panel header 3" key="3" className="site-collapse-custom-panel">
                            <p>{text}</p>
                        </Panel>
                    </Collapse>
                </Space>

            </Flexbox >
            <div className="button_go_detail">

            </div>
        </div>
    )
}