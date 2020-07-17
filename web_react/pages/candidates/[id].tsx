import { AppLayout, FlexBox, Span } from "../../layout"
import { Space, Breadcrumb, Divider } from "antd"
import { useRouter } from "next/router"
import Link from "next/link"
import { useTranslation } from "../../i18n"


import { IntroDiv, TabView } from "../../components/candidates"




 const Candidate = () => {
    const router = useRouter()
    const { id } = router.query
    const { t } = useTranslation()
    return (
        <AppLayout>
            <FlexBox>
                <Space size='large' direction="vertical">
                   <Breadcrumb separator={<Span types="title">/</Span>}>
                        <Breadcrumb.Item><Link href="/candidates"><Span types="title"><a>{t('candidates')}</a></Span></Link></Breadcrumb.Item>
                        <Breadcrumb.Item><Span types="title">{id}</Span></Breadcrumb.Item>
                    </Breadcrumb>
                    
                    <IntroDiv t={t}></IntroDiv>
                    <TabView t={t}/>
                </Space>
            </FlexBox>
        </AppLayout>
    )
}

export default Candidate