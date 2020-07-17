import styled from "styled-components"
import { Avatar, Button, Tabs, Space, Divider, Tag, Typography } from "antd"
import { Span } from "../../layout"
import { IdcardOutlined } from "@ant-design/icons"


const BetweenDiv = styled.div`
    display:flex;
    width:100%
    flex:2;
    flex-direction:row;
    justify-content:space-between;
    align-items:flex-end;
`
const StretchColumn = styled.div`
    display:flex;
    flex-direction:column;
    align-items:flex-start;
    justify-content:center
    min-height:10vh;
`
const BaseLineCol = styled.div`
    display:flex;
    justify-content:baseline;
`
const RowBox = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:flex-start;
    align-items:center;
`

const TabContent1 = ({ t }) => (
   <div >
        <Space direction="vertical" size="small">
        <Span weight="bold" types="nav_title">{t('candidates:general_info')}</Span>
        <Divider orientation="left" />
        <RowBox>
            <Space direction="horizontal">
            <Span colors="grey" types="subSpan">{t('candiates:tags')}:</Span>
            <div>
                <Tag color="magenta"><Span>magenta</Span></Tag>
                <Tag color="red"><Span>red</Span></Tag>
            </div>
            </Space>

        </RowBox>
        <Divider />
        <div>
            <RowBox><Span types="nav_title">{t('candidates:intro')}</Span></RowBox>
            <Typography.Paragraph>
                Cras quis nulla commodo, aliquam lectus sed, blandit augue. Cras ullamcorper
                 bibendum bibendum. Duis tincidunt urna non pretium porta. Nam condimentum vitae ligula v
                 el ornare. Phasellus at semper turpis. Nunc eu tellus tortor. Etiam at condimentum nisl, 
                 vitae sagittis orci. Donec id dignissim nunc. Donec elit ante, eleifend a dolor et, venenatis facilisis dolor. 
                 In feugiat orci odio, sed lacinia sem elementum quis. Aliquam consectetur, 
                eros et vulputate euismod, nunc leo tempor lacus, ac rhoncus neque eros nec lacus. Cras lobortis molestie faucibus.
            </Typography.Paragraph>
        </div>
    </Space>
   </div>
)
export const IntroDiv = ({ t }) => (

    <BetweenDiv>
        <BetweenDiv>
            <Space direction="horizontal">
            <Avatar size={64} />
            <StretchColumn>
                <Span types="nav_title" weight="bold">Name</Span>
                <Span weight="600">qucik intro</Span>
                <Span types="subSpan" colors="grey">email</Span>
            </StretchColumn>
            </Space>
        </BetweenDiv>
        <BaseLineCol>
           <Space direction="horizontal"> <Button type="primary" ><Span>{t('connect')}</Span></Button>
            <Button><Span>{t('requested')}</Span></Button></Space>
        </BaseLineCol>
    </BetweenDiv>
)

export const TabView = ({ t }) => (
    <div style={{background:"white",padding:"1vw",borderRadius:"5px"}}>
        <Tabs defaultActiveKey="2">
        <Tabs.TabPane
            tab={
                <Span>
                    <IdcardOutlined />
                    {t('candidates:overview')}
                </Span>
            }
            key="1"
        >
            <TabContent1 t={t} />
    </Tabs.TabPane>

    </Tabs>
    </div>
)