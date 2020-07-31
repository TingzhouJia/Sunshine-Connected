import React, { useState } from "react"
import { RadiusBoard, Flexbox, Span } from "../../style"
import { Button, Space, Table, Tag } from "antd"
import { User, Video, Progress, Pagination, Audit } from "../../model"
import dayjs from "dayjs"
import { useDispatch } from "react-redux"
import { createAudit } from "../../redux/auditSlice"

export const AuditTable:React.FC<{source:Partial<Video>[],load:boolean,paginations:Partial<Pagination<Video>>}>=({source,paginations,load})=>{
    const dispatch=useDispatch()
    const columns=[
        {
            title:"Sender",
            dataIndex:'author',
            render:(data:any)=>data.username
        },
        {
            title:'Title',
            dataIndex:'title',
            key:'title'
        },
        {
            title:"Categories",
            dataIndex:'category',
            key:'category',
            render:(category:string[])=>(
                <Flexbox style={{flexWrap:"wrap"}} direction="row" just="flex-start" align="center">
                        {
                           category.map(each=>( <Tag>{each}</Tag>))
                        }
                </Flexbox>
            ),
            width:"40%"
        },
        {
            title:"Date",
              dataIndex:"updatedAt",
              render:(data:any)=>(dayjs(data).format('YYYY/MM/DD')),
              sorter:true
        },
        {
            title:"Status",
            dataIndex:"progress",
            render:(progress:Partial<Progress>)=>{
                return progress.status==="need audit"?<Tag color="#f50">Need Audit</Tag>:<Tag color="#f1c331">In Audit</Tag>
            }
        },
        {
            title:"Check it",
            dataIndex:'_id',
            render:(data:string)=>{
               return (<Button onClick={()=>StartAudit(data)} color="#52c41a">Audit</Button>)
            }
        }
    ]
    const [pagi, setPagi] = useState(paginations)
    const StartAudit=(id:string)=>{
        const turn=source.findIndex((item,index)=>item.id===id)
        const doc:Partial<Audit>={
            
        }
        dispatch(createAudit(doc,turn))
    }
    const SortByMineAudit=()=>{

    }
    const SortByNeed=()=>{

    }
    const SortDate=(pagination: any, filters: any, sorter: any)=>{

    }
    return <RadiusBoard w="77vw" h="87vh">
        <Flexbox direction="column" just="center" align="space-between">
            <Flexbox h="19vh" direction="row" just="space-between" align="center">
                <Span size="1.5rem" weight="800" color="black">Audit table</Span>
                <Space direction="horizontal">
                <Button onClick={SortByMineAudit}>Check My Audit</Button>
                <Button onClick={SortByNeed}>Check Video Need Audit</Button>
                </Space>
            </Flexbox>
            <Table loading={load} columns={columns} dataSource={source} onChange={SortDate}>

            </Table>
        </Flexbox>
    </RadiusBoard>
}