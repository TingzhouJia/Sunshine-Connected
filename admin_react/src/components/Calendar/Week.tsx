import styled from 'styled-components'
import React, { useState } from 'react'
import dayjs from 'dayjs'

import { Select } from 'antd'
const {Option}=Select
const WeekdayView = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:flex-start;
    align-items:flex-start;
    width:100%;
    height:100%;
`
const HeaderView = styled.div`
    display:flex;
    height:10%;
    width:100%;
    padding-left:7%;
    padding-right:3%;
   
    flex-direction:row;
    justify-content:space-between;
    align-items:center;

`

const SideView = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:stretch;
    min-height:100%;
    width:7%;
    padding-right:1vw;
`

const ContentView = styled.div`
    width:100%;
    display:flex;
    flex-direction:row;
    align-items:flex-start;

`
const TimeGrid = styled.div<{ height: number }>`
    width:100%;
    height:${props => props.height};
    display:flex;
    flex-direction:column;

    justify-content:center;
    align-items:flex-end;
`

const HeaderGrid = styled.div<{ width: number }>`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    height:100%;
    width:${props => props.width||100}%;
`
const GridItem=styled.div<{top:boolean}>`
    width:100%;
    height:50%;
    ${props=>props.top?'border-top':'border-bottom'}:1px soild #DDD;
    border-left:1px solid #ddd;
    border-right:1px solid #ddd;
`
const GridGroup=styled.div<{width:number,istoday:boolean}>`
    width:${props=>props.width||100}%;
    height:100%;
    display:flex;
    background-color:${props=>props.istoday?'rgba(241,195,49,0.3)':'white'};
    flex-direction:column;
    position:relative;
`
const EventContainer=styled.div`
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
`
export const WeekCalendar = () => {
    const [type, setType] = useState('weekday')//default week day
    const [time, setTime] = useState(0)//default sparse
    const now=dayjs()

    const renderTimeSlot = () => {
        let cols = []
        for (let i = 0; i < 24; i += 2) {

            cols.push(<TimeGrid height={100 / 12}>{i}:00</TimeGrid>)

        }
        return cols.map((each) => (each))
    }

    const renderHeaderSlot = (date: dayjs.Dayjs) => {
        let cols = []
        const start = type === 'weekday' ? date.startOf('w').add(1, 'd') : date.startOf('w')
        for (let i = 0; i < (type === 'weekday' ? 5 : 7); i++) {

            cols.push(<HeaderGrid width={(type === 'weekday' ? 90 / 5 : 90 / 7)}>{start.add(i, 'd').format('ddd D')}</HeaderGrid>)

        }
        return cols.map((each)=>each)
    }

    const renderColumn=()=>{
        const cols=[]
        for (let i = (type === 'weekday' ? 1 : 0); i < (type === 'weekday' ? 6 : 7); i++) {

            cols.push(<GridGroup width={type === 'weekday' ? 90 / 5 : 90 / 7} istoday={now.day()===i}>
            <GridItem top={true} ></GridItem>
            <GridItem top={false}></GridItem>
            <EventContainer>

            </EventContainer>
        </GridGroup>)

        }
        return cols.map(each=>each);
    }
    return (
       <div>
            <Select defaultValue={type} style={{minWidth:"20%"}} onChange={val=>setType(val)}>
                <Option value="weekday">Weekday</Option>
                <Option value="week">Week</Option>
            </Select>
            <WeekdayView>
           
                <HeaderView>
                    {renderHeaderSlot(now)}
                </HeaderView>
           
            <ContentView>
                <SideView>
                    {renderTimeSlot()}
                </SideView>
                {
                renderColumn()
                }
            </ContentView>
        </WeekdayView>
   </div> 
    )   
}