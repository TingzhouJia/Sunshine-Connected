import { Wrapper } from "../../style"
import React, { useState } from "react"
import { StepBar, UploadPage, Inprogress } from "../../components/VideoHandle"
import { HeaderBread } from "../../components/global";


export const PublishVideo:React.FC=()=>{
    const [step, setstep] = useState(1);

    const getPage=(step:number)=>{
        switch(step){
            case 1:
                return <UploadPage callback={()=>setstep(2)}/>;
            case 2:
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