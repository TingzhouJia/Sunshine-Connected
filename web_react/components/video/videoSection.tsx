import { Card, Avatar, Space, Tooltip, Tag } from "antd"
import styled from "styled-components"
import { Span } from "../../layout"

import { useTranslation } from "../../i18n"
import { CloseOutlined } from "@ant-design/icons"

const ContentBox = styled.div`
    width:100%;
    

    overflow:hidden;
    display:flex;
    flex-direction:row;
    justify-content:flex-start;
   
    align-items:flex-start;
`

const CardFlexHistory = styled.div`
    display:flex;
    width:40vw;
    min-height:20vh;
    flex-direction:row;
    margin:1vw;
    justify-content:flex-start;
    align-items:flex-start;

`

const FLexBox = styled.div<{ directions: string, align: string, width: string, height: string,justify:string }>`
    display:flex;
    flex-direction:${(props) => props.directions};
    align-items:${(props) => props.align};
    width:${(props) => props.width};
    height:${(props) => props.height};
    justify-content:${props=>props.justify}

`
export const VideoSection: React.FC = () => {
    const { t } = useTranslation()
    return (
        <Card hoverable style={{ width: "23vw", margin: "5vw !important", height: "25vh !important" }} cover={<img style={{ "height": "20vh", width: "100%", objectFit: "cover" }} alt={t('video_img_alt')} src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
            <ContentBox>
                <Avatar size={45} />
                <div style={{ display: "flex", flexDirection: "column", paddingLeft: "1vw", overflow: "hidden" }}>
                    <Span width="80%" weight="700" types="nav_title">The Zoom msmvm dncjs njcdan d</Span>
                    <Span>Xu Jiaying</Span>
                    <Span colors="grey" weight="600" types="sub_titles">98M viewed | 2hours ago</Span>
                </div>

            </ContentBox>
        </Card>
    )
}


export const HistoryVideoSection: React.FC = () => {
    const { t } = useTranslation()
    return (
        <CardFlexHistory>
            <img style={{ height: "100%", width: "40%", marginRight: "1vw" }} src="https://images.unsplash.com/photo-1594863858804-b654bc6c3a1f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                alt={t('video_img_alt')}></img>
            <FLexBox justify="flex-start" directions="column" align="flex-start" width="60%" height="100%">
                <Space direction="vertical" >
                <FLexBox justify="space-between" directions="row" align="flex-start" width="10%" height="30%">
                    <Span types="nav_title" weight="bold">title</Span>
                    <Tooltip title={t('remove_video')}>
                    <CloseOutlined  style={{color:"grey"}}/>
                    </Tooltip>
                </FLexBox>
                <Span types="sSpan" weight="500" color="#eee">author | 4.9M views</Span>
                <FLexBox justify="space-between" directions="row" align="center" width="100%" height="20%">
                <Tag color="cyan">Technology</Tag><Tag color="cyan">Technology</Tag>
                </FLexBox>
                </Space>
            </FLexBox>
        </CardFlexHistory>
    )
}