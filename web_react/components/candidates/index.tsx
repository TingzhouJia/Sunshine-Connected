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
    justify-content:flex-start
`

const TabContent1 = ({ t }) => (
   <div >
        <Space direction="vertical">
        <Span weight="bold" types="nav_title">{t('general_info')}</Span>
        <Divider />
        <RowBox>
            <Span colors="grey" types="subSpan">{t('tags')}:</Span>
            <div>
                <Tag color="magenta"><Span>magenta</Span></Tag>
                <Tag color="red"><Span>red</Span></Tag>

            </div>

        </RowBox>
        <Divider />
        <div>
            <RowBox><Span types="subSpan">{t('intro')}</Span></RowBox>
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
                    {t('overview')}
                </Span>
            }
            key="1"
        >
            <TabContent1 t={t} />
    </Tabs.TabPane>

    </Tabs>
    </div>
)