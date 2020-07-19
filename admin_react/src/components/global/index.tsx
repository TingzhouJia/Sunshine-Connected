import { Breadcrumb } from "antd"
import React from 'react'
import {useLocation,Link} from 'react-router-dom'
export const HeaderBread:React.FC=()=>{
    const location=useLocation()
    const breads=location.pathname.split('/')
    return (
        <Breadcrumb separator={<span className="title_font">/</span>}>
            {
                breads.map((item,index)=>(
                    <Breadcrumb.Item>
                    {
                        index!==breads.length-1?<Link to={`/${item}`}><a className="title_font">{item}</a></Link>:
                    <span className="title_font">{item}</span>
                    }
                    </Breadcrumb.Item>
                ))
            }
        </Breadcrumb>
    )
}