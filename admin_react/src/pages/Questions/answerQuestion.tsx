import { Wrapper, Flexbox } from "../../style"
import React, { useEffect } from "react"
import { HeaderBread } from "../../components/global"
import { useDispatch, useSelector } from "react-redux"
import { RootState, fetchDraftList } from "../../redux"
import { Spin, Result, Button } from "antd"
import { AnswerTabs } from "../../components/Question/answerTabs"
import { AnswerHeader } from "../../components/Question/answerHeader"
import { useHistory, useLocation } from "react-router"


export const AnswerQuestion = () => {
    
    const router=useHistory()
    const history=useLocation()
    const { loading, selectedAnswer } = useSelector((state: RootState) => state.answer)
    const q=useSelector((state:RootState)=>state.question)
    const qloading=q.loading
    const {selectQuestion}=q
    return (
        <Wrapper>
            <HeaderBread />
            <Spin spinning={loading||qloading}>
               {
                   history.pathname==='/answers/edit'?
                   (
                    selectQuestion&&selectQuestion.author&&selectQuestion.content?(
                        <Flexbox h="85%" direction="column" just="center" align="space-between">
                        <AnswerHeader header={selectQuestion} author={selectQuestion.author}/>
                        <AnswerTabs />
                    </Flexbox>
                       ):<Result
                       status="500"
                       title="500"
                       subTitle="Sorry, something went wrong."
                       extra={<Button onClick={()=>router.goBack()} type="primary">Back To Previous Page</Button>}
                     />
                   ):(
                       selectedAnswer&&selectedAnswer.question&&selectedAnswer.question.author?(
                        <Flexbox h="85%" direction="column" just="center" align="space-between">
                        <AnswerHeader header={selectedAnswer.question} author={selectedAnswer.question.author}/>
                        <AnswerTabs />
                    </Flexbox>
                       ):<Result
                       status="500"
                       title="500"
                       subTitle="Sorry, something went wrong."
                       extra={<Button onClick={()=>router.goBack()} type="primary">Back To Previous Page</Button>}
                     />
                       
                   )
                    
                    }
               
               
            </Spin>
        </Wrapper>
    )
}