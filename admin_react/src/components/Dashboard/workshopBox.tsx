import React from 'react'
import { Flexbox,Span } from '../../style'
import { PlusSquareOutlined, CaretRightOutlined } from '@ant-design/icons'
import { Space, Collapse, Skeleton } from 'antd'
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

            <Flexbox direction="column" just="flex-start" align="center">
               
                    <Flexbox direction="row" just="space-between" align="center" h="10%">
                        <Span weight="bold" size="1.2rem">Workshop Poll</Span>
                        <PlusSquareOutlined  style={{fontSize:"1.2rem",color:"#F1C331"}}/>
                    </Flexbox>
                   <Skeleton paragraph={{rows:6}} loading={false} active>
                   <Collapse
                        style={{width:"100%",marginBottom:"2vh",marginTop:"1vw"}}
                        bordered={false}
                        defaultActiveKey={['1']}
                        expandIconPosition="right"
                        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                       
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
                   </Skeleton>
              

            </Flexbox >
           
        </div>
    )
}