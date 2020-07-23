
import React, { useState } from 'react'
import { Table, Button } from 'antd'
import { Flexbox, Span } from '../../style'
import { RedoOutlined } from '@ant-design/icons'


export const Questiontable:React.FC=()=>{
    const [selectedRowKeys,setSelected]=useState([])
    const hasSelected = selectedRowKeys.length > 0;
    const columns=[
        {
            title:'Sender',
            dataIndex:'author',
            key:'author',
            ellipsis:true,
            width:"20%"
        },{
            title:'content',
            dataIndex:'content',
            key:'content',
            ellipsis:true
        },{
            title:'Date',
            dataIndex:'date',
            key:'date',
            width:"25%"
        },{
            title:"Video Name",
            dataIndex:'title',
            key:"title",
            width:"25%"
        },
        {
            title:'Action',
            dataIndex:'_id',
            key:"_id",
            render:(val:any)=>{
               return <Button style={{background:"green"}}>Answer</Button>
            }
        }
    ]
    const onSelectChange=()=>{

    }
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
      };
    return <Flexbox direction="column" just="flex-start" align="space-between">
        <Flexbox direction="row" just="flex-start" align="center">
            <Button danger  style={{marginRight:"10px"}}><Span color="white">Delete</Span></Button>
            <Button style={{marginRight:"10px"}} icon={<RedoOutlined />}><Span color="black">Reload</Span></Button>

        </Flexbox>
        <Table rowSelection={rowSelection} columns={columns} dataSource={[]}>
        </Table>
    </Flexbox>
}