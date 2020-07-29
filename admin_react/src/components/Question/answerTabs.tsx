import { Tabs } from "antd"
import React from "react"
import { DraftList } from "./draftList";
import { AnswerEditor } from "./answerEditor";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";


const { TabPane } = Tabs;
export const AnswerTabs:React.FC=()=>{
   const {selectedAnswer} = useSelector((state:RootState) => state.answer)
   const {selectQuestion} = useSelector((state:RootState) => state.question)
    return <Tabs defaultActiveKey={"edit"} style={{height:"68vh"}}>
        <TabPane tab='Create Answer' key="edit">
        <AnswerEditor resource={selectQuestion} an={selectedAnswer} />
        </TabPane>
        <TabPane tab="From Draft Box" key="draft">
            <DraftList />
        </TabPane>
    </Tabs>
}