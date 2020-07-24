import { Tabs } from "antd"
import React from "react"
import { DraftList } from "./draftList";
import { AnswerEditor } from "./answerEditor";


const { TabPane } = Tabs;
export const AnswerTabs:React.FC=()=>{
   
    return <Tabs defaultActiveKey={"edit"} style={{height:"68vh"}}>
        <TabPane tab='Create Answer' key="edit">
        <AnswerEditor  />
        </TabPane>
        <TabPane tab="From Draft Box" key="draft">
            <DraftList />
        </TabPane>
    </Tabs>
}