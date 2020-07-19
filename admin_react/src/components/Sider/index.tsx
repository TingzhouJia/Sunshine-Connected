import React from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import './sider.less'
import { UserBar } from './userBar'
import { TeamOutlined, EyeOutlined, ApiOutlined, UserSwitchOutlined, CommentOutlined, BellOutlined, AppstoreOutlined, CalendarOutlined, CarryOutOutlined, ContactsOutlined, PlaySquareOutlined, DesktopOutlined } from '@ant-design/icons'
export const SideMenu: React.FC = () => {
    return (

        <div>
            <Menu style={{ marginTop: "10vh" }} mode="inline">
                <Menu.Item key="/" icon={<AppstoreOutlined />}>
                    DashBoard
                </Menu.Item>
                <Menu.Item key="/calendar" icon={<CalendarOutlined />}>
                    <Link to='/calendar'>My Calendar</Link>
                </Menu.Item>
                <Menu.Item key="/notification" icon={<BellOutlined />}>
                    <Link to="/notification">Notifications</Link>
                </Menu.Item>
                <Menu.Item key="/events" icon={<CarryOutOutlined />}>
                    <Link to="/events">Events</Link>
                </Menu.Item>
                <Menu.SubMenu title="Buddy System">
                    <Menu.Item key="/buddy/matchingPoll" icon={<UserSwitchOutlined />}>
                        <Link to='/buddy/matchingPoll'>Matching Poll</Link>
                    </Menu.Item>
                    <Menu.Item key="/buddy/resources" icon={<ContactsOutlined />}>
                        <Link to='/buddy/resources'>Your Resources</Link>
                    </Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu title="Workshop Video System">
                    <Menu.Item key="/workshop/poll" icon={<DesktopOutlined />}>
                        <Link to='/workshop/poll'>Workshop Poll</Link>
                    </Menu.Item>
                    <Menu.Item key="/workshop/video" icon={<PlaySquareOutlined />}>
                        <Link to='/workshop/video'>Your Videos</Link>
                    </Menu.Item>
                    <Menu.Item key="/workshop/questions" icon={<CommentOutlined />}>
                        <Link to='/BuddySystem/questions'>Recent Questions</Link>
                    </Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu title="Audit System">
                    <Menu.Item key="/audit/matching" icon={<ApiOutlined />}>
                        <Link to='/audit/matching'>Matching Volunteer</Link>
                    </Menu.Item>
                    <Menu.Item key="/audit/video" icon={<EyeOutlined />}>
                        <Link to='/audit/video'>Video Audit</Link>
                    </Menu.Item>
                    <Menu.Item key="/BuddySystem/volunteer" icon={<TeamOutlined />}>
                        <Link to='/audit/volunteer'>Volunteer Management</Link>
                    </Menu.Item>
                </Menu.SubMenu>
            </Menu>
            <div className="user_section">
                <UserBar />
            </div>
        </div>
    )
}
export default SideMenu