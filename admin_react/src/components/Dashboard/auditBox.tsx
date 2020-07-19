import React from 'react'
import { Flexbox } from '../../style'
import { Space, Tag, Button, Table } from 'antd'


export const AuditBox = () => {
    const handleClick=(id:string)=>{

    }
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: "20%"
        }, {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            ellipsis: true,
            width: "20%"
        }, {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            render:(category:any)=>(
                <>{category.map((tag:string) => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'technology') {
                      color = 'volcano';
                    }else if(tag=="life"){
                        color='green'
                    }
                    return (
                      <Tag color={color} key={tag}>
                        {tag.toUpperCase()}
                      </Tag>
                    );
                  })}


                </>
            )
        }, {
            title: 'Deadline',
            dataIndex: 'deadline',
            key: 'deadline',
            width:"15%"
        },
        {
            title:'Action',
            dataIndex:'_id',
            render:(data:string)=>(
                <Button onClick={()=>handleClick(data)}>
                    Details
                </Button>
            )
        }
    ]
    return (
        <div className="audit_box">
            <Space direction="vertical">
                <Flexbox direction="column" just="space-between" align="flex-start">
                    <span className="nav_t_font">Audit</span>
                    <div>
                        <span>All Audit</span>
l
                    </div>
                </Flexbox>
                <Table columns={columns} dataSource={[]}></Table>
            </Space>

        </div>
    )
}