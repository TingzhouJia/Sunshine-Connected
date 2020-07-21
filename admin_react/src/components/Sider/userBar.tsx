import React from 'react'
import { Space, Avatar, Dropdown, Menu, Divider } from 'antd'
import {QuestionCircleOutlined, PieChartOutlined, UserOutlined, PoweroffOutlined} from '@ant-design/icons'
import './sider.less'


export const UserBar:React.FC=()=>{
    const menu=(
        <Menu style={{width:"150px"}}>
            <Menu.Item >Coordinator</Menu.Item>
            <Divider style={{margin:"1vw"}}/>
            <Menu.Item icon={<UserOutlined />}>
                My Account
            </Menu.Item>
            <Menu.Item icon={<PieChartOutlined />}>
                My Statistics
            </Menu.Item>
            <Menu.Item icon={<QuestionCircleOutlined />}>
                Info Service
            </Menu.Item>
            <Menu.Item icon={<PoweroffOutlined />}>
                Quit
            </Menu.Item>
        </Menu>
    )
    return(
       <Dropdown overlay={menu} overlayStyle={{minWidth:"200px"}}>
            <div className="user_section_div" >
            <Space direction="horizontal">
                <Avatar shape="circle" size="large"/>
                <div className="names">
                    <span style={{fontWeight:500,color:"grey"}}>name</span>
                    <span style={{fontWeight:700,fontSize:"1.2rem",textOverflow:"ellipses"}}>Coordinator</span>
                </div>

            </Space>
        </div>
       </Dropdown>
    )
}