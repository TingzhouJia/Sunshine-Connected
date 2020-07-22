import { RadiusBoard, Flexbox, Span } from "../../style"
import React from "react"
import {Link} from 'react-router-dom'
import { Button } from "antd"


export const Inprogress=()=>{
    return <RadiusBoard w="73vw" h="71vh">
            <Flexbox direction="row" just="space-between" align="flex-start">
                <RadiusBoard w="50%" h="100%">
                    <img src="../../../public/progress.jpg" alt="progress image" width="100%" style={{objectFit:"fill"}}></img>
                </RadiusBoard>
                <Flexbox direction="column" just="flex-start" align="flex-start" w="45%">
                    <Button ><Link to='/workshop/editVideo' replace><Span>Resbusmit</Span></Link></Button>
                </Flexbox>
            </Flexbox>
            
    </RadiusBoard>
}