import dayjs from 'dayjs'
import React from 'react'
import styled from 'styled-components'
import { Row, Col } from 'antd'
const WDiv = styled.div<{ width?: string, height?: string }>`
    width:${props => props.width || "100%"};
    height:${props => props.height || "100%"};
    display:flex;
    flex-direction:column;
    justify-content:flex-start;
    align-items:flex=start;
    
`
const WHeader = styled.div`
    width:100%;
    height:20%;
    display:flex;
    justify-content:space-between;
    align-items:center;

`
const WeekEvent = () => {
    const now = dayjs()
    const cols=['M','T','W','F','S','U']
    

    return (
        <WDiv>
            <span>{dayjs(now, 'MMM-YYYY')}</span>
            <WHeader>
               <div style={{width:"80%"}}>
               <Row gutter={[16, 16]}>
                    {
                         cols.map(item=>{
                            return (<Col span={16/7}>{item}</Col>)
                        })
                    }
                </Row>
               </div>
            </WHeader>
        </WDiv>
    )

}