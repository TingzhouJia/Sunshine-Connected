import { Tabs } from "antd"
import React from "react"
import { DraftList } from "./draftList";

const { TabPane } = Tabs;
export const AnswerTabs=()=>{
    return <Tabs defaultActiveKey={"edit"} style={{height:"68vh"}}>
        <TabPane tab='Create Answer' key="edit">

        </TabPane>
        <TabPane tab="From Draft Box" key="draft">
            <DraftList/>
        </TabPane>
    </Tabs>
}