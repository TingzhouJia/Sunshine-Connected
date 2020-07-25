import React, { useCallback, useState } from 'react'
import { Wrapper, Flexbox } from '../../style'
import { HeaderBread } from '../../components/global'
import { StepBar, UploadPage, Inprogress, FinishSection } from '../../components/VideoHandle'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux'
import { Skeleton, Button, Result } from 'antd'
import { useHistory } from 'react-router'


export const EditVideo: React.FC = () => {
    const { loading, curVideo } = useSelector((state: RootState) => state.video)
    const [curPos, setcurPos] = useState(1)
    const router=useHistory()
    const getStep = useCallback(
        () => {
            if (curVideo){
                switch(curVideo.stage){
                    case 'successed':
                        setcurPos(3)
                        return <StepBar status="finish" curstep={curPos}/>
                    case 'failed':
                        setcurPos(3)
                        return <StepBar status="error" curstep={curPos}/>
                    case 'need audit':
                        setcurPos(2)
                        return <StepBar status="wait" curstep={curPos}/>
                    case 'in audit':
                        setcurPos(2)
                        return <StepBar status="process" curstep={curPos}/>
                }
                
            }
        },
        [curVideo],
    )

    const getPage=useCallback(
        (video)=>{
            switch(curPos){
                case 1:
                    return <UploadPage callback={()=>setcurPos(2)}/>
                case 2:
                    return <Inprogress/>
                case 3:
                    return <FinishSection source={video} />

            }
        },[curPos]
    )
    return <Wrapper>
        <HeaderBread />
        <Skeleton loading={loading} paragraph={{ rows: 8 }}>
            {
                curVideo ? (<Flexbox direction="column" just="center" align="space-between">
                    {
                        getStep()
                        
                    }{
                        getPage(curVideo)
                    }
                
                </Flexbox>) : (<Result
                        status="500"
                        title="500"
                        subTitle="Sorry, something went wrong."
                        extra={<Button onClick={()=>router.goBack()} type="primary">Back Home</Button>}
                    />)
          }
        </Skeleton>
    </Wrapper>
}