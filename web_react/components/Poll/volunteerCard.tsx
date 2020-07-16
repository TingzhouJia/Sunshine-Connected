import styled from "styled-components"
import { EllipsisOutlined } from "@ant-design/icons"
import { Tooltip, Avatar, Space } from "antd"
import { useTranslation } from "../../i18n"
import { Span } from "../../layout"

const CardDiv=styled.div`
    display:flex;
    min-width:20vw;
    min-height:30vh;
    border-radius:5px;
    -webkit-border-radius:5px;
    -moz-border-radius:5px;
    display:flex;
    flex-direction:column;
    padding:1vw,2vh;
    align-items:center;
    justify-content:space-between



`
const EndFlex=styled.div`
    display:flex;
    flex-direction:row;
    justify-content:flex-end;
    align-items:center
`

export const VolunteerCard:React.FC=()=>{
    const {t}=useTranslation()
    return (
        <CardDiv>
            <EndFlex><Tooltip aria-label={t('candid_more')} title={t('candid_more')}><EllipsisOutlined /></Tooltip></EndFlex>
            <Space direction="vertical" size={10}>
            <Avatar/>
            <Span weight={700}   >Username</Span>
            <Span weight={500} kind="subSpan" colors="#eee">email</Span>
            </Space>

        </CardDiv>
    )
}


