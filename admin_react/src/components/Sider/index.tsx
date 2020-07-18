import React from 'react'
import { Menu } from 'antd'
import {Link} from 'react-router-dom'

export const Sider:React.FC=()=>{
    return (

        <div>
            <Menu style={{marginTop:"10vh"}} mode="inline">
                <Menu.Item key="/">
                    DashBoard
                </Menu.Item>
                <Menu.Item key="/calendar">
                        <Link to='/calendar'>My Calendar</Link>
                    </Menu.Item>
                <Menu.SubMenu title="Buddy System">
                    <Menu.Item key="/buddy/matchingPoll">
                        <Link to='/buddy/matchingPoll'>Matching Poll</Link>
                    </Menu.Item>
                    <Menu.Item key="/buddy/resources">
                        <Link to='/buddy/resources'>Your Resources</Link>
                    </Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu title="Workshop Video System">
                    <Menu.Item key="/workshop/poll">
                        <Link to='/workshop/poll'>Workshop Poll</Link>
                    </Menu.Item>
                    <Menu.Item key="/workshop/video">
                        <Link to='/workshop/video'>Your Videos</Link>
                    </Menu.Item>
                    <Menu.Item key="/workshop/questions">
                        <Link to='/BuddySystem/questions'>Recent Questions</Link>
                    </Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu title="Audit System">
                    <Menu.Item key="/audit/matching">
                        <Link to='/audit/matching'>Matching Volunteer</Link>
                    </Menu.Item>
                    <Menu.Item key="/buddySystem/matchingPoll">
                        <Link to='/buddySystem/matchingPoll'>Video Audit</Link>
                    </Menu.Item>
                    <Menu.Item key="/BuddySystem/resources">
                        <Link to='/BuddySystem/resources'>Volunteer Management</Link>
                    </Menu.Item>
                </Menu.SubMenu>
            </Menu>
        </div>
    )
}