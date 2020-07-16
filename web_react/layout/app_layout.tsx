import React, { useState } from "react"
import Header from "../components/Header"
import { Layout, ConfigProvider } from 'antd'
import styled, { ThemeProvider } from 'styled-components'
import theme from 'styled-theming'
import { SideMenu } from "../components/Sider"

export const fontSize = theme.variants('size', 'types', {
    span: {
        default: '100',
        median: '120',
        large: '150',
        xlarge: '170',
        grand: '200'
    },
    subSpan:{
        default: '80',
        median: '100',
        large: '120',
        xlarge: '140',
        grand: '160'
    },
    title:{
        default:"140",
        median:"160",
        large:"180",
        xlarge:"200",
        grand:"220"
    }
})


export const NavTitle = styled.h1`
    font-size:${fontSize}%;
    font-weight:bolder
`

export const NavLink = styled.link`
    font-size:${fontSize}%;
`




export const Span = styled.span`
    font-size:${fontSize}%;
    font-weight:${(props:any) => props.weight || 500};
    color:${(props) => props.colors || 'black'}
    word-break:normal; 
    width:auto; 
    display:block; 
    white-space:pre-wrap;
    word-wrap : break-word ;
    overflow: hidden ;
`


Span.defaultProps={
    types:'default',

}




export const AppLayout: React.FC = ({ children }) => {
    const [font, SetFont] = useState('default')
    return <React.Fragment>
        <ThemeProvider theme={{ size: font }}>

            <Layout>
                <Layout.Header style={{ position: 'fixed', zIndex: 1, width: '100%', height: "10vh" }} >
                    <Header func={(val) => SetFont(val)} />

                </Layout.Header>
                <Layout>
                    <Layout.Sider breakpoint="lg"
                        collapsedWidth="0"
                        style={{ position: 'fixed', overflow: 'auto', left: 0, top: '10vh', height: "90vh", minWidth: '15vw', background: "white !important" }}
                    >
                        <SideMenu />
                    </Layout.Sider>
                    <Layout.Content>
                        {children}
                    </Layout.Content>
                </Layout>
            </Layout>

        </ThemeProvider>
    </React.Fragment>
}
