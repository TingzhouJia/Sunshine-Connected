import { Menu } from "antd"
import { NavTitle, Span } from "../../layout/app_layout"
import { PlaySquareOutlined, HeartOutlined, TeamOutlined, ProjectOutlined, UserSwitchOutlined, SyncOutlined } from "@ant-design/icons"
import Link from "next/link"
import { useRouter } from "next/router"
import { useTranslation } from "../../i18n"


export const SideMenu = () => {
    const router = useRouter()
    const { t } = useTranslation()
    return (
        <>

            <Menu mode="inline" theme={'light'} defaultSelectedKeys={[`${router.pathname}`]}>
    <Menu.ItemGroup key="buddy_system" title={<NavTitle types="title">{t('buddy_system')}</NavTitle>}>
                    <Menu.Item key="/poll">
                        <Link href="/poll" passHref><Span><TeamOutlined />{t('volunteer_poll')}</Span></Link>
                    </Menu.Item>
                    <Menu.Item key="/progress">
                        <Link href="/meetingProgress" passHref><Span ><SyncOutlined /><a>{t('meeting_progress')}</a></Span></Link>
                    </Menu.Item>
                    <Menu.Item key="/candidates">
                        <Link href="/candidates" passHref><Span><UserSwitchOutlined /><a >{t('candidates')}</a></Span></Link>
                    </Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup key="buddy_system" title={<NavTitle>{t('video_system')}</NavTitle>}>
                    <Menu.Item key="/popular_video">
                        <Link href="/popular_video" passHref><Span><PlaySquareOutlined /><a >{t('populate_video')}</a></Span></Link>
                    </Menu.Item>
                    <Menu.Item key="/my_video">
                        <Span><HeartOutlined />{t('fav_video')}</Span>
                    </Menu.Item>
                    <Menu.Item key="/my_history">
                        <Span><HeartOutlined />{t('video_history')}</Span>
                    </Menu.Item>
                </Menu.ItemGroup>
            </Menu>
        </>
    )
}
export default SideMenu