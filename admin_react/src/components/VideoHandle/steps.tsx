import React from 'react'
import { RadiusBoard, Flexbox } from '../../style'
import { Steps } from 'antd'



export const StepBar:React.FC<{status?: "wait" | "process" | "finish" | "error" | undefined,curstep:number}>=({status,curstep})=>{


    return <RadiusBoard w="73vw" h="10vh">
        <Flexbox direction="row" just="center" align="center">
                <Steps current={curstep} status={status}>
                    <Steps.Step title="Upload Video" description="Upload your video"></Steps.Step>
                    <Steps.Step title="In Progress" description="waiting"></Steps.Step>
                    <Steps.Step title="Done" ></Steps.Step>
                </Steps>
        </Flexbox>
    </RadiusBoard>
}