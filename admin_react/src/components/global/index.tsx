import { Breadcrumb } from "antd"
import React from 'react'
import {useLocation,Link} from 'react-router-dom'
import { RadiusBoard, Flexbox, Span } from "../../style"
export const HeaderBread:React.FC=()=>{
    const location=useLocation()
    const breads=location.pathname.split('/')
    return (
        <Breadcrumb style={{marginLeft:'1vw'}} separator={<span className="title_font">/</span>}>
            {
                breads.length<=2?<Breadcrumb.Item><span className="title_font">Dashboard</span></Breadcrumb.Item>:(
                    breads.map((item,index)=>(
                        <Breadcrumb.Item>
                        {
                            index!==breads.length-1?<span aria-label={`go to ${item} page`} className="title_font">{item}</span>:
                        <span className="title_font">{item}</span>
                        }
                        </Breadcrumb.Item>
                    ))
                )
            }
        </Breadcrumb>
    )
}


export const DataBoard:React.FC<{width:string,height:string,title:string,data:string}>=({width,height,title,data})=>{
    return <RadiusBoard w={width} h={height}>
        <Flexbox direction="column" just="flex-start" align="space-between">
            <Span weight="600" size="1.2rem" color="black">{title}</Span>
            <Span weight="bold" size="1.5rem">{data}</Span>
        </Flexbox>
    </RadiusBoard>
}