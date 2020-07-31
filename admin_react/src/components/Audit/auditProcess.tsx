import React from "react"
import { Flexbox } from "../../style"
import { Checkbox, Button } from "antd"

export const AuditProcess = () => {
    const options=[
        {label:'This video contains no dirty words',value:'dirty'},
        {label:'This video is clear enough ',value:"clean"},
        {label:"This video contain no political issue",value:"political"}
    ]
    return <Flexbox w="77vw" h="78vh" direction="row" just="space-between" align="center">
        <Flexbox w="45vw" direction="column" just="flex-start" align="space-between">
            
        </Flexbox>
        <Flexbox w="27vw" direction="column" just="center" align="space-between">
            <Flexbox h="50vh" direction="column" just="center" align="space-between">
                <Checkbox.Group options={options}/>
                <Button block>Pass All</Button>
            </Flexbox>
            <Button block>Pass Audit</Button>
            <Button block danger>Fail Audit</Button>
        </Flexbox>
    </Flexbox>
}