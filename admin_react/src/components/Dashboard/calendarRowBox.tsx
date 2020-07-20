import React from 'react'
import styled from 'styled-components'
import { Flexbox } from '../../style'
import { WeekCalendar } from '../Calendar/Week'


const Wrapper=styled.div`
    width:95%;
    height:45vh;
    padding:1vw;
    border-radius:5px;
    overflow:auto;
   
    display:flex;
    flex-direction:column;
    justify-content:flex-start;
    background:white;
`

export const CalendarRowBox=()=>{
    return (
        <Wrapper>
            <Flexbox direction="row" just="space-between" align="center">
                <span>Calendar</span>
            </Flexbox>
            <WeekCalendar/>
        </Wrapper>
    )
}