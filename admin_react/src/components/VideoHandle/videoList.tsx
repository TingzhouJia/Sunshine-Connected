import { Table, Tag, Button } from "antd"
import React, { useCallback } from "react"
import { Flexbox, RadiusBoard, Span } from "../../style"
import dayjs from "dayjs"
import { useHistory } from "react-router"
import { useDispatch } from "react-redux"
import { fetchVideo } from "../../redux"
import { Video } from "../../model"

export const VideoTable:React.FC<{source:Partial<Video>[],loading:boolean}> =({source,loading})=>{
    const router=useHistory()
    const dispatch=useDispatch()
    const handleClick=useCallback(
        (id:string)=>{
     
            dispatch(fetchVideo(id))
            router.push('/workshop/editVideo')
        }
        ,[]
    )
    const handleChange=(pagination: any, filters: any, sorter: any)=>{
        console.log(sorter)
    }
    const columns=[
        {
            title:'status',
            dataIndex:'stage',
            key:"stage",
            render:(val:string)=>{
                switch(val){
                    case 'need audit':
                        return <Tag  color="#f1c331">Waiting</Tag>
                    case 'in audit':
                        return <Tag color="#2db7f5">In Progress</Tag>
                    case 'successed':
                        return <Tag color="#87d068">Posted</Tag>
                    case 'failed':
                        return <Tag  color="#f50">Failed</Tag>
                }
            },
            
        },
        {
            title:'Type',
            dataIndex:'category',
            key:'category',
            render:(item:Partial<Video>)=>{
                return <Flexbox direction="column" just="center" align="space-between">
                   {
                        item.category?.map((item)=>{
                            return <Tag>{item}</Tag>
                            })
                   }
                </Flexbox>
            }
        },
        {
            title:"Title",
            dataIndex:'title'
        },
       {
            title:"Viewed By",
            dataIndex:'viewedCount',
            key:"viewedCount"
        },
        {
            title:'Date',
            dataIndex:'createdAt',
            render:(val: any)=>{
                return <span>{dayjs(val).format('YYYY/MM/DD')}</span>
            },
          
            
        },
        {
            title:"Questions ",
            dataIndex:'questionCount',
            key:"questionCount"
        },
        {
            title:"Liked Count",
            dataIndex:'likeCount',
            key:"likeCount"
        },{
            title:"Action",
            dataIndex:'_id',
            render:(_id:string)=>{
                return <Button onClick={()=>handleClick(_id)}>Edit Video</Button>
            }
        }
    ]

    return <RadiusBoard w="78vw" h="74vh">

       <Flexbox direction="column" just="space-between" align="flex-start">
           <Flexbox direction="row" just="flex-start" align="center" h="10vh">
                <Span weight="700" size="1.4rem" color="black">Video Table</Span>
           </Flexbox>
            <Table loading={loading}  dataSource={source} columns={columns} style={{width:"100%",minHeight:"64vh"}}/>
       </Flexbox>
    </RadiusBoard>
}