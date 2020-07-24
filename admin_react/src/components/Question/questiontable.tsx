
import React, { useState, useEffect } from 'react'
import { Table, Button, Skeleton, message, Tag } from 'antd'
import { Flexbox, Span } from '../../style'
import { RedoOutlined } from '@ant-design/icons'
import { RootState, fetchQuestionList, fetchQuestion } from '../../redux'
import { useSelector, useDispatch } from 'react-redux'

import { useHistory } from 'react-router'



export const QuestionTable: React.FC = () => {
    const [selectedRowKeys, setSelected] = useState([])
    const [paginations, setpagination] = useState<Pagination<Question>>({ limit: 10, page: 0, offset: 0, order: {} })
    const { questionList, loading } = useSelector((state: RootState) => state.question)
    const router=useHistory()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchQuestionList('', paginations))
    }, [dispatch, questionList])
    const hasSelected = selectedRowKeys.length > 0;
    const columns = [
        {
            title: 'Sender',
            dataIndex: 'author',
            key: 'author',
            ellipsis: true,
            width: "20%"
        }, {
            title: 'content',
            dataIndex: 'content',
            key: 'content',
            ellipsis: true
        },
        {
            title:"Condition",dataIndex:'answered',key:'answered',
            render:(val:boolean)=>(val?<Tag color="success">Answered</Tag>:<Tag color="red">Need Answer</Tag>),
            filter:[
                {text:"answered",value:"1"},
                {text:"not answered",value:"0"},
            ]
        },
         {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            width: "25%",
            sorter:true
        }, {
            title: "Video Name",
            dataIndex: 'title',
            key: "title",
            width: "25%"
        },
        {
            title: 'Action',
            dataIndex: '_id',
            key: "_id",
            render: (val: any) => {
                return <Button onClick={()=>handleAnswer(val)}  style={{ background: "green" }}>Answer</Button>
            }
        }
    ]

    const handleAnswer=(val:string)=>{
       if(questionList){
        dispatch(fetchQuestion(val))
        router.push('/answers/create')
       }
       else{
           message.error('error happening!')
       }
    }
    const onSelectChange = (selectedRowKeys: any) => {
        console.log(selectedRowKeys)
    }
    const onTablechange= (pagination:any,filter: any,orter: any) => {
        console.log(pagination)
       // dispatch(fetchQuestionList('', pagination))

    }
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    return <Flexbox direction="column" just="flex-start" align="space-between">
      
        <Skeleton loading={loading} active paragraph={{rows:7}}>
        <Flexbox direction="row" just="flex-start" align="center">
            <Button disabled={!hasSelected} danger style={{ marginRight: "10px" }}><Span color="white">Delete</Span></Button>
            <Button style={{ marginRight: "10px" }} icon={<RedoOutlined />}><Span color="black">Reload</Span></Button>

        </Flexbox>
        <Table rowSelection={rowSelection} onChange={onTablechange} columns={columns} dataSource={questionList}>
        </Table>
        </Skeleton>
     
    </Flexbox>
}