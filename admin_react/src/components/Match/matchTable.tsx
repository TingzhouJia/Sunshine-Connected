import { Table, Button } from "antd"
import React from "react"
import { Span } from "../../style"
import dayjs from 'dayjs'
export const MatchTable=()=>{

    const column=[
        {
            title:"Name",
            dataIndex:"name",
            key:"name",
            render:(name:string)=><Span color="black">{name}</Span>,
            sorter:true
        },
        {
            title:'Age',
            dataIndex:'age',
            key:'age',
            sorter:true
        },
        {
            title:"Status",
            dataIndex:"status",
            key:"status",
            filters:[
                {text:"Matched",value:"matched"},
                {text:"Requested",value:"requested"}
            ],
            render:(status:boolean)=>status?<Span color="#1890ff">Matched</Span>:<Span color="#faad14">Meeting Request</Span>
        },
        {
            title:"Issue Date",
            dataIndex:"date",
            key:"date",
        render:(date:Date)=><Span color="black">{dayjs(date).format('YYYY/MM/DD')}</Span>
        },{
            title:"Meeting Times",
            dataIndex:"times",
            key:"date"
        },{
            title:"Action",
            dataIndex:"_id",
            key:"action",
            render:(_id:string)=><Button type="primary" color="black">Details</Button>
        }
    ]

    const handleSearch=(pagination:any,filters:any,sorter:any)=>{

    }
    return <Table columns={column} onChange={(pagination,filters,sorter)=>handleSearch(pagination,filters,sorter)} dataSource={[]} pagination={false}>


    </Table>
}