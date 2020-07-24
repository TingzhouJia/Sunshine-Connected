import React from 'react'
import { Layout } from 'antd'
import {Switch,Route} from 'react-router-dom'
import {DashBoard, EditVideo, PublishVideo, MatchVolunteerPage, AnswerQuestion, QuestionPage} from './pages'
import SideMenu from './components/Sider'

const { Content, Sider } = Layout
const Admin: React.FC = () => {

    return <Layout style={{ minHeight: "100vh",width:"100vw" }}>
       <Layout style={{width:"15vw"}}>
       <Sider width="15vw" style={{ position: "fixed", left: 0, width: "15vw !important", height: "100vh", overflow: "auto",background:"white" }}>
            <SideMenu/>
        </Sider>
       </Layout>
        <Layout style={{marginLeft:"15vw ",height:'100vh',width:"85vw"}}>
            <Content>
                <Switch>
                    <Route exact path="/" component={DashBoard} />
                    <Route exact path="/workshop/editVideo" component={EditVideo}/>
                    <Route exact path="/workshop/publishVideo" component={PublishVideo}/>
                    <Route exact path="/audit/matching" component={MatchVolunteerPage}/>
                    <Route  path="/workshop/answers/create" component={AnswerQuestion}/>
                    <Route  path="/workshop/answers/edit" component={AnswerQuestion}/>
                    <Route exact path="/workshop/questions" component={QuestionPage}/>
                </Switch>
            </Content>
        </Layout>
    </Layout>

}


export default Admin