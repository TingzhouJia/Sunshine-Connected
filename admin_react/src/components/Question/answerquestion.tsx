import { Flexbox,Span } from "../../style"
import React from "react"
import { Avatar } from "antd"

export const AnswerHeader=()=>{

    return <Flexbox h="15vh" direction="row" just="space-between" align="flex-start">
            <Flexbox w="55vw" direction="column" just="flex-start" align="space-between">
                <div><span style={{marginRight:'5px'}}>Video:</span><Span w="40vw">longg content</Span></div>
                <div><span style={{marginRight:'5px'}}>Question:</span><Span w="40vw">longg content</Span></div>
            </Flexbox>
            <Avatar size={80}/>
    </Flexbox>
}