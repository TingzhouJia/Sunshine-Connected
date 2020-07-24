import React, { useState } from 'react'
import { Menu, Tooltip } from 'antd'
import { Link,useLocation } from 'react-router-dom'
import './sider.less'
import { UserBar } from './userBar'
import {Span} from '../../style'
import { TeamOutlined, EyeOutlined, ApiOutlined, UserSwitchOutlined, CommentOutlined, BellOutlined, AppstoreOutlined, CalendarOutlined, CarryOutOutlined, ContactsOutlined, PlaySquareOutlined, DesktopOutlined, VideoCameraAddOutlined } from '@ant-design/icons'
export const SideMenu: React.FC = () => {
    const menuItems=['buddy_sys','audit_sys','video_sys']
    const [curOpen, setcurOpen] = useState<string[]>([])
    const path=useLocation()
    const changeMenu=(val:any)=>{
  
       const latestOpenKey = val.find((key: string) => curOpen.indexOf(key) === -1);
    if (menuItems.indexOf(latestOpenKey) === -1) {
      setcurOpen(val)
    } else {
      setcurOpen( latestOpenKey ? [latestOpenKey] : [])
    }
        
    }
    return (

        <div>
            <Menu selectedKeys={[path.pathname]} defaultSelectedKeys={['/']} style={{ marginTop: "10vh",height:"80vh",overflow:"auto"}} mode="inline" openKeys={curOpen} onOpenChange={(val)=>changeMenu(val)}>
                <Menu.Item key="/" icon={<AppstoreOutlined />}>
                   <Link to="/">DashBoard</Link>
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
                <Menu.SubMenu key="buddy_sys" title="Buddy System">
                    <Menu.Item key="/buddy/matchingPoll" icon={<UserSwitchOutlined />}>
                        <Tooltip placement="topRight" title="Match Poll">
                        <Link to='/buddy/matchingPoll'>Matching Poll</Link>
                        </Tooltip>
                    </Menu.Item>
                    <Menu.Item key="/buddy/resources" icon={<ContactsOutlined />}>
                        <Tooltip placement="topRight" title="Your Resources">
                        <Link to='/buddy/resources'>Your Resources</Link>
                        </Tooltip>
                    </Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu key="video_sys" title="Workshop Video System">
                    <Menu.Item key="/workshop/poll" icon={<DesktopOutlined />}>
                       <Tooltip placement="topRight" title="Workshop Poll">
                       <Link to='/workshop/poll'>Workshop Poll</Link>
                       </Tooltip>
                    </Menu.Item>
                    <Menu.Item key="/workshop/publishVideo" icon={<VideoCameraAddOutlined />}>
                       <Tooltip placement="topRight" title="Publish Video">
                       <Link to='/workshop/publishVideo'>Publish VIdeo</Link>
                       </Tooltip>
                    </Menu.Item>
                    <Menu.Item key="/workshop/video" icon={<PlaySquareOutlined />}>
                        <Tooltip title="Your Video">
                        <Link to='/workshop/video'>Your Videos</Link>
                        </Tooltip>
                    </Menu.Item>
                    <Menu.Item key="/workshop/questions" icon={<CommentOutlined />}>
                        <Tooltip placement="topRight" title="Recent Questions">
                        <Link to='/workshop/questions'>Recent Questions</Link>
                        </Tooltip>
                    </Menu.Item>
                    <Menu.Item key="/workshop/answers" icon={<CommentOutlined />}>
                        <Tooltip placement="topRight" title="My Answers">
                        <Link to='/workshop/answers'>My Answers</Link>
                        </Tooltip>
                    </Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu key="audit_sys" title="Audit System">
                    <Menu.Item key="/audit/matching" icon={<ApiOutlined />}>
                        <Tooltip placement="topRight" title="Matching Volunteer">
                        <Link to='/audit/matching'>Matching Volunteer</Link>
                        </Tooltip>
                    </Menu.Item>
                    <Menu.Item key="/audit/video" icon={<EyeOutlined />}>
                        <Tooltip placement="topRight" title="Video Audit">
                        <Link to='/audit/video'>Video Audit</Link>
                        </Tooltip>
                    </Menu.Item>
                    <Menu.Item key="/BuddySystem/volunteer" icon={<TeamOutlined />}>
                        <Tooltip placement="topRight" title="Volunteer Management">
                        <Link to='/audit/volunteer'>Volunteer Management</Link>
                        </Tooltip>
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