import React, { useCallback, useState } from 'react'
import { Wrapper, Flexbox } from '../../style'
import { HeaderBread } from '../../components/global'
import { StepBar, UploadPage, Inprogress, FinishSection } from '../../components/VideoHandle'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux'
import { Skeleton, Button, Result } from 'antd'
import { useHistory } from 'react-router'
import { Video } from '../../model'


export const EditVideo: React.FC = () => {
    const { loading, curVideo } = useSelector((state: RootState) => state.video)
    const [curPos, setcurPos] = useState(1)
    const router = useHistory()

    const getStep = useCallback(
        (video: Partial<Video>) => {
            let process: 'finish' | 'error' | 'wait' | 'process' | undefined = undefined
            let a = 1
            switch (video.stage) {
                case 'successed':
                    a = 2
                    process = "finish"

                    break;
                // return <StepBar status="finish" curstep={curPos}/>
                case 'failed':
                    a = 2
                    process = "error"
                    break;
                // return <StepBar status="error" curstep={curPos}/>
                case 'need audit':
                    a = 1
                    process = "wait"
                    break;
                // return <StepBar status="wait" curstep={curPos}/>
                case 'in audit':
                    a = 1
                    process = "process"
                    break;
                // return <StepBar status="process" curstep={curPos}/>
            }
            return <StepBar status={process} curstep={a} />
            // setcurPos(a)
            // console.log(curPos)


        }
        ,
        [curPos],
    )

    const getPage = useCallback(
        (video) => {
            switch (curPos) {
                case 0:
                    return <UploadPage callback={() => setcurPos(1)} video={video} />
                case 1:
                    return <Inprogress />
                case 2:
                    return <FinishSection source={video} callback={()=>setcurPos(0)} />

            }
        }, [curPos]
    )
    return <Wrapper>
        <HeaderBread />
        <Skeleton loading={loading} paragraph={{ rows: 8 }}>
            {
                curVideo ? (<Flexbox direction="column" just="space-between" align="center" h="84vh">
                    {
                        getStep(curVideo)

                    }
                    {
                        getPage(curVideo)
                    }

                </Flexbox>) : (<Result
                    status="500"
                    title="500"
                    subTitle="Sorry, something went wrong."
                    extra={<Button onClick={() => router.goBack()} type="primary">Back Home</Button>}
                />)
            }
        </Skeleton>
    </Wrapper>
}