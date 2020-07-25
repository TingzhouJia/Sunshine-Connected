import { Flexbox,Span } from "../../style"
import React from "react"
import { Avatar } from "antd"
import { Question, User } from "../../model"

export const AnswerHeader:React.FC<{header:Partial<Question>,author:Partial<User>}>=({author,header})=>{

    return <Flexbox h="15vh" direction="row" just="space-between" align="flex-start">
            <Flexbox w="55vw" direction="column" just="flex-start" align="space-between">
            <div><span style={{marginRight:'5px'}}>Video:</span><Span w="40vw">{header.course?.title}</Span></div>
                <div><span style={{marginRight:'5px'}}>Question:</span><Span w="40vw">{header.content}</Span></div>
            </Flexbox>
            <Avatar size={80} src={author.avatar}/>
    </Flexbox>
}