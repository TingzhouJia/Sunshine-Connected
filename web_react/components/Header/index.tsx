import './header.less'
import Link from "next/link"
import { AudioOutlined, TranslationOutlined, UserOutlined, FontSizeOutlined, SearchOutlined, MenuOutlined } from '@ant-design/icons';
import { Input, Select, Avatar, Dropdown, Menu, Button, Tooltip, Drawer } from 'antd'
import { useTranslation } from '../../i18n';
import styled from 'styled-components';

import { Span } from '../../layout/app_layout';
import SideMenu from '../Sider';
import { useState } from 'react';
const Search = Input.Search
const Option = Select.Option
interface header {
  func: (val: any) => void,
  showSider: boolean
}




export const Header: React.FC<header> = ({ func, showSider }) => {
  const { t, i18n } = useTranslation()
  const handleChangelang = (val: string) => {
    if (i18n.language !== val) {
      i18n.changeLanguage(val)
    }
  }
  const H1 = styled.h1`
  font-weight:bolder;
  
  color:black;
  line-height:2rem;
  font-size:2rem;
`
  const [visible, setvisible] = useState(false)

  return (
    <div className="header">
      {showSider ? <></> : <Tooltip title={t('show side bar')}>
        <Button onClick={()=>setvisible(true)} shape="circle" icon={<MenuOutlined style={{fontSize:"1.3rem"}} />} />
      </Tooltip>}
      <Link href="/"><img src="/main.png" alt="logo of sunshine connected" className="img" /></Link>
      <H1  >Sunshine Connected</H1>
      <Drawer
          title="Basic Drawer"
          closeIcon={<MenuOutlined style={{fontSize:"1.3rem"}} />}
          placement='left'
          closable={true}
          onClose={()=>setvisible(false)}
          visible={visible}
          key='drawer'
        >
         <SideMenu/>
        </Drawer>
      <Search
        style={{ maxWidth: '30vw' }}
        placeholder={t('header_input_placeholder')}
        enterButton={<Tooltip title={t('search')}><SearchOutlined style={{ color: "black" }} /></Tooltip>}

        size="large"
        suffix={suffix}
      />
      <div className="icons">
        <div className="trans">
          <TranslationOutlined style={{ color: 'black', fontSize: "150%", paddingRight: "1vw" }} />
          <Select aria-label={t('pick_lang')} defaultValue={i18n.language} style={{ minWidth: "8vw" }} onChange={handleChangelang}>
            <Option value="en"><Span>English</Span></Option>
            <Option value="fr"><Span>Français</Span></Option>
          </Select>
        </div>
        <div className="trans">




          <FontSizeOutlined style={{ paddingRight: '0.5vw', paddingLeft: '1vw', color: 'black', fontSize: "150%" }} />
          <Select aria-label={t('pick_font')} defaultValue={'default'} style={{ minWidth: "8vw" }} onChange={(val: string) => func(val)}>
            <Option value="default"><span>Default Font</span></Option>
            <Option value="median"><span style={{ fontSize: '120%' }}>Median</span></Option>
            <Option value="large"><span style={{ fontSize: "150%" }}>Large</span></Option>
            <Option value="xlarge"><span style={{ fontSize: "170%" }}>XLarge</span></Option>
            <Option value="grand"><span style={{ fontSize: "200%" }}>Grand</span></Option>
          </Select>


        </div>

      </div>
      <Avatar shape="circle" size={54} icon={<UserOutlined />} />
    </div>
  )
}


const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#F1C331',
    }}
  />
);

export default Header