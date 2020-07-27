import { RadiusBoard, Flexbox, Span } from "../../style"
import React from "react"
import { Link, useHistory } from 'react-router-dom'
import { Button, Result } from "antd"


export const Inprogress = () => {
    const router=useHistory()
    return <RadiusBoard w="73vw" h="71vh">

        <Result
            title="Your operation has been executed"
            subTitle="Our coordinator will evaluate your post as soon as possible, please be patient"
            extra={
                <Button onClick={()=>router.replace('/workshop/videos')}  type="primary" key="console">Go Back To Video Page</Button>
               
            }
        />


    </RadiusBoard>
}