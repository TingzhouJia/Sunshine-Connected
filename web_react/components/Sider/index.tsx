import { Menu } from "antd"


export const SideMenu=()=>{
    return (
        <>
       
        <Menu mode="inline" theme={'light'}>
            <Menu.ItemGroup  key="buddy_system" title={<span>Buddy System</span>}>
                <Menu.Item key="poll">
                    <span>Volunteer Poll</span>
                </Menu.Item>
                <Menu.Item key="progress">
                    <span>Meeting Progress</span>
                </Menu.Item>
            </Menu.ItemGroup>
        </Menu>
        </>
    )
}
export default SideMenu