import './header.less'
import Link from "next/link"
import { AudioOutlined, TranslationOutlined, UserOutlined, FontSizeOutlined, SearchOutlined } from '@ant-design/icons';
import {Input, Select, Avatar, Dropdown, Menu, Button, Tooltip} from 'antd'
import { useTranslation } from '../../i18n';
import styled from 'styled-components';
import { fontSize } from '../../layout/app_layout';
import { Span } from '../../layout/app_layout';
const Search=Input.Search
const Option=Select.Option
interface header{
  func:(val:any)=>void
}




export const Header: React.FC<header> = ({func}) => {
  const {t,i18n}=useTranslation()
  const handleChangelang=(val: string)=>{
   if(i18n.language!==val){
    i18n.changeLanguage(val)
   }
  }
const H1=styled.h1`
  padding-top:2vh;
  color:black;
  font-size:${fontSize}%;
`


  return (
    <div className="header">
      <Link href="/"><img  src="/main.png" alt="logo of sunshine connected" className="img" /></Link>
      <H1 types="title" >Sunshine Connected</H1>
      <Search
      style={{maxWidth:'30vw'}} 
      placeholder={t('header_input_placeholder')}
     enterButton={<Tooltip title={t('search')}><SearchOutlined style={{color:"black"}}/></Tooltip>  }
     
      size="large"
      suffix={suffix}
    />
    <div className="icons">
      <div className="trans">
        <TranslationOutlined style={{color:'black',fontSize:"150%",paddingRight:"1vw"}} />
        <Select aria-label={t('pick_lang')} defaultValue={i18n.language} style={{minWidth:"8vw"}}  onChange={handleChangelang}>
            <Option value="en">English</Option>
            <Option value="fr">Français</Option>
        </Select>
      </div>
      <div className="trans">
        
        


        <FontSizeOutlined style={{paddingRight:'0.5vw',paddingLeft:'1vw',color:'black',fontSize:"150%"}}/>
        <Select aria-label={t('pick_font')} defaultValue={'default'} style={{minWidth:"8vw"}}  onChange={(val:string)=>func(val)}>
            <Option value="default"><span>Default Font</span></Option>
            <Option value="median"><span style={{fontSize:'120%'}}>Median</span></Option>
            <Option value="large"><span style={{fontSize:"150%"}}>Large</span></Option>
            <Option value="xlarge"><span style={{fontSize:"170%"}}>XLarge</span></Option>
            <Option value="grand"><span style={{fontSize:"200%"}}>Grand</span></Option>
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