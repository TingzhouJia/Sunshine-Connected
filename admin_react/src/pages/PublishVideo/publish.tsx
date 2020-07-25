import { Wrapper } from "../../style"
import React, { useState } from "react"
import { StepBar, UploadPage, Inprogress } from "../../components/VideoHandle"
import { HeaderBread } from "../../components/global";


export const PublishVideo:React.FC=()=>{
    const [step, setstep] = useState(0);

    const getPage=(step:number)=>{
        switch(step){
            case 0:
                return <UploadPage callback={()=>setstep(1)}/>;
            case 1:
                return <Inprogress/>
        }
    }
    return <Wrapper>
            <HeaderBread/>
            <StepBar curstep={step}/>
            {
                getPage(step)
            }
    </Wrapper>
}