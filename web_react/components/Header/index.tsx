import './header.less'
import Link from "next/link"
import { AudioOutlined, TranslationOutlined, UserOutlined } from '@ant-design/icons';
import {Input, Select, Avatar} from 'antd'
import { useTranslation } from '../../i18n';
const Search=Input.Search
const Option=Select.Option
export const Header: React.FC = () => {
  const {t,i18n}=useTranslation()
  const handleChangelang=(val: string)=>{
   if(i18n.language!==val){
    i18n.changeLanguage(val)
   }
  }
  return (
    <div className="header">
      <Link href="/"><img  src="../../public/main.png" alt="logo of sunshine connected" className="img" /></Link>
      <h1 className="title">Sunshine Connected</h1>
      <Search

      style={{width:"40vw"}}
      placeholder={t('header_input_placeholder')}
      enterButton="Search"
      size="large"
      suffix={suffix}
    />
    <div className="icons">
      <div>
        <TranslationOutlined />
        <Select defaultValue={i18n.language} style={{width:'10vw'}} onChange={handleChangelang}>
            <Option value="en">English</Option>
            <Option value="fr">Français</Option>
        </Select>
      </div>
      <div>
        <span>Font Size:</span>
        <Select defaultValue='large' style={{width:'10vw'}} onChange={handleChangelang}>
            <Option value="large">English</Option>
            <Option value="fr">Français</Option>
        </Select>
      </div>

    </div>
    <Avatar shape="square" size={64} icon={<UserOutlined />} />
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