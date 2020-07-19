import React from 'react'
import { Flexbox } from '../../style'
import { Space, List, Avatar, Button, Skeleton } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
export const MatchBox = () => {
    const hisoty = useHistory()
    return (
        <div className="match_box">
            <Flexbox direction="column" just="flex-start" align="center">
                <Space direction="vertical" size="middle">
                    <Flexbox direction="row" just="space-between" align="center">
                        <span>Match Poll</span>
                        <ArrowRightOutlined style={{ fontSize: "1.4rem" }} />
                    </Flexbox>
                    <List itemLayout="vertical"

                        dataSource={[{ title: 'a' }]}
                        renderItem={item => (
                            <List.Item >

                                {
                                    true ? <Flexbox direction="row" just="space-between" align="center">
                                        <Space direction="horizontal">
                                            <Avatar />
                                            <span >name</span>

                                        </Space>
                                        <Button onClick={() => hisoty.push(`/buddy/senior/${item.title}`)} type="primary" style={{ color: "black" }}>details</Button>
                                    </Flexbox> :

                                        <Flexbox direction="row" just="space-between" align="center">
                                            <Space direction="horizontal">
                                                <Skeleton.Avatar active />
                                                <Skeleton.Input active />
                                            </Space>
                                            <Skeleton.Button active />
                                        </Flexbox>

                                }

                            </List.Item>
                        )}
                    >

                    </List>
                </Space>
            </Flexbox>
        </div>
    )
}