import { I18nPage, includeDefaultNamespaces, useTranslation } from "../../i18n";
import { AppLayout, FlexBox, Span } from "../../layout";
import { Divider, Space } from "antd";
import { VolunteerCard } from "../../components/Poll/volunteerCard";


const PollPage:I18nPage=()=>{
    const {t}=useTranslation()
    return <AppLayout>
            <FlexBox>
                <Space size="middle" direction="vertical">
                <Span types="title" weight="bold">{t('poll_title')}</Span>
                <div style={{background:"black",width:"90%",height:"0.1vh"}}/>
               <div style={{display:"flex",flexDirection:"row",flexWrap:"wrap"}}>
               {[1,2,3,4,5,6,7,8].map((each)=>(
                    <VolunteerCard key={each}></VolunteerCard>
                ))}
               </div>
                </Space>
            </FlexBox>
    </AppLayout>
}


PollPage.getInitialProps=async ()=>{
    return  {
        namespacesRequired: includeDefaultNamespaces(['poll'])
      }
}

export default PollPage