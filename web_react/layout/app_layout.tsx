import React, { useState } from "react"
import Header from "../components/Header"
import { Layout, ConfigProvider } from 'antd'
import {ThemeProvider} from 'styled-components'
import theme from 'styled-theming'
import { SideMenu } from "../components/Sider"
export const fontSize=theme('size',{
    default:'1rem',
    median:'1.2rem',
    large:'1.5rem',
    xlarge:'1.7rem',
    grand:'2rem'
})


export const AppLayout: React.FC = ({ children }) => {
    const [font,SetFont]=useState('default')
    return <React.Fragment>
     <ThemeProvider theme={{size:font}}>
  
     <Layout>
            <Layout.Header style={{position:'fixed',width:'100%',height:"10vh"}} >
            <Header  func={(val)=>SetFont(val)}/>
           
            </Layout.Header>
            <Layout>
                <Layout.Sider breakpoint="lg"
                    collapsedWidth="0"
                    style={{position:'fixed',left:0,top:'10vh',height:"90vh", background:"white !important"}}
                    >
                <SideMenu/>
                </Layout.Sider>
                <Layout.Content>
                    {children}
                </Layout.Content>
            </Layout>
        </Layout>

     </ThemeProvider>
    </React.Fragment>
}
