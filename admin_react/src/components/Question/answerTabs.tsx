import { Tabs } from "antd"
import React from "react"
import { DraftList } from "./draftList";
import { AnswerEditor } from "./answerEditor";


const { TabPane } = Tabs;
export const AnswerTabs:React.FC<{selectedAnswer:Partial<Answer>}>=({selectedAnswer})=>{
   
    return <Tabs defaultActiveKey={"edit"} style={{height:"68vh"}}>
        <TabPane tab='Create Answer' key="edit">
        <AnswerEditor selected={selectedAnswer} />
        </TabPane>
        <TabPane tab="From Draft Box" key="draft">
            <DraftList />
        </TabPane>
    </Tabs>
}