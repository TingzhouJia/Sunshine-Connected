import React from 'react'
import { RadiusBoard, Span } from '../../style'
import { Button, Result, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { CloseCircleOutlined } from '@ant-design/icons';
import { Video } from '../../model';
const { Paragraph, Text } = Typography;
export const FinishSection: React.FC<{source:Partial<Video>,callback?:()=>void }> = ({source,callback}) => {


    return <RadiusBoard w="73vw" h="71vh">
       {
           source.progress==="successed"? <Result
           status="success"
           title="Your Video is successfully published to elder population platform"
           subTitle="You can check and answer questions below your video, thanks for your contribution for our system"
           extra={[
             <Button type="primary" key="console">
                 <Link to="/workshop/videos" replace>
                     Back To Video Page
                 </Link>
             </Button>,
            
           ]}
         />:  <Result
         status="error"
         title="Submission Failed"
         subTitle="Please check and modify the following information before resubmitting."
         extra={[
           <Button type="primary" key="console">
             <Link to="/workshop/videos" replace><Span color="black" >Back To Video Page</Span> </Link>
           </Button>,
           <Button key="resubmit" onClick={callback}>Resubmit</Button>,
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
             <CloseCircleOutlined className="site-result-demo-error-icon" /> {source.progress?.message}
           </Paragraph>
          
         </div>
       </Result>
       }
    </RadiusBoard>
}
