import styled from 'styled-components'
import React from 'react'
import { Space } from 'antd'
import { Flexbox } from '../../style'
import { ArrowRightOutlined } from '@ant-design/icons'
import { WeekEvent } from '../Calendar/WeekEvent'
const AbsoluteBox=styled.div`
    position:absolute;
    right:0;
    top:0;
    bottom:0;
    width:21vw;
    display:flex;
    flex-direction:column;
    padding:1vw;

`
export const CalendarBox=()=>{
    return <AbsoluteBox>
        <Space direction="vertical">
            <Flexbox direction="row" just="space-between" align="center">
                    <span>Calendar</span>
                    <ArrowRightOutlined />
            </Flexbox>
            <WeekEvent/>
        </Space>
    </AbsoluteBox>
}