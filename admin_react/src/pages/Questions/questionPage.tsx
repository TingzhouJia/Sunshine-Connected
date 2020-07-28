import React, { useEffect } from 'react'
import { Wrapper, RadiusBoard } from '../../style'
import { HeaderBread } from '../../components/global'
import { QuestionTable } from '../../components/Question'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, fetchQuestionList } from '../../redux'
import { Skeleton } from 'antd'



export const QuestionPage:React.FC=()=>{
    const { questionList, loading } = useSelector((state: RootState) => state.question)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchQuestionList('', ))
    }, [dispatch])
    return <Wrapper>
            <HeaderBread/>
            <RadiusBoard w="77vw" h="85vh"> 
              
               <Skeleton active loading={loading} paragraph={{rows:7}}>
                   {
                       questionList?<QuestionTable sourcelist={questionList} load={loading}/>:<></>
                   }
               </Skeleton>
           
            </RadiusBoard>

    </Wrapper>

}