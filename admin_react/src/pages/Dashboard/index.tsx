import React from 'react'
import styled from 'styled-components'
import { Flexbox } from '../../style'
import { CalendarRowBox } from '../../components/Dashboard/calendarRowBox'
import { WorkshopBox } from '../../components/Dashboard/workshopBox'
import { MatchBox } from '../../components/Dashboard/matchBox'
import { HeaderBread } from '../../components/global'

const Wrapper=styled.div`
    width:100%;
    height:100%;
    display:flex;
    flex-direction:column;
    padding-left:2vw;
    padding-bottom:1vw;
    justify-content: space-between;
    align-items:space-evenly;

`

export const DashBoard:React.FC=()=>{

    return (<Wrapper>
        <HeaderBread/>
        <Flexbox direction="row" just="space-between" align="center" w="57vw" h="40%">
            <WorkshopBox/>
            <MatchBox/>
        </Flexbox>
        <CalendarRowBox/>
    </Wrapper>)
}

export default DashBoard