import React from "react"
import Header from "../components/Header"
import { Layout, ConfigProvider } from 'antd'

export const AppLayout: React.FC = ({ children }) => {
    return <React.Fragment>
     <ConfigProvider>
     <Layout>
            <Layout.Header style={{position:'fixed',zIndex:2,width:'100%',height:'10vh'}}>
            <Header></Header>
            </Layout.Header>
            <Layout>
                <Layout.Sider breakpoint="lg"
                    collapsedWidth="0"
                    style={{position:'fixed',left:0,top:'10vh',height:"90vh"}}
                    >
                        
                </Layout.Sider>
                <Layout.Content>
                    {children}
                </Layout.Content>
            </Layout>
        </Layout>
     </ConfigProvider>
    
    </React.Fragment>
}
