import React, { useEffect } from 'react'
import { Wrapper, RadiusBoard } from '../../style'
import { HeaderBread } from '../../components/global'
import { QuestionTable } from '../../components/Question'



export const QuestionPage:React.FC=()=>{

    return <Wrapper>
            <HeaderBread/>
            <RadiusBoard w="77vw" h="85vh"> 
              
               <QuestionTable/>
           
            </RadiusBoard>

    </Wrapper>

}