import { Table, Tag, Button } from "antd"
import React from "react"
import { Flexbox, RadiusBoard } from "../../style"
import dayjs from "dayjs"
import { useHistory } from "react-router"
import { useDispatch } from "react-redux"
import { fetchVideo } from "../../redux"

export const VideoTable:React.FC =()=>{
    const router=useHistory()
    const dispatch=useDispatch()
    const handleClick=(id:string)=>{
        dispatch(fetchVideo(id))
        router.push('/workshop/editVideo')
    }
    const columns=[
        {
            title:'status',
            dataIndex:'stage',
            key:"stage",
            render:(val:string)=>{
                switch(val){
                    case 'need audit':
                        return <Tag  color="yellow">Waiting</Tag>
                    case 'in audit':
                        return <Tag color="#2db7f5">In Progress</Tag>
                    case 'successed':
                        return <Tag color="#87d068">Posted</Tag>
                    case 'failed':
                        return <Tag  color="#f50">Failed</Tag>
                }
            }
        },
        {
            title:'Type',
            dataIndex:'category',
            key:'category',
            render:(category:any[])=>{
                return <Flexbox direction="column" just="center" align="space-between">
                   {
                        category.map((item)=>{
                            return <Tag>{item}</Tag>
                            })
                   }
                </Flexbox>
            }
        },
        {
            title:"Title",
            dataIndex:'title',
            key:'title',

        },{
            title:'Date',
            dateIndex:'date',
            render:(val:string)=>{
                return (dayjs(val,'YYYY/MM/DD'))
            },
            sorter:true
        },{
            title:"Viewed By",
            dataIndex:'viewedCount'
        },{
            title:"Liked Count",
            dataIndex:'likeCount'
        },{
            title:"Action",
            dataIndex:'_id',
            render:(_id:string)=>{
                return <Button onClick={()=>handleClick(_id)}>Edit Video</Button>
            }
        }
    ]

    return <RadiusBoard w="78vw" h="78vh">

       <Flexbox direction="column" just="center" align="space-between">
           <Flexbox direction="row" just="flex-start" align="center" h="10%">

           </Flexbox>
       <Table dataSource={[]} columns={columns} style={{width:"100%",height:"85%"}}/>
       </Flexbox>
    </RadiusBoard>
}