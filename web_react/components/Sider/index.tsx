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
            <Menu mode="inline" theme={'light'} defaultSelectedKeys={[`${router.pathname}`]} selectedKeys={[`${router.route}`]}>
                <Menu.ItemGroup key="buddy_system" title={<NavTitle aria-label={t('buddy_system')}>{t('buddy_system')}</NavTitle>}>
                    <Menu.Item key="poll">
                        <Link  aria-label={t('go_poll')} href="/poll" passHref><Span ><TeamOutlined /><a>{t('volunteer_poll')}</a></Span></Link>
                    </Menu.Item>
                    <Menu.Item key="/poll/progress">
                        <Link aria-label={t('go_progress')} href="/poll/progress" passHref><Span  ><SyncOutlined /><a>{t('meeting_progress')}</a></Span></Link>
                    </Menu.Item>
                    <Menu.Item key="/poll/candidates">
                        <Link aria-label={t('go_candidates')} href="/poll/candidates" passHref><Span><UserSwitchOutlined /><a >{t('candidates')}</a></Span></Link>
                    </Menu.Item>
                    <Menu.Item key="/poll/meeting">
                        <Link aria-label={t('go_meeting')} href="/poll/meeting" passHref><Span><UserSwitchOutlined /><a >{t('meeting')}</a></Span></Link>
                    </Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup key="video_system" title={<NavTitle aria-label={t('video_system')}>{t('video_system')}</NavTitle>}>
                    <Menu.Item key="video">
                        <Link aria-label={t('go_video')} href="/video" passHref><Span><PlaySquareOutlined /><a >{t('populate_video')}</a></Span></Link>
                    </Menu.Item>
                    <Menu.Item key="/video/questions">
                        <Link aria-label={t('go_question')} href="/video/questions" passHref><Span><HeartOutlined /><a >{t('question_video')}</a></Span></Link>
                    </Menu.Item>
                    <Menu.Item key="myHistory">
                        <Link aria-label={t('go_history')} href="/video/myHistory" passHref><Span><HeartOutlined /><a>{t('video_history')}</a></Span></Link>
                    </Menu.Item>
                </Menu.ItemGroup>
            </Menu>
        </>
    )
}
export default SideMenu