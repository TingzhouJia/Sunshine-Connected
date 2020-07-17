import styled from "styled-components"
import { EllipsisOutlined } from "@ant-design/icons"
import { Tooltip, Avatar, Space, Button } from "antd"
import { useTranslation } from "../../i18n"
import { Span } from "../../layout"
import { useRouter } from "next/router"

const CardDiv=styled.div`
    display:flex;
    width:20vw;
    min-height:40vh;
    border-radius:5%;
    -webkit-border-radius:5%;
    -moz-border-radius:5%;
    background-color:white;
    flex-direction:column;
    flex-wrap:wrap;
    padding:1vw !important;
    align-items:center;
    justify-content:space-between;
    margin:2vw;
    box-shadow: 2px 2px 15px #AAAAAA;
    @media (max-width:875px) {
        width:35vw;
    }


`
const EndFlex=styled.div`
    display:flex;
    padding-bottom:3vh;
    width:100%;
    flex-direction:row;
    justify-content: flex-end;
    align-items:center
`

export const VolunteerCard:React.FC=()=>{
    const {t}=useTranslation()
    const router=useRouter()
    const handleClick=(e)=>{
        e.preventDefault()
        router.push('/candidates/abc')
    }
    return (
        <CardDiv>
            <div style={{width:"100%",display:"flex",alignItems:"center",flexDirection:"column"}}>
            <EndFlex><Tooltip aria-label={t('candid_more')} title={t('candid_more')}><EllipsisOutlined style={{fontSize:"200%",fontWeight:"bold"}} /></Tooltip></EndFlex>
            <Space direction="vertical" size={10}>
            <Avatar size={64}/>
            <Span weight={700} >Username</Span>
            <Span weight={500} types="subSpan" colors="grey">email</Span>
            </Space>
            </div>
            <Button style={{width:"80%",}} onClick={handleClick} aria-label={t('pairing')} type="primary"><Span >{t('pair_btn')}</Span></Button>
        </CardDiv>
    )
}


