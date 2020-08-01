
import React, { useState, useEffect } from 'react'
import { Table, Button, Tag } from 'antd'
import { Flexbox, Span } from '../../style'
import { RedoOutlined } from '@ant-design/icons'
import { RootState, fetchQuestionList, fetchQuestion } from '../../redux'
import {  useDispatch } from 'react-redux'

import { useHistory } from 'react-router'
import { Pagination, Question, Video } from '../../model'
import dayjs from 'dayjs'



export const QuestionTable: React.FC<{sourcelist:Partial<Question>[],load:boolean,}> = ({load,sourcelist}) => {
    const [selectedRowKeys, setSelected] = useState([])
    const [paginations, setpagination] = useState<Partial<Pagination<Question>>>({ limit: 10, page: 0, offset: 0, order: {} })
    const dispatch=useDispatch()
    const router=useHistory()
  

    const hasSelected = selectedRowKeys.length > 0;
    const columns = [
        {
            title: 'Sender',
            dataIndex: 'author',
            key: 'author',
            ellipsis: true,
            render:(author: any)=>author.username,
            width: "15%"
        }, {
            title: 'content',
            dataIndex: 'content',
            key: 'content',
            ellipsis: true
        },
        {
            title:"Condition",dataIndex:'isAnswered',key:'answered',
            render:(val:boolean)=>(val?<Tag color="success">Answered</Tag>:<Tag color="red">Need Answer</Tag>),
            filters:[
                {text:"answered",value:"1"},
                {text:"not answered",value:"0"},
            ]
        },
         {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'date',
            render:(val:any)=>dayjs(val).format('YYYY/MM/DD'),
            sorter:(a:any,b:any)=>dayjs(a).isBefore(dayjs(b))?-1:1
        }, {
            title: "Video Name",
            dataIndex: 'course',
            key: "title",
            width: "20%",
            render:(val:any)=>val.title
        },
        {
            title: 'Action',
            dataIndex: '_id',
            key: "_id",
            render: (val: any) => {
                return <Button onClick={()=>handleAnswer(val)}   >Answer</Button>
            }
        }
    ]

    const handleAnswer=(val:string)=>{
     
        dispatch(fetchQuestion(val))
        router.push('/workshop/answers/create')
      
    }
    const onSelectChange = (selectedRowKeys: any) => {
        console.log(selectedRowKeys)
        setSelected(selectedRowKeys)
    }
    const onTablechange= (pagination:any,filter: any,orter: any) => {
        console.log(filter)
       // dispatch(fetchQuestionList('', pagination))

    }
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    return <Flexbox direction="column" just="flex-start" align="space-between">
      
      
        <Flexbox direction="row" just="flex-start" align="center" h="15%">
            <Button disabled={!hasSelected} danger style={{ marginRight: "10px" }}>Delete</Button>
            <Button style={{ marginRight: "10px" }} icon={<RedoOutlined />}>Reload</Button>
        </Flexbox>
        <Table loading={load} rowSelection={rowSelection} rowKey="_id" pagination={{defaultCurrent:1,total:sourcelist.length,defaultPageSize:10}} onChange={onTablechange} columns={columns} dataSource={sourcelist}>
        </Table>
       
     
    </Flexbox>
}