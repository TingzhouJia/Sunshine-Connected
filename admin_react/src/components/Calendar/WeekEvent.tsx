import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import React,{useState} from 'react'
import styled from 'styled-components'
import { Row, Col, Space, List } from 'antd'

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
const Target=styled.div<{background?:string,color?:string}>`
    border-radius:50%;
    padding:20%;
    background:${props=>props.background||'#F1C331'};
    color:${props=>props.color||"black"};
    font-weight:700;
`
export const WeekEvent = () => {
    dayjs.extend(relativeTime)
    const [now, setnow] = useState( dayjs())
    const [curWeek,setWeek]=useState(now)
    const [checkdate,setCheck]=useState(now)
    const cols=['U','M','T','W','R','F','S']

    const renderWeekDays=(date:dayjs.Dayjs)=>{
        const starts=date.startOf('w')
 
        return cols.map((item,index)=>{
            let cur=starts.add(index+1,"d").date()
            let istoday=now.date()===cur
            return <Col>
            {istoday?<Target>{cur}</Target>:<span>{cur}</span>}
            </Col>
        })
    }
    return (
        <WDiv>
            <Space direction="vertical">
            <span>{dayjs(now, 'MMM-YYYY')}</span>
            <WHeader>
            <div onClick={()=>setWeek(curWeek.subtract(7,'d'))}>!</div>
               <div style={{display:'flex',flex:2}}>
               <Row gutter={[16, 16]}>
                    {
                         cols.map(item=>{
                            return (<Col span={16/7}>{item}</Col>)
                        })
                    }
                </Row>
                <Row gutter={[16, 16]}>
                    {
                        renderWeekDays(curWeek)
                    }
                </Row>
               </div>
                <div onClick={()=>setWeek(curWeek.add(7,'d'))}>r</div>
            </WHeader>
            <span>{dayjs(now, 'dddd-D-MM')}</span>    
            <List itemLayout="vertical"
                renderItem={
                    item=>{
                        return (
                            <List.Item>
                            
                        </List.Item>
                        )
                    }
                }
            >

            </List>      
            </Space>
        </WDiv>
    )

}