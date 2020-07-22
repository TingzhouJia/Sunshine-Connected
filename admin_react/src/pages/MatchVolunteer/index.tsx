import { Flexbox,Wrapper, Span } from "../../style"

import React from 'react'
import { HeaderBread, DataBoard } from "../../components/global"
import { Input } from "antd"
import { MatchTable } from "../../components/Match/matchTable"


export const MatchVolunteerPage:React.FC = () => {



    return <Wrapper>
        <HeaderBread/>

        <Flexbox direction="row" w="40vw" h="22vh" align="row" just="space-between">
            <DataBoard width="17vw" height="10vh" title="Total Elder" data="24"></DataBoard>
            <DataBoard width="17vw" height="10vh" title="Total Volunteer" data="24"></DataBoard>
        </Flexbox>
        <Flexbox direction="column" w="77vw" h="73vh" align="space-between" just="flex-start">
            <Flexbox direction="row" align="center" just="space-between">
                <Span weight="bold" size="1.4rem" >All Elder People</Span>
                <Input.Search style={{width:"30vw"}} placeholder="search senior people"/>
            </Flexbox>
            <MatchTable/>
        </Flexbox>
    </Wrapper>
}