import React from 'react'
import { RadiusBoard, Span } from '../../style'
import { Button, Result, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { CloseCircleOutlined } from '@ant-design/icons';
const { Paragraph, Text } = Typography;
export const FinishSection: React.FC<{ success: boolean }> = ({success}) => {


    return <RadiusBoard w="73vw" h="71vh">
       {
           success? <Result
           status="success"
           title="Your Video is successfully published to elder population platform"
           subTitle="You can check and answer questions below your video, thanks for your contribution for our system"
           extra={[
             <Button type="primary" key="console">
                 <Link to="/workshop/video" replace>
                     Go To My Video Page
                 </Link>
             </Button>,
            
           ]}
         />:  <Result
         status="error"
         title="Submission Failed"
         subTitle="Please check and modify the following information before resubmitting."
         extra={[
           <Button type="primary" key="console">
             <Link to="/workshop/video" replace><Span color="black" >Go To Video Page</Span> </Link>
           </Button>,
           <Button key="resubmit"><Link to="/workshop/edit" replace>Resubmit</Link></Button>,
         ]}
       >
         <div className="desc">
           <Paragraph>
             <Text
               strong
               style={{
                 fontSize: 16,
               }}
             >
               The content you submitted has the following error:
             </Text>
           </Paragraph>
           <Paragraph>
             <CloseCircleOutlined className="site-result-demo-error-icon" /> Your account has been
             frozen.
           </Paragraph>
           <Paragraph>
             <CloseCircleOutlined className="site-result-demo-error-icon" /> Your account is not yet
             eligible to apply.
           </Paragraph>
         </div>
       </Result>
       }
    </RadiusBoard>
}
